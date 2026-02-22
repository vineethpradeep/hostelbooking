import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  loading = false;

  // From user page
  selectedUserId?: number;
  selectedUserName?: string;

  // Search & filter
  searchTerm = '';
  statusFilter = '';

  // Pagination
  currentPage = 1;
  readonly pageSize = 5;

  constructor(private bookingService: BookingListService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['userId']) {
        this.selectedUserId = +params['userId'];
        this.selectedUserName = params['userName'];
      }
    });
    this.search();
  }

  search() {
    this.loading = true;
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
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // ── Filtered list ─────────────────────────────
  get filteredBookings(): any[] {
    let list = this.BookingList;
    if (this.statusFilter) {
      list = list.filter(b => b.Status === this.statusFilter);
    }
    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      list = list.filter(b =>
        b.BookingNumber?.toString().toLowerCase().includes(term) ||
        b.TenantName?.toLowerCase().includes(term) ||
        b.PropertyName?.toLowerCase().includes(term) ||
        b.RoomNumber?.toLowerCase().includes(term) ||
        b.Status?.toLowerCase().includes(term)
      );
    }
    return list;
  }

  // ── Paged slice ───────────────────────────────
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

  // ── Summary Stats ─────────────────────────────
  get confirmedCount(): number {
    return this.BookingList.filter(b => b.Status === 'Confirmed').length;
  }

  get pendingCount(): number {
    return this.BookingList.filter(b => b.Status === 'Pending').length;
  }

  get cancelledCount(): number {
    return this.BookingList.filter(b => b.Status === 'Cancelled').length;
  }

  // ── Night duration helper ─────────────────────
  getNights(checkIn: string, checkOut: string): number {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
  }
}
