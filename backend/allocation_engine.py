import random
from typing import Dict, List

def calculate_match_score(intern: Dict, project: Dict) -> float:
    intern_skills = set(intern.get("skills", []))
    project_skills = set(project.get("required_skills", []))
    overlap = len(intern_skills & project_skills) / len(project_skills) if project_skills else 0
    pref_bonus = 0.12 if project.get("domain") in intern.get("preferences", []) else 0
    # Add small deterministic randomness based on ids so repeated runs are stable-ish
    seed = sum([ord(c) for c in intern.get("id","")]) % 100
    jitter = ((seed % 10) / 100.0)
    score = min(0.7 * overlap + 0.3 * jitter + pref_bonus, 1.0)
    return round(score, 2)

def generate_allocations(data: Dict) -> Dict:
    interns = data.get("interns", [])
    projects = {p["id"]: p for p in data.get("projects", [])}
    mentors = {m["id"]: m for m in data.get("mentors", [])}

    allocations = {
        "interns": [],
        "projects": list(projects.values()),
        "mentors": list(mentors.values()),
        "connections": []
    }

    for intern in interns:
        scores = [(pid, calculate_match_score(intern, proj)) for pid, proj in projects.items()]
        best_pid, score = max(scores, key=lambda x: x[1])
        best_project = projects[best_pid]
        # simple mentor selection: pick one with least assigned (not tracked in sample)
        mentor_id = random.choice(best_project.get("mentor_ids", []))

        intern_out = intern.copy()
        intern_out["match_score"] = score
        intern_out["assigned_project_id"] = best_pid
        intern_out["assigned_mentor_id"] = mentor_id

        allocations["interns"].append(intern_out)
        allocations["connections"].append({
            "from": intern_out["id"],
            "to": best_pid,
            "reason": f"Skill Match: {int(score*100)}%{' | Pref bonus' if score>0.7 else ''}",
            "color": "#00ff88" if score > 0.85 else "#ffff66"
        })

    return allocations
