import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Facility {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  safeFeatures: Facility[] = [
    {
      icon: 'bi bi-shield-lock',
      title: 'Safe & Secure',
      description:
        '24/7 security with CCTV surveillance for your peace of mind',
    },
    {
      icon: 'bi bi-cash-coin',
      title: 'Affordable Pricing',
      description: 'Competitive rates with no hidden charges or surprises',
    },
    {
      icon: 'bi bi-wifi',
      title: 'High-Speed WiFi',
      description: 'Free unlimited high-speed internet in all rooms',
    },
    {
      icon: 'bi bi-clock-history',
      title: 'Flexible Terms',
      description: 'Monthly, quarterly, or yearly payment options available',
    },
  ];
}
