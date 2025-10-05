import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
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
  services: Service[] = [
    {
      icon: 'flaticon-033-dinner',
      title: 'Catering Service',
      description:
        'Room service is a service provided by a hotel that brings food and beverages to guests in their rooms.',
    },
    {
      icon: 'flaticon-024-towel',
      title: 'Laundry',
      description:
        "Laundry service is a service provided by a hotel that cleans and presses guests' clothing and linens.",
    },
    {
      icon: 'flaticon-012-cocktail',
      title: 'Play Room',
      description:
        'The playroom is a designated space in a hotel where children can play and engage in supervised activities.',
    },
  ];
}
