import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api';

export interface Metric {
  value: number;
  growthPercentage: number;
}

export interface DashboardSummary {
  totalProperties: Metric;
  totalUsers: Metric;
  activeTenants: Metric;
  monthlyRevenue: Metric;
}

export interface RecentBooking {
  bookingNumber: string;
  tenantName: string;
  propertyName: string;
  roomNumber: string;
  moveInDate: string;
  rent: number;
}

export interface RecentPayment {
  paymentNumber: string;
  tenantName: string;
  propertyName: string;
  paymentType: string;
  amount: number;
  paymentDate: string;
}


export interface SystemOverview {
  TotalProperties: number;
  ActiveProperties: number;
  TotalRooms: number;
  OccupiedRooms: number;
  OccupancyPercentage: number;
  AvailableRooms: number;
  PendingBookings: number;
  TotalRevenue: number;
  PendingPayments: string;
}
@Injectable({ providedIn: 'root' })
export class DashboardService {

   private baseUrl = `${API_BASE_URL}/dashboard`;

  constructor(private http: HttpClient) {}

  // ✅ Dashboard summary cards
  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.baseUrl}/summary`);
  }

  // ✅ Recent bookings table
  getRecentBookings(take: number = 5): Observable<RecentBooking[]> {
    return this.http.get<RecentBooking[]>(
      `${this.baseUrl}/recent-bookings?take=${take}`
    );
  }

  // ✅ Recent payments table
  getRecentPayments(take: number = 5): Observable<RecentPayment[]> {
    return this.http.get<RecentPayment[]>(
      `${this.baseUrl}/recent-payments?take=${take}`
    );
  }

  
  getSystemOverview(): Observable<SystemOverview> {
    return this.http.get<SystemOverview>(
      `${this.baseUrl}/system-overview`
    );
}
}
