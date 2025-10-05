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
      name: 'Premium King Room',
      price: 159,
      image: 'assets/img/room-1.jpg',
      rating: 4.5,
      size: '30 ft',
      capacity: 3,
      bed: 'King Beds',
      services: ['Wifi', 'Television', 'Bathroom'],
      description: 'Spacious luxury room with all amenities.',
      reviews: [],
    },
    {
      id: 2,
      name: 'Deluxe Room',
      price: 199,
      image: 'assets/img/room-2.jpg',
      rating: 4,
      size: '28 ft',
      capacity: 2,
      bed: 'Queen Bed',
      services: ['Wifi', 'Television'],
      description: 'Comfortable deluxe room for couples.',
      reviews: [],
    },
    {
      id: 3,
      name: 'Double Room',
      price: 159,
      image: 'assets/img/room-3.jpg',
      size: '30 ft',
      capacity: 2,
      bed: 'King Beds',
      services: ['Wifi', 'Television', 'Bathroom'],
      description: 'Spacious and cozy double room.',
      reviews: [],
    },
    {
      id: 4,
      name: 'Luxury Room',
      price: 299,
      image: 'assets/img/room-4.jpg',
      size: '40 ft',
      capacity: 4,
      bed: 'King Beds',
      services: ['Wifi', 'Television', 'Bathroom', 'Mini Bar'],
      description: 'Top-tier luxury room with premium services.',
      reviews: [],
    },
    {
      id: 5,
      name: 'Small View',
      price: 129,
      image: 'assets/img/room-2.jpg',
      size: '25 ft',
      capacity: 1,
      bed: 'Single Bed',
      services: ['Wifi'],
      description: 'Cozy room with a small view, perfect for solo travelers.',
      reviews: [],
    },
    {
      id: 6,
      name: 'Room With View',
      price: 199,
      image: 'assets/img/room-4.jpg',
      size: '35 ft',
      capacity: 2,
      bed: 'Queen Bed',
      services: ['Wifi', 'Television', 'Bathroom'],
      description: 'Room offering a beautiful view of the city.',
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
