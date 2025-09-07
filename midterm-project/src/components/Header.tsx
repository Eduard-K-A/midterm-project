import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Header() {
  const { user, login, logout } = useAuth()

  const handleLogin = () => {
    const name = prompt('Enter your name to login:')
    if (name) {
      login(name)
    }
  }

  return (
    <header style={{ marginBottom: '20px', padding: '10px' }}>
      <h1>StudySpot PH</h1>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/dashboard/my-bookings">Dashboard</Link> |{' '}
        {user ? (
          <>
            Welcome, {user.name}! <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </nav>
    </header>
  )
}