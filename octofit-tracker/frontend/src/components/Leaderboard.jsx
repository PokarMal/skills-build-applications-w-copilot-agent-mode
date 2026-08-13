import { useEffect, useState } from 'react'
import { fetchCollection } from './api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true)
        setError('')
        setEntries(await fetchCollection('leaderboard'))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  return (
    <section className="section-card bg-white p-4">
      <h2 className="h4 mb-3">Leaderboard</h2>
      {loading && <p className="mb-0">Loading leaderboard...</p>}
      {error && <p className="text-danger mb-0">{error}</p>}
      {!loading && !error && entries.length === 0 && <p className="mb-0">No leaderboard entries found.</p>}
      {!loading && !error && entries.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>User</th>
                <th>Score</th>
                <th>Period</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id || entry.id}>
                  <td>{entry.user?.name || entry.user?.email || entry.user || '-'}</td>
                  <td>{entry.score ?? 0}</td>
                  <td className="text-capitalize">{entry.period || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard
