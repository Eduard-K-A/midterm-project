import BookingList from '../components/BookingList'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { bookings, cancelBooking } = useAuth()

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-600 text-center">No bookings yet.</p>
      ) : (
        <BookingList bookings={bookings} onCancel={cancelBooking} />
      )}
    </div>
  )
}