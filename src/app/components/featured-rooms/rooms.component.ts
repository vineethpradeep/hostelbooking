import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Room {
  img: string;
  title: string;
  price: number;
  size: string;
  capacity: string;
  bed: string;
  services: string;
}

@Component({
  selector: 'app-featured-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class FeaturedRoomsComponent {
  rooms: Room[] = [
    {
      img: 'assets/img/room-bg-1.jpg',
      title: 'Single Occupancy',
      price: 8000,
      size: '1 Bed',
      capacity: 'Max 1 Person',
      bed: 'Attached Bathroom, AC, Study Table, Wardrobe',
      services: 'Book Now 🛏️',
    },
    {
      img: 'assets/img/room-bg-2.jpg',
      title: 'Double Sharing',
      price: 5500,
      size: '2 Beds',
      capacity: 'Max 2 Persons',
      bed: 'Shared Bathroom, AC, Study Tables, Wardrobes',
      services: 'Book Now 🛏️',
    },
    {
      img: 'assets/img/room-bg-3.jpg',
      title: 'Triple Sharing',
      price: 4500,
      size: '3 Beds',
      capacity: 'Max 3 Persons',
      bed: 'Shared Bathroom, Fan, Study Tables, Wardrobes',
      services: 'Book Now 🛏️',
    },
    {
      img: 'assets/img/room-bg-4.jpg',
      title: 'Four Sharing',
      price: 3500,
      size: '4 Beds',
      capacity: 'Max 4 Persons',
      bed: 'Shared Bathroom, Fan, Study Tables, Wardrobes',
      services: 'Book Now 🛏️',
    },
  ];
}
