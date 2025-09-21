import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Header() {
  const { user, login, logout } = useAuth()

  const handleLogin = () => {
    const name = prompt('Enter your name to login:')
    if (name) login(name)
  }

  return (
    <header className="bg-white-600 text-black shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">StudySpot PH</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-black-200">Home</Link>
          <Link to="/dashboard/my-bookings" className="hover:text-black-200">Dashboard</Link>
          {user ? (
            <span className="flex items-center space-x-2">
              <span>Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </span>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}