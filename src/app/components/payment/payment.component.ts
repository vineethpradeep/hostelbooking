import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaymentService } from '../../services/payments.service';



export interface PaymentDetails {
  bookingNumber:string;
  transactionId: string;
  phone: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  paymentList: PaymentDetails[] = [];
  loading = false;
  errorMessage = '';

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.loading = true;

this.paymentService.getPaymentDetails().subscribe({
  next: (data: any[]) => {
    this.paymentList = data.map(p => ({
      bookingNumber:p.BookingNumber,
      transactionId: p.TransactionId,
      phone: p.PhoneNumber,
      amount: p.Amount,
      status: p.Status
    }));
  },
  error: () => {
    console.error('Failed to load payments');
  }
});
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
