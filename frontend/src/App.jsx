import React, { useEffect, useState } from 'react'
import ThreeScene from './components/ThreeScene.jsx'
import ControlPanel from './components/ControlPanel.jsx'
import InfoPanel from './components/InfoPanel.jsx'
import FallbackTable from './components/FallbackTable.jsx'
import { fetchAllocations } from './utils/api.js'

export default function App() {
  const [allocations, setAllocations] = useState(null)
  const [selectedIntern, setSelectedIntern] = useState(null)
  const [filterDomain, setFilterDomain] = useState('all')
  const [use3D, setUse3D] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAllocations()
      .then(setAllocations)
      .catch(err => {
        console.error(err)
        setError('Failed to load allocation data. Is the backend running at http://localhost:8000 ?')
      })
  }, [])

  if (error) return <div className="app-error">{error}</div>
  if (!allocations) return <div className="loading">Loading allocations…</div>

  return (
    <div className="app-root">
      <ControlPanel
        filterDomain={filterDomain}
        setFilterDomain={setFilterDomain}
        toggleView={() => setUse3D(!use3D)}
        use3D={use3D}
      />

      <main className="content-area">
        {use3D ? (
          <ThreeScene
            allocations={allocations}
            filterDomain={filterDomain}
            onInternSelect={setSelectedIntern}
          />
        ) : (
          <FallbackTable allocations={allocations} />
        )}
      </main>

      {selectedIntern && (
        <InfoPanel intern={selectedIntern} onClose={() => setSelectedIntern(null)} />
      )}
    </div>
  )
}
