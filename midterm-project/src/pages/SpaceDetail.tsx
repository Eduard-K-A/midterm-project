import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { ConfirmationModal } from '../components/ConfirmationModal';
import spaces from '../data/spaces.json';

export const SpaceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { addBooking, bookings } = useBooking();
  const [selectedSlot, setSelectedSlot] = useState('');
  const [date, setDate] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'success' | 'error' | null>(null);
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);

  const space = spaces.find(s => s.id === Number(id));

  if (!space) return <div className="container mx-auto p-4">Space not found</div>;

  // Combine main_image and images for the carousel
  const allImages = [space.main_image, ...space.images];

  const handleBooking = () => {
    if (!user) {
      alert('Please log in to book a space');
      return;
    }
    if (!selectedSlot || !date) {
      alert('Please select a time slot and date');
      return;
    }

    // Check for existing booking with same space, date, and time slot
    const isDuplicateBooking = bookings.some(
      (booking) =>
        booking.spaceId === space.id &&
        booking.date === date &&
        booking.timeSlot === selectedSlot
    );

    if (isDuplicateBooking) {
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    setBookingStatus(null);
    setTimeout(() => {
      try {
        addBooking({ spaceId: space.id, timeSlot: selectedSlot, date });
        alert('Booking successful!');
        setSelectedSlot('');
        setDate('');
      } catch (error) {
        setBookingStatus('error');
      } finally {
        setIsLoading(false);
        setTimeout(() => setBookingStatus(null), 3000); // Clear status after 3 seconds
      }
    }, 1000); // Simulate API call delay
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  // Auto-rotate images
  useEffect(() => {
    let interval: number;
    if (allImages.length > 1) {
      interval = setInterval(() => {
        if (carouselRef.current && !carouselRef.current.matches(':hover')) {
          nextImage();
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [allImages.length]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          {allImages.length > 0 && (
            <div ref={carouselRef} className="relative">
              {/* Carousel Image */}
              <div className="overflow-hidden rounded-lg shadow-md bg-gray-100">
                <div className="w-full h-64 sm:h-80 md:h-96 flex items-center justify-center transition-opacity duration-500 ease-in-out">
                  <img
                    src={allImages[currentImageIndex]}
                    alt={`${space.name} ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 ease-in-out hover:scale-105"
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
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-4 rounded-full hover:bg-opacity-50 transition-all duration-300"
                    aria-label="Previous image"
                  >
                    <span className="text-3xl">&larr;</span>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-4 rounded-full hover:bg-opacity-50 transition-all duration-300"
                    aria-label="Next image"
                  >
                    <span className="text-3xl">&rarr;</span>
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
               min={new Date().toISOString().split("T")[0]} 
            />
            <button
              onClick={handleBooking}
              className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : 'Book Now'}
            </button>
            {bookingStatus === 'success' && (
              <p className="mt-2 text-green-600">Booking successful!</p>
            )}
            {bookingStatus === 'error' && (
              <p className="mt-2 text-red-600">Booking failed. Please try again.</p>
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={closeModal}
        onCancel={closeModal}
        message="You have already booked this space for the selected date and time slot."
      />
    </div>
  );
};