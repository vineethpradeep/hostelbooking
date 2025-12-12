/* import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UsersDashboardComponent implements AfterViewInit {

  userName = 'Raja';

  // Top stat cards
  topStats = [
    { label: 'Current Booking', value: 'Active', meta: 'Since Jan 15, 2025' },
    { label: 'Monthly Rent', value: '₹8,000', meta: 'Next due Nov 1, 2025' },
    { label: 'Pending Payments', value: '2', meta: 'Total ₹8,500' },
    { label: 'Stay Duration', value: '10 months', meta: 'Since Jan 2025' }
  ];

  // Booking details
  details = {
    property: 'Karthick PG',
    room: '101',
    roomType: 'Single Occupancy',
    floor: '1st Floor',
    moveIn: 'Jan 15, 2025',
    rent: '₹8,000',
    deposit: '₹16,000 (Paid)',
    address: 'Sector 62, Coimbatore',
    owner: '1243434',
    contract: '12 Months',
    duration: '10 months'
  };

  // Amenities
  amenities = ['AC', 'WiFi', 'Attached Bathroom', 'Wardrobe', 'Study Table'];

  // Upcoming payment
  upcomingPayments = [
    { type: 'Monthly Rent', amount: '₹8,000', due: 'Nov 1, 2025', status: 'Due Soon' }
  ];

  // Payment history
  paymentHistory = [
    { date: 'Oct 1, 2025', description: 'Monthly Rent', amount: '₹8,000', method: 'UPI', status: 'Paid' },
    { date: 'Sep 1, 2025', description: 'Monthly Rent', amount: '₹8,000', method: 'UPI', status: 'Paid' }
  ];

  // Maintenance requests
  maintenance = [
    { id: '#MR-1023', issue: 'Plumbing', description: 'Bathroom tap leak', date: 'Oct 20, 2025', status: 'Resolved' },
    { id: '#MR-1031', issue: 'Fan', description: 'Ceiling fan wobble', date: 'Nov 2, 2025', status: 'In Progress' }
  ];

  constructor() {}

  ngAfterViewInit(): void {}

  payNow(item: any) {
    console.log('Pay Now:', item);
  }

  requestMaintenance() {
    console.log('Request Maintenance clicked');
  }
}
 */

import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

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
  selector: 'app-user-layout',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  // HEADER
  dynamicMenus: MenuItem[] = [];
  userName: string = '';
  menuOpen = false;
  isSticky = false;

  // DASHBOARD
  dashboard: any = {};

  constructor(private router: Router, private el: ElementRef) {}

  ngOnInit(): void {

    // Load username
    this.userName = localStorage.getItem('app_user') ?? '';

    // Load user header menus
     const data = localStorage.getItem("UserHeaderMenus");
      data ? JSON.parse(data) : null;

   

  if (data) {
    this.dynamicMenus = JSON.parse(data).map((m: any) => ({
      label: m.MenuName,
      url: m.MenuUrl,
      active: false
    }));
  }
``
    // Load user dashboard data
    const dash = localStorage.getItem('UserDashboard');
    if (dash) this.dashboard = JSON.parse(dash);
  }

  // Sticky header
  @HostListener('window:scroll', [])
  onScroll() {
    const h = this.el.nativeElement.offsetHeight;
    this.isSticky = window.scrollY > h;
  }

  // Mobile menu toggle
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Close menu after clicking a link
  onNavigate() {
    if (window.innerWidth < 992) {
      this.menuOpen = false;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
