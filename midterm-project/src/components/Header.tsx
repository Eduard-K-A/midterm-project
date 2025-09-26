import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
  const { user, login, logout } = useAuth();
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUsername('');
  };

  const handleBookingsClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault(); // stop navigation
      alert('Please log in first'); 
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">StudySpot PH</Link>
        </h1>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          
          {/* My Bookings always visible */}
          <Link
            to="/dashboard/my-bookings"
            onClick={handleBookingsClick}
            className="hover:underline"
          >
            My Bookings
          </Link>

          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-1 rounded text-black"
              />
              <button
                onClick={() => username && login(username)}
                className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
              >
                Login
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
