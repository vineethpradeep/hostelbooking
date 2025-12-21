import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  MaintenanceRequest,
  UpcomingPayment
} from '../models/user-dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {

  private baseUrl = 'https://localhost:7001/api/UserDashboard';

  constructor(private http: HttpClient) {}

  // ================= BOOKING SUMMARY =================
  getBookingSummary(userId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/dashboard/booking-summary/${userId}`
    );
  }

  // ================= AMENITIES =================
  getRoomAmenities(roomId: number): Observable<{ amenities: string }> {
    return this.http.get<{ amenities: string }>(
      `${this.baseUrl}/rooms/${roomId}/amenities`
    );
  }

  // ================= UPCOMING PAYMENTS =================
  getUpcomingPayments(userId: number): Observable<UpcomingPayment[]> {
    return this.http.get<UpcomingPayment[]>(
      `${this.baseUrl}/payments/upcoming/${userId}`
    );
  }

  // ================= MAINTENANCE =================
  getMaintenanceRequests(userId: number): Observable<MaintenanceRequest[]> {
    return this.http.get<MaintenanceRequest[]>(
      `${this.baseUrl}/maintenance/user/${userId}`
    );
  }
}
