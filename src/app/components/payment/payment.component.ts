import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaymentService } from '../../services/payments.service';

export interface PaymentDetails {
  bookingNumber: string;
  transactionId: string;
  phone: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  paymentList: PaymentDetails[] = [];
  loading = false;
  errorMessage = '';

  // Search
  searchTerm = '';

  // Pagination
  currentPage = 1;
  readonly pageSize = 5;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.loading = true;

    this.paymentService.getPaymentDetails().subscribe({
      next: (data: any[]) => {
        this.paymentList = data.map(p => ({
          bookingNumber: p.BookingNumber,
          transactionId: p.TransactionId,
          phone: p.PhoneNumber,
          amount: p.Amount,
          status: p.Status
        }));
        this.loading = false;
        this.currentPage = 1;
      },
      error: () => {
        console.error('Failed to load payments');
        this.loading = false;
      }
    });
  }

  // ── Filtered list ──
  get filteredPayments(): PaymentDetails[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.paymentList;
    return this.paymentList.filter(p =>
      p.bookingNumber?.toLowerCase().includes(term) ||
      p.transactionId?.toLowerCase().includes(term) ||
      p.phone?.toLowerCase().includes(term) ||
      p.status?.toLowerCase().includes(term)
    );
  }

  // ── Current page slice ──
  get pagedPayments(): PaymentDetails[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredPayments.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPayments.length / this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredPayments.length);
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'success': return 'badge-success';
      case 'pending': return 'badge-warning';
      case 'failed': return 'badge-danger';
      default: return 'badge-secondary';
    }
  }
}
