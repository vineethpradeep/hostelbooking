import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Room {
  img: string;
  title: string;
  price: number;
  propertyType: string;
  capacity: string;
  features: string;
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
      propertyType: '1 Bed',
      capacity: 'Max 1 Person',
      features: 'Attached Bathroom, AC, Study Table, Wardrobe',
      services: 'View Details',
    },
    {
      img: 'assets/img/room-bg-2.jpg',
      title: 'Double Sharing',
      price: 5500,
      propertyType: '2 Beds',
      capacity: 'Max 2 Persons',
      features: 'Shared Bathroom, AC, Study Tables, Wardrobes',
      services: 'View Details',
    },
    {
      img: 'assets/img/room-bg-3.jpg',
      title: 'Triple Sharing',
      price: 4500,
      propertyType: '3 Beds',
      capacity: 'Max 3 Persons',
      features: 'Shared Bathroom, Fan, Study Tables, Wardrobes',
      services: 'View Details',
    },
    {
      img: 'assets/img/room-bg-4.jpg',
      title: 'Four Sharing',
      price: 3500,
      propertyType: '4 Beds',
      capacity: 'Max 4 Persons',
      features: 'Shared Bathroom, Fan, Study Tables, Wardrobes',
      services: 'View Details',
    },
  ];
}
