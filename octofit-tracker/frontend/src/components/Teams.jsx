import { useEffect, useState } from 'react'
import { fetchCollection } from './api'

function getMemberCount(team) {
  if (!Array.isArray(team.members)) {
    return 0
  }
  return team.members.length
}

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // API endpoint: -8000.app.github.dev/api/teams
  useEffect(() => {
    async function loadTeams() {
      try {
        setLoading(true)
        setError('')
        setTeams(await fetchCollection('teams'))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load teams')
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [])

  return (
    <section className="section-card bg-white p-4">
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p className="mb-0">Loading teams...</p>}
      {error && <p className="text-danger mb-0">{error}</p>}
      {!loading && !error && teams.length === 0 && <p className="mb-0">No teams found.</p>}
      {!loading && !error && teams.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Members</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id || team.id || team.name}>
                  <td>{team.name || '-'}</td>
                  <td>{getMemberCount(team)}</td>
                  <td>{team.points ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Teams
