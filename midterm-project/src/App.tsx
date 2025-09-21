import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { SpaceDetail } from './pages/SpaceDetail';
import { Dashboard } from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BookingProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/space/:id" element={<SpaceDetail />} />
          <Route path="/dashboard/my-bookings" element={<Dashboard />} />
        </Routes>
      </BookingProvider>
    </AuthProvider>
  );
};

export default App;