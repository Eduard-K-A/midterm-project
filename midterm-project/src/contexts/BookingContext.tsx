import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Booking } from '../types';
import { useAuth } from './AuthContext';

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (booking: Booking) => void;
}

const BookingContext = createContext<BookingContextType>({
  bookings: [],
  addBooking: () => {},
  cancelBooking: () => {},
});

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  // store all users' bookings in one object
  const [allBookings, setAllBookings] = useLocalStorage<Record<string, Booking[]>>(
    'bookings',
    {}
  );

  // get bookings for current logged-in user
  const bookings = user ? allBookings[user.username] || [] : [];

  const saveBookings = (username: string, newBookings: Booking[]) => {
    setAllBookings({
      ...allBookings,
      [username]: newBookings,
    });
  };

  const addBooking = (booking: Booking) => {
    if (!user) return;
    saveBookings(user.username, [...bookings, booking]);
  };

  const cancelBooking = (bookingToCancel: Booking) => {
    if (!user) return;
    const updated = bookings.filter(
      (booking) =>
        booking.spaceId !== bookingToCancel.spaceId ||
        booking.timeSlot !== bookingToCancel.timeSlot ||
        booking.date !== bookingToCancel.date
    );
    saveBookings(user.username, updated);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
