import { useEffect, useState } from 'react'
import { fetchCollection } from './api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // API endpoint: -8000.app.github.dev/api/activities
  useEffect(() => {
    async function loadActivities() {
      try {
        setLoading(true)
        setError('')
        setActivities(await fetchCollection('activities'))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activities')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  return (
    <section className="section-card bg-white p-4">
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p className="mb-0">Loading activities...</p>}
      {error && <p className="text-danger mb-0">{error}</p>}
      {!loading && !error && activities.length === 0 && <p className="mb-0">No activities found.</p>}
      {!loading && !error && activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td>{activity.user?.name || activity.user?.email || activity.user || '-'}</td>
                  <td>{activity.type || '-'}</td>
                  <td>{activity.durationMinutes ? `${activity.durationMinutes} min` : '-'}</td>
                  <td>{activity.caloriesBurned ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
