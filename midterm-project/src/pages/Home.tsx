import { useState } from 'react';
import { SpaceCard } from '../components/SpaceCard';
import spaces from '../data/spaces.json'; 
import Footer from '../pages/Footer';

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSpaces = spaces.filter(space =>
    space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    space.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpaces.map(space => (
          <SpaceCard key={space.id} space={space} />
        ))}
      </div>
      <Footer/>
    </div>
  );
};