import { Injectable } from '@angular/core';

export interface Review {
  name: string;
  email?: string;
  text: string;
  rating: number;
  date?: string;
  avatar?: string;
}

export interface Room {
  id: number;
  name: string;
  price: number;
  image: string;
  rating?: number;
  size: string;
  capacity: number;
  bed: string;
  services: string[];
  description?: string;
  reviews?: Review[];
}

@Injectable({ providedIn: 'root' })
export class RoomService {
  private rooms: Room[] = [
    {
      id: 1,
      name: 'Single Occupancy',
      price: 8000,
      image: 'assets/img/room-1.jpg',
      rating: 4.5,
      size: '1 Bed',
      capacity: 1,
      bed: 'Attached Bathroom, AC, Study Table, Wardrobe',
      services: ['Attached Bathroom', 'AC', 'Study Table', 'Wardrobe'],
      description: 'Perfect for solo stay with all basic amenities included.',
      reviews: [],
    },
    {
      id: 2,
      name: 'Double Sharing',
      price: 5500,
      image: 'assets/img/room-2.jpg',
      rating: 4,
      size: '2 Beds',
      capacity: 2,
      bed: 'Shared Bathroom, AC, Study Tables, Wardrobes',
      services: ['Shared Bathroom', 'AC', 'Study Tables', 'Wardrobes'],
      description: 'Comfortable double-sharing room suitable for two guests.',
      reviews: [],
    },
    {
      id: 3,
      name: 'Triple Sharing',
      price: 4500,
      image: 'assets/img/room-3.jpg',
      rating: 4,
      size: '3 Beds',
      capacity: 3,
      bed: 'Shared Bathroom, Fan, Study Tables, Wardrobes',
      services: ['Shared Bathroom', 'Fan', 'Study Tables', 'Wardrobes'],
      description: 'Spacious triple-sharing room for three guests.',
      reviews: [],
    },
    {
      id: 4,
      name: 'Four Sharing',
      price: 3500,
      image: 'assets/img/room-4.jpg',
      rating: 4,
      size: '4 Beds',
      capacity: 4,
      bed: 'Shared Bathroom, Fan, Study Tables, Wardrobes',
      services: ['Shared Bathroom', 'Fan', 'Study Tables', 'Wardrobes'],
      description: 'Ideal for group stay with four beds and shared amenities.',
      reviews: [],
    },
    {
      id: 5,
      name: 'Premium King Room',
      price: 15900,
      image: 'assets/img/room-2.jpg',
      rating: 4.5,
      size: '1 Bed',
      capacity: 1,
      bed: 'King Bed, Attached Bathroom, AC, Study Table',
      services: ['King Bed', 'Attached Bathroom', 'AC', 'Study Table'],
      description: 'Luxury room with king bed and premium amenities.',
      reviews: [],
    },
    {
      id: 6,
      name: 'Family Room',
      price: 29900,
      image: 'assets/img/room-1.jpg',
      rating: 5,
      size: '4 Beds',
      capacity: 4,
      bed: 'King Beds, Attached Bathroom, AC, Wardrobes, Study Tables',
      services: [
        'King Beds',
        'Attached Bathroom',
        'AC',
        'Wardrobes',
        'Study Tables',
      ],
      description: 'Spacious family room with all facilities for 4 guests.',
      reviews: [],
    },
  ];

  getRooms(): Room[] {
    return this.rooms;
  }

  getRoomById(id: number): Room | undefined {
    return this.rooms.find((r) => r.id === id);
  }
}
