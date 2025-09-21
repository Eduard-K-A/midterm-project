import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { ConfirmationModal } from '../components/ConfirmationModal';
import spaces from '../data/spaces.json'; // Changed from spaces.ts
import { Booking } from '../types';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { bookings, cancelBooking } = useBooking();
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleCancelClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const confirmCancel = () => {
    if (selectedBooking) {
      cancelBooking(selectedBooking);
      setShowModal(false);
      setSelectedBooking(null);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking, index) => {
            const space = spaces.find(s => s.id === booking.spaceId);
            return (
              <div key={index} className="border p-4 rounded shadow">
                <h3 className="text-lg font-semibold">{space?.name}</h3>
                <p>Location: {space?.location}</p>
                <p>Time Slot: {booking.timeSlot}</p>
                <p>Date: {booking.date}</p>
                <button
                  onClick={() => handleCancelClick(booking)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel Booking
                </button>
              </div>
            );
          })}
        </div>
      )}
      <ConfirmationModal
        isOpen={showModal}
        onConfirm={confirmCancel}
        onCancel={() => setShowModal(false)}
        message="Are you sure you want to cancel this booking?"
      />
    </div>
  );
};