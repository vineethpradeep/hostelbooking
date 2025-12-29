import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentDetails } from '../components/payment/payment.component';

export interface CreatePaymentModel {
  bookingId: number;
  paymentMethod: string;
  totalAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  // ✅ Base API URL (ONE SOURCE OF TRUTH)
  private apiUrl = 'https://localhost:7001/api/Payments';

  constructor(private http: HttpClient) {}

  // ✅ GET payment details
  getPaymentDetails(): Observable<PaymentDetails[]> {
    return this.http.get<PaymentDetails[]>(`${this.apiUrl}/details`);
  }

  // ✅ POST create payment (FIXED)
 /* ✅ POST – Create payment */
  createPayment(paymentDto: CreatePaymentModel): Observable<any> {
    return this.http.post(
      this.apiUrl,
      paymentDto,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}
