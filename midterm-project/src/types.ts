export interface Space {
  id: number;
  name: string;
  location: string;
  price: number;
  main_image: string;
  images: string[];
  description: string;
  amenities: string[];
  hours: string;
  time_slots: string[];
}

export interface Booking {
  spaceId: number;
  timeSlot: string;
  date: string;
}