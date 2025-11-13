import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [    CommonModule,
    RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

 userSummary = 
  "A verified user in the hostel booking system with access to room bookings, payment history, and personal account settings.";

user = {
  firstName: 'Ravi',
  lastName: 'Kumar',
  email: 'ravi.kumar@example.com',
  phone: '9876543210',
  totalBookings: 4
};

  constructor() {}

  ngOnInit(): void {}
}

