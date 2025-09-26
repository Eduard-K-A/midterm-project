import { Link } from 'react-router-dom';
import { Space } from '../types';

interface SpaceCardProps {
  space: Space;
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <img src={space.main_image} alt={space.name} className="w-full h-48 object-cover rounded-lg mb-4 transition duration-300 ease-in-out hover:opacity-90" />
      <h3 
        className="text-xl font-semibold text-gray-900 mb-2 transition duration-300 ease-in-out hover:underline cursor-pointer"
        onClick={() => window.location.href = `/space/${space.id}`}
      >
        {space.name}
      </h3>
      <p className="text-gray-600 text-sm mb-2">{space.location}</p>
      <p className="text-gray-800 font-bold text-base mb-2">₱{space.price}/slot</p>
      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{space.description}</p>
      <Link
        to={`/space/${space.id}`}
        className="inline-block bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out hover:shadow-md"
      >
        View Details
      </Link>
    </div>
  );
};