// src/app/pages/facilities/facilities.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Facility {
  icon: string;   // could be a CSS class, emoji, or image path
  title: string;
  description: string;
}

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent {
  facilities: Facility[] = [
    {
      icon: '🛏️',
      title: 'Comfortable Rooms',
      description: 'Spacious rooms with cozy beds and modern interiors.'
    },
    {
      icon: '📶',
      title: 'Free Wi-Fi',
      description: 'High-speed internet available across the property.'
    },
    {
      icon: '🍽️',
      title: 'Restaurant & Café',
      description: 'Enjoy local and international cuisines at our in-house restaurant.'
    },
    {
      icon: '🚗',
      title: 'Parking Facility',
      description: 'Secure parking space available for all guests.'
    },
    {
      icon: '🏊',
      title: 'Swimming Pool',
      description: 'Relax and refresh in our outdoor pool.'
    },
    {
      icon: '💪',
      title: 'Fitness Center',
      description: 'Well-equipped gym to keep up with your fitness routine.'
    }
  ];
}