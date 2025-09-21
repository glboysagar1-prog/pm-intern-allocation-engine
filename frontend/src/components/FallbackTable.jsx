import React from 'react'

const FallbackTable = ({ allocations }) => {
  if (!allocations) return null
  return (
    <div className="fallback-table">
      <h2>📋 Intern Allocation Results</h2>
      <table>
        <thead>
          <tr>
            <th>Intern</th>
            <th>Project</th>
            <th>Mentor</th>
            <th>Match Score</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {allocations.interns.map(intern => {
            const project = allocations.projects.find(p => p.id === intern.assigned_project_id)
            const mentor = allocations.mentors.find(m => m.id === intern.assigned_mentor_id)
            const connection = allocations.connections.find(c => c.from === intern.id)
            return (
              <tr key={intern.id}>
                <td>{intern.name}</td>
                <td>{project?.name}</td>
                <td>{mentor?.name}</td>
                <td>{intern.match_score}</td>
                <td>{connection?.reason}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default FallbackTable
