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
      title: 'Double Room',
      price: 199,
      size: '30 ft',
      capacity: 'Max person 5',
      bed: 'King Beds',
      services: 'Wifi, Television, Bathroom,...',
    },
    {
      img: 'assets/img/room-bg-2.jpg',
      title: 'Premium King Room',
      price: 159,
      size: '30 ft',
      capacity: 'Max person 5',
      bed: 'King Beds',
      services: 'Wifi, Television, Bathroom,...',
    },
    {
      img: 'assets/img/room-bg-3.jpg',
      title: 'Deluxe Room',
      price: 198,
      size: '30 ft',
      capacity: 'Max person 5',
      bed: 'King Beds',
      services: 'Wifi, Television, Bathroom,...',
    },
    {
      img: 'assets/img/room-bg-4.jpg',
      title: 'Family Room',
      price: 299,
      size: '30 ft',
      capacity: 'Max person 5',
      bed: 'King Beds',
      services: 'Wifi, Television, Bathroom,...',
    },
  ];
}
