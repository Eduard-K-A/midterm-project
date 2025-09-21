import { Link } from 'react-router-dom';
import { Space } from '../types';

interface SpaceCardProps {
  space: Space;
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img src={space.main_image} alt={space.name} className="w-full h-48 object-cover rounded" />
      <h3 className="text-xl font-semibold mt-2">{space.name}</h3>
      <p className="text-gray-600">{space.location}</p>
      <p className="text-gray-800 font-bold">₱{space.price}/slot</p>
      <p className="text-gray-600 mt-2 line-clamp-2">{space.description}</p>
      <Link
        to={`/space/${space.id}`}
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Details
      </Link>
    </div>
  );
};