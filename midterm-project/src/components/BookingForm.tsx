import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Space } from '../types'

interface BookingFormProps {
  space: Space
  onBook: (slot: string) => void
}

export default function BookingForm({ space, onBook }: BookingFormProps) {
  const [selectedSlot, setSelectedSlot] = useState('')
  const { user } = useAuth()

  if (!user) {
    return <p>Please log in to book a space.</p>
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedSlot) {
      onBook(selectedSlot)
      setSelectedSlot('')
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h3>Book {space.name}</h3>
      <p>Select a time slot:</p>
      <select
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
        required
      >
        <option value="">Choose a slot</option>
        {space.time_slots.map((slot, index) => (
          <option key={index} value={slot}>{slot}</option>
        ))}
      </select>
      <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>Book Now</button>
    </form>
  )
}