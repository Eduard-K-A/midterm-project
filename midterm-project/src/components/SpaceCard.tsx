import { Link } from 'react-router-dom'
import type { Space } from '../types'

interface SpaceCardProps {
  space: Space
}

export default function SpaceCard({ space }: SpaceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full sm:w-80 m-4">
      <img
        src={space.main_image}
        alt={space.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{space.name}</h3>
        <p className="text-gray-600">{space.location} - ₱{space.price}/day</p>
        <Link
          to={`/space/${space.id}`}
          className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}