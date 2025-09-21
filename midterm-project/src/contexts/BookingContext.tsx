import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Booking } from '../types';

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
  const [bookings, setBookings] = useLocalStorage<Booking[]>('bookings', []);

  const addBooking = (booking: Booking) => {
    setBookings([...bookings, booking]);
  };

  const cancelBooking = (bookingToCancel: Booking) => {
    setBookings(bookings.filter(booking =>
      booking.spaceId !== bookingToCancel.spaceId ||
      booking.timeSlot !== bookingToCancel.timeSlot ||
      booking.date !== bookingToCancel.date
    ));
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);