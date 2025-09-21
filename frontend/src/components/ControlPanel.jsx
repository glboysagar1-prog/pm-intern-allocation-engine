import React from 'react'

const ControlPanel = ({ filterDomain, setFilterDomain, toggleView, use3D }) => {
  const domains = ['all', 'Agile', 'Data Science', 'Risk']

  return (
    <aside className="control-panel">
      <h3>🎯 Filter by Domain</h3>

      <div className="filter-buttons">
        {domains.map(d => (
          <button
            key={d}
            className={filterDomain === d ? 'active' : ''}
            onClick={() => setFilterDomain(d)}
            aria-pressed={filterDomain === d}
          >
            {d}
          </button>
        ))}
      </div>

      <button className="toggle-view" onClick={toggleView}>
        Switch to {use3D ? 'Table' : '3D'} View
      </button>

      <button
        className="export-btn"
        onClick={() => {
          alert('Export not implemented in this build — use backend to export allocations as JSON.')
        }}
      >
        📥 Export Allocations
      </button>
    </aside>
  )
}

export default ControlPanel
