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
    <ul className="bg-white p-6 rounded-lg shadow-md mt-6">
      {bookings.map((booking) => (
        <li
          key={booking.id}
          className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition duration-200"
        >
          <span className="text-gray-800">
            <strong>{booking.spaceName}</strong> - {booking.timeSlot} on {booking.date}
          </span>
          <button
            onClick={() => setModalBookingId(booking.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
            aria-label={`Cancel booking for ${booking.spaceName}`}
          >
            Cancel
          </button>
        </li>
      ))}
      {modalBookingId && (
        <ConfirmationModal
          message="Are you sure you want to cancel this booking?"
          onConfirm={() => {
            onCancel(modalBookingId)
            setModalBookingId(null)
          }}
          onCancel={() => setModalBookingId(null)}
        />
      )}
    </ul>
  )
}