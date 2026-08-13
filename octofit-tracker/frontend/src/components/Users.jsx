import { useEffect, useState } from 'react'
import { fetchCollection } from './api'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // API endpoint: -8000.app.github.dev/api/users
  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true)
        setError('')
        setUsers(await fetchCollection('users'))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <section className="section-card bg-white p-4">
      <h2 className="h4 mb-3">Users</h2>
      {loading && <p className="mb-0">Loading users...</p>}
      {error && <p className="text-danger mb-0">{error}</p>}
      {!loading && !error && users.length === 0 && <p className="mb-0">No users found.</p>}
      {!loading && !error && users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Fitness Level</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id || user.email}>
                  <td>{user.name || '-'}</td>
                  <td>{user.email || '-'}</td>
                  <td className="text-capitalize">{user.fitnessLevel || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users
