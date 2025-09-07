import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import ConfirmationModal from './ConfirmationModal'

interface Booking {
  id: number
  spaceId: number
  spaceName: string
  timeSlot: string
  date: string
}

interface BookingListProps {
  bookings: Booking[]
  onCancel: (id: number) => void
}

export default function BookingList({ bookings, onCancel }: BookingListProps) {
  const { user } = useAuth()
  const [modalBookingId, setModalBookingId] = useState<number | null>(null)

  if (!user) return null

  return (
    <ul className="booking-list">
      {bookings.map((booking) => (
        <li key={booking.id} className="booking-item">
          <strong>{booking.spaceName}</strong> - {booking.timeSlot} on {booking.date}
          <button onClick={() => setModalBookingId(booking.id)} style={{ marginLeft: '10px' }}>Cancel</button>
        </li>
      ))}
      {modalBookingId && (
        <>
          <ConfirmationModal
            message="Are you sure you want to cancel this booking?"
            onConfirm={() => {
              onCancel(modalBookingId)
              setModalBookingId(null)
            }}
            onCancel={() => setModalBookingId(null)}
          />
        </>
      )}
    </ul>
  )
}