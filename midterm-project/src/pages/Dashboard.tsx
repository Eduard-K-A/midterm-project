import BookingList from '../components/BookingList'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { bookings, cancelBooking } = useAuth()

  return (
    <div>
      <h2>My Bookings</h2>
      <BookingList bookings={bookings} onCancel={cancelBooking} />
    </div>
  )
}