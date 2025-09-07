import { Link } from 'react-router-dom'
import { Space } from '../types'  // Assume types.ts created if needed, or inline

interface SpaceCardProps {
  space: Space
}

export default function SpaceCard({ space }: SpaceCardProps) {
  return (
    <div className="space-card">
      <img src={space.main_image} alt={space.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <h3>{space.name}</h3>
      <p>{space.location} - ₱{space.price}/day</p>
      <Link to={`/space/${space.id}`}>View Details</Link>
    </div>
  )
}