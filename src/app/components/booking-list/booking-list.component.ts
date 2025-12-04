import { Component, OnInit } from '@angular/core';
import { BookingListService } from '../../services/booking-list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class BookingListComponent implements OnInit {

  BookingList: any[] = [];


  constructor(private bookingService: BookingListService) {}

  ngOnInit(): void {
    this.search();
  }

  search() {
    const query = {
      propertyId: 1,
      userId: 17,
      bedId: 2,
      status: 'Confirmed',
      fromDate: '2025-01-01',
      toDate: '2025-01-31',
      page: 1,
      pageSize: 20
    };

    this.bookingService.searchBookings(query).subscribe({
      next: data => this.BookingList = data,
      error: err => console.error(err)
    });
  }
}
