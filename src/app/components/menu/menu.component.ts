import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  url: string;
  active: boolean;
  children?: MenuItem[];
  open?: boolean;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  menu: MenuItem[] = [
    { label: 'Home', url: '/', active: false },
    { label: 'Rooms', url: '/rooms', active: false },
    { label: 'Facilities', url: '/facilities', active: false },
    { label: 'About', url: '/about', active: false },
    { label: 'Contact', url: '/contact', active: false },
  ];

  toggleDropdown(item: MenuItem, event: Event) {
    if (item.children) {
      event.preventDefault();
      item.open = !item.open;
    }
  }
}
