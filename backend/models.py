from pydantic import BaseModel
from typing import List, Dict, Any

class AllocationResponse(BaseModel):
    interns: List[Dict[str, Any]]
    projects: List[Dict[str, Any]]
    mentors: List[Dict[str, Any]]
    connections: List[Dict[str, Any]]
