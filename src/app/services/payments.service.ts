import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentDetails } from '../components/payment/payment.component';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://localhost:7001/api/Payments/details';
  // 🔴 change port if needed

  constructor(private http: HttpClient) {}

  getPaymentDetails(): Observable<PaymentDetails[]> {
    return this.http.get<PaymentDetails[]>(this.apiUrl);
  }
}
