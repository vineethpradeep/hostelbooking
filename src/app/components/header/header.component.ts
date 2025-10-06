import { Component, HostListener } from '@angular/core';
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
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isSticky = false;
  menuOpen = false;

  phone = '+1234567890';
  email = 'info@hostelbooking.com';

  socials = [
    { icon: 'fa fa-facebook', url: '#' },
    { icon: 'fa fa-twitter', url: '#' },
    { icon: 'fa fa-instagram', url: '#' },
  ];

  menu: MenuItem[] = [
    { label: 'Home', url: '/', active: false },
    { label: 'Rooms', url: '/rooms', active: false },
    { label: 'Facilities', url: '/facilities', active: false },   
    { label: 'About', url: '/about', active: false },
    { label: 'Contact', url: '/contact', active: false },
  ];

  ngOnInit() {
    this.menu.forEach((item) => {
      if (item.children) {
        item.open = false;
      }
    });
  }

  toggleDropdown(item: MenuItem, event: Event) {
    if (item.children) {
      event.preventDefault();
      item.open = !item.open;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.scrollY > 100;
  }
}
