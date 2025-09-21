import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import BookingForm from '../components/BookingForm'
import spaces from '../data/spaces.json'
import type { Space } from '../types'
import { useAuth } from '../contexts/AuthContext'

export default function SpaceDetail() {
  const { spaceId } = useParams<{ spaceId: string }>()
  const navigate = useNavigate()
  const [space, setSpace] = useState<Space | null>(null)
  const { bookSpace } = useAuth()

  useEffect(() => {
    const foundSpace = spaces.find((s) => s.id === Number(spaceId))
    setSpace(foundSpace || null)
  }, [spaceId])

  if (!space) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600">Space not found.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Go Home
        </button>
      </div>
    )
  }

  const handleBook = (slot: string) => {
    bookSpace(space.id, space.name, slot)
    alert('Booking confirmed!')
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{space.name}</h2>
      <img
        src={space.main_image}
        alt={space.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-600"><strong>Location:</strong> {space.location}</p>
          <p className="text-gray-600"><strong>Price:</strong> ₱{space.price}</p>
          <p className="text-gray-600 mt-2">{space.description}</p>
          <h3 className="text-lg font-semibold mt-4">Amenities:</h3>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            {space.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
          <p className="text-gray-600 mt-2"><strong>Hours:</strong> {space.hours}</p>
        </div>
        <div>
          <BookingForm space={space} onBook={handleBook} />
          {space.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {space.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Additional ${index + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}