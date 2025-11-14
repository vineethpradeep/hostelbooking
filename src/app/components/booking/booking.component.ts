import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-booking',
  imports: [    CommonModule, RouterModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent  implements OnInit{

  BookingList = [
  {
    
    customerName: 'Ravi Kumar',  
    roomNo: 'A101',
    checkIn: '2025-02-10',
    checkOut: '2025-02-12',
    bookingStatus: 'Confirmed',
    
  },
  {
    
    customerName: 'Priya Sharma',
    roomNo: 'B203',
    checkIn: '2025-02-14',
    checkOut: '2025-02-16',
    bookingStatus: 'Pending',
   
  },
  {
    
    customerName: 'Arun Nair',
    roomNo: 'C105',
    checkIn: '2025-02-18',
    checkOut: '2025-02-20',
    bookingStatus: 'Cancelled',
    
  },
  {
    
    customerName: 'Meera Joseph',
    roomNo: 'A102',
    checkIn: '2025-02-22',
    checkOut: '2025-02-25',
    bookingStatus: 'Confirmed',
   
  },
   {
    
    customerName: 'Ravi Kumar',  
    roomNo: 'A101',
    checkIn: '2025-02-10',
    checkOut: '2025-02-12',
    bookingStatus: 'Confirmed',
    
  },
  {
    
    customerName: 'Priya Sharma',
    roomNo: 'B203',
    checkIn: '2025-02-14',
    checkOut: '2025-02-16',
    bookingStatus: 'Pending',
   
  },
  {
    
    customerName: 'Arun Nair',
    roomNo: 'C105',
    checkIn: '2025-02-18',
    checkOut: '2025-02-20',
    bookingStatus: 'Cancelled',
    
  },
  {
    
    customerName: 'Meera Joseph',
    roomNo: 'A102',
    checkIn: '2025-02-22',
    checkOut: '2025-02-25',
    bookingStatus: 'Confirmed',
   
  }
];

  constructor() {}

  ngOnInit(): void {}
}


