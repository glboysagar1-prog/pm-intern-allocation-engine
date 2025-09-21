import React from 'react'

const InfoPanel = ({ intern, onClose }) => {
  if (!intern) return null
  return (
    <div className="info-overlay" role="dialog" aria-label={`Details for ${intern.name}`}>
      <button onClick={onClose} aria-label="Close" style={{ float: 'right', background: 'transparent', border: 'none', color: '#fff' }}>✕</button>
      <img src={intern.avatar_url || '/avatars/jane.jpg'} alt={intern.name} className="avatar" />
      <h3 style={{marginTop:8}}>{intern.name}</h3>
      <p><strong>Match Score:</strong> {intern.match_score}</p>
      <p><strong>Assigned Project:</strong> {intern.assigned_project_id}</p>
      <p><strong>Assigned Mentor:</strong> {intern.assigned_mentor_id}</p>
      <p><strong>Skills:</strong> {intern.skills?.join(', ')}</p>
    </div>
  )
}

export default InfoPanel
