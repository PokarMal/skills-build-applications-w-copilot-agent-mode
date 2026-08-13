import { useEffect, useState } from 'react'
import { fetchCollection } from './api'

function formatGroups(groups) {
  if (!Array.isArray(groups) || groups.length === 0) {
    return '-'
  }
  return groups.join(', ')
}

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // API endpoint: -8000.app.github.dev/api/workouts
  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true)
        setError('')
        setWorkouts(await fetchCollection('workouts'))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load workouts')
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  return (
    <section className="section-card bg-white p-4">
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p className="mb-0">Loading workouts...</p>}
      {error && <p className="text-danger mb-0">{error}</p>}
      {!loading && !error && workouts.length === 0 && <p className="mb-0">No workouts found.</p>}
      {!loading && !error && workouts.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th>Target Muscle Groups</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.id || workout.title}>
                  <td>{workout.title || '-'}</td>
                  <td className="text-capitalize">{workout.difficulty || '-'}</td>
                  <td>{workout.durationMinutes ? `${workout.durationMinutes} min` : '-'}</td>
                  <td>{formatGroups(workout.targetMuscleGroups)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Workouts
