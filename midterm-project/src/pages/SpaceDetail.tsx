import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import spaces from '../data/spaces.json'; // Changed from spaces.ts

export const SpaceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { addBooking } = useBooking();
  const [selectedSlot, setSelectedSlot] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const space = spaces.find(s => s.id === Number(id));

  if (!space) return <div className="container mx-auto p-4">Space not found</div>;

  const handleBooking = () => {
    if (!user) {
      alert('Please log in to book a space');
      navigate('/');
      return;
    }
    if (!selectedSlot || !date) {
      alert('Please select a time slot and date');
      return;
    }
    addBooking({ spaceId: space.id, timeSlot: selectedSlot, date });
    alert('Booking successful!');
    setSelectedSlot('');
    setDate('');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <img src={space.main_image} alt={space.name} className="w-full h-96 object-cover rounded" />
          {space.images.map((img, index) => (
            <img key={index} src={img} alt={`${space.name} ${index + 1}`} className="w-full h-48 object-cover rounded mt-4" />
          ))}
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold">{space.name}</h2>
          <p className="text-gray-600">{space.location}</p>
          <p className="text-gray-800 font-bold">₱{space.price}/slot</p>
          <p className="mt-4">{space.description}</p>
          <h3 className="text-xl font-semibold mt-4">Amenities</h3>
          <ul className="list-disc pl-5">
            {space.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mt-4">Hours</h3>
          <p>{space.hours}</p>
          <h3 className="text-xl font-semibold mt-4">Book a Slot</h3>
          <div className="mt-2">
            <select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="">Select a time slot</option>
              {space.time_slots.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded w-full mt-2"
            />
            <button
              onClick={handleBooking}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};