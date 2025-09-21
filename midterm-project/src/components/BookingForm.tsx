import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import type { Space } from '../types'

interface BookingFormProps {
  space: Space
  onBook: (slot: string) => void
}

export default function BookingForm({ space, onBook }: BookingFormProps) {
  const [selectedSlot, setSelectedSlot] = useState('')
  const { user } = useAuth()

  if (!user) {
    return <p className="text-red-600 text-center">Please log in to book a space.</p>
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedSlot) {
      onBook(selectedSlot)
      setSelectedSlot('')
    }
  }

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-6"
      onSubmit={handleSubmit}
      aria-label="Book a time slot"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Book {space.name}</h3>
      <p className="text-gray-600 mb-2">Select a time slot:</p>
      <select
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Choose a slot</option>
        {space.time_slots.map((slot, index) => (
          <option key={index} value={slot}>{slot}</option>
        ))}
      </select>
      <button
        type="submit"
        disabled={!selectedSlot}
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Book Now
      </button>
    </form>
  )
}