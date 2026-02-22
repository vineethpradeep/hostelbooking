// src/app/pages/facilities/facilities.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  icon: string;
  title: string;
  description: string;
  colorClass: string;
  chipIcon: string;
}

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css'],
})
export class FacilitiesComponent {
  services: Service[] = [
    {
      icon: 'bi bi-wifi',
      title: 'High-Speed WiFi',
      description: 'Free unlimited high-speed internet throughout the property.',
      colorClass: 'fac-blue',
      chipIcon: 'bi bi-broadcast',
    },
    {
      icon: 'bi bi-egg-fried',
      title: 'Meals Included',
      description: 'Nutritious breakfast, lunch, and dinner prepared by professional cooks.',
      colorClass: 'fac-orange',
      chipIcon: 'bi bi-clock-fill',
    },
    {
      icon: 'bi bi-shield-lock',
      title: '24/7 Security',
      description: 'Round-the-clock security with CCTV surveillance and secure access.',
      colorClass: 'fac-red',
      chipIcon: 'bi bi-camera-video-fill',
    },
    {
      icon: 'bi bi-people',
      title: 'Common Areas',
      description: 'TV lounge, reading room, and recreation area for socializing and relaxation.',
      colorClass: 'fac-purple',
      chipIcon: 'bi bi-tv-fill',
    },
    {
      icon: 'bi bi-bucket',
      title: 'Housekeeping',
      description: 'Regular cleaning and laundry services to keep your stay comfortable.',
      colorClass: 'fac-cyan',
      chipIcon: 'bi bi-calendar-check-fill',
    },
    {
      icon: 'bi bi-lightning-charge',
      title: 'Power Backup',
      description: 'Uninterrupted power supply with backup generators for 24/7 electricity.',
      colorClass: 'fac-amber',
      chipIcon: 'bi bi-battery-full',
    },
  ];
}
