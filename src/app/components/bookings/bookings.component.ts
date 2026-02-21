import { Component, OnInit } from '@angular/core';
import { BookingListService } from '../../services/booking-list.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-list',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BookingListComponent implements OnInit {

  BookingList: any[] = [];

  // Search
  searchTerm = '';

  // Pagination
  currentPage = 1;
  readonly pageSize = 5;

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
      next: data => {
        this.BookingList = data;
        this.currentPage = 1;
      },
      error: err => console.error(err)
    });
  }

  // ── Filtered list based on search term ──
  get filteredBookings(): any[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.BookingList;
    return this.BookingList.filter(b =>
      (b.BookingNumber?.toString().toLowerCase().includes(term)) ||
      (b.Status?.toLowerCase().includes(term))
    );
  }

  // ── Current page slice ──
  get pagedBookings(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredBookings.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredBookings.length / this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredBookings.length);
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
