import { Component, AfterViewInit } from '@angular/core';
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
