/* import { Component, ElementRef, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

interface MenuChild {
  label: string;
  url: string;
}

interface MenuItem {
  label: string;
  url?: string;
  active: boolean;
  open?: boolean;
  children?: MenuChild[];
}

@Component({
  selector: 'app-admin-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-header.component.html',
  styleUrls: ['../../header/header.component.css'],
})
export class AdminHeaderComponent {
  dynamicMenus: MenuItem[] = [];

  constructor(
    private router: Router,
    private el: ElementRef,
    private auth: AuthService
  ) {}
  isSticky = false;
  menuOpen = false;
  userName: string = '';

  ngOnInit() {
    const role = this.auth.getUserRole(); // admin / user
    // this.userName=this.auth.getUserName();
    this.userName = 'admin';
    //const role = "admin";

    if (role === 'admin') {
      this.dynamicMenus = [
        { label: 'Dashboard', url: '/dashboard', active: false },
        { label: 'Users', url: '/dashboard/admin', active: false },
        { label: 'Bookings', url: '/dashboard/bookings', active: false },
        { label: 'Profile', url: '/dashboard/profile', active: false },
      ];
    } else {
      this.dynamicMenus = [
        { label: 'Dashboard', url: '/dashboard', active: false },
        { label: 'Users', url: '/dashboard/users', active: false },
        { label: 'Bookings', url: '/dashboard/booking-list', active: false },
        { label: 'Payments', url: '/dashboard/payment', active: false },
        { label: 'Profile', url: '/dashboard/profile', active: false },
      ];
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const headerHeight = this.el.nativeElement.offsetHeight;
    this.isSticky = window.scrollY > headerHeight;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleDropdown(item: MenuItem, event: Event) {
    if (!this.hasChildren(item)) return;
    event.preventDefault();
    item.open = !item.open;
  }

  hasChildren(item: MenuItem): boolean {
    return Array.isArray(item.children) && item.children.length > 0;
  }

  onNavigate(): void {
    if (window.innerWidth < 992) {
      this.menuOpen = false;
    }
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
 */

interface MenuChild {
  label: string;
  url: string;
}

interface MenuItem {
  label: string;
  url?: string;
  active: boolean;
  open?: boolean;
  children?: MenuChild[];
}


import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-admin-layout',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminHeaderComponent implements OnInit {

  // HEADER DATA
  userName: string = '';

  // HEADER FUNCTIONS
  isSticky = false;
  menuOpen = false;

  // DASHBOARD DATA
  dashboardStats: any = {};
  
  dynamicMenus: MenuItem[] = [];

  constructor(private router: Router, private el: ElementRef, private authService: AuthService,) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
     const data = localStorage.getItem("HeaderMenus");
      data ? JSON.parse(data) : null;

  if (data) {
    this.dynamicMenus = JSON.parse(data).map((m: any) => ({
      label: m.MenuName,
      url: m.MenuUrl,
      active: false
    }));
  }

  }

  // Sticky header
  @HostListener('window:scroll', [])
  onScroll() {
    const headerHeight = this.el.nativeElement.offsetHeight;
    this.isSticky = window.scrollY > headerHeight;
  }

  // Mobile Menu Toggle
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Close menu after clicking a link
  onNavigate() {
    if (window.innerWidth < 992) {
      this.menuOpen = false;
    }
  }

  // Logout
  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
  hasChildren(item: MenuItem): boolean {
    return Array.isArray(item.children) && item.children.length > 0;
  }
}
