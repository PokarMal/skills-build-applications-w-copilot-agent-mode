import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="border-bottom bg-white sticky-top">
        <div className="container py-3 d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-3">
          <div>
            <h1 className="h3 mb-1">OctoFit Tracker</h1>
            <p className="text-secondary mb-0">Presentation tier connected to the Node.js API</p>
          </div>
          <nav className="nav nav-pills nav-wrap">
            <NavLink to="/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Users
            </NavLink>
            <NavLink to="/teams" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Teams
            </NavLink>
            <NavLink to="/activities" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Activities
            </NavLink>
            <NavLink to="/leaderboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Leaderboard
            </NavLink>
            <NavLink to="/workouts" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Workouts
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container py-4">
        <div className="alert alert-info mb-4" role="alert">
          Set VITE_CODESPACE_NAME in .env.local for Codespaces URLs. When it is missing, the app safely falls back to localhost.
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
