import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import spaces from '../data/spaces.json';

export const SpaceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { addBooking } = useBooking();
  const [selectedSlot, setSelectedSlot] = useState('');
  const [date, setDate] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const space = spaces.find(s => s.id === Number(id));

  if (!space) return <div className="container mx-auto p-4">Space not found</div>;

  // Combine main_image and images for the carousel
  const allImages = [space.main_image, ...space.images];

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

  // Carousel navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          {allImages.length > 0 && (
            <div className="relative">
              {/* Carousel Image */}
              <div className="overflow-hidden rounded-lg shadow-md bg-gray-100">
                <div className="w-full h-64 sm:h-80 md:h-96 flex items-center justify-center">
                  <img
                    src={allImages[currentImageIndex]}
                    alt={`${space.name} ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg transition-all duration-500 ease-in-out hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              {/* Navigation Buttons */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                    aria-label="Previous image"
                  >
                    &larr;
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                    aria-label="Next image"
                  >
                    &rarr;
                  </button>
                  {/* Carousel Indicators */}
                  <div className="flex justify-center mt-4 space-x-2">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          currentImageIndex === index ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
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