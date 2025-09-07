import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import BookingForm from '../components/BookingForm'
import spaces from '../data/spaces.json'
import { Space } from '../types'

export default function SpaceDetail() {
  const { spaceId } = useParams<{ spaceId: string }>()
  const navigate = useNavigate()
  const [space, setSpace] = useState<Space | null>(null)
  const { bookSpace } = useAuth()  // From context

  useEffect(() => {
    const foundSpace = spaces.find((s) => s.id === Number(spaceId))
    setSpace(foundSpace || null)
  }, [spaceId])

  if (!space) {
    return <p>Space not found. <button onClick={() => navigate('/')}>Go Home</button></p>
  }

  const handleBook = (slot: string) => {
    bookSpace(space.id, space.name, slot)
    alert('Booking confirmed!')
  }

  return (
    <div>
      <h2>{space.name}</h2>
      <img src={space.main_image} alt={space.name} style={{ width: '100%', maxWidth: '600px' }} />
      <p><strong>Location:</strong> {space.location}</p>
      <p><strong>Price:</strong> ₱{space.price}</p>
      <p>{space.description}</p>
      <h3>Amenities:</h3>
      <ul>
        {space.amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
      <p><strong>Hours:</strong> {space.hours}</p>
      <BookingForm space={space} onBook={handleBook} />
      <div>
        {space.images.map((img, index) => (
          <img key={index} src={img} alt={`Additional ${index + 1}`} style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>
    </div>
  )
}