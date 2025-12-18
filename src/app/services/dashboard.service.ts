import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Metric {
  value: number;
  growthPercentage?: number;
}

export interface MonthlyBooking {
  month: string;
  count: number;
}

export interface UserRoleCount {
  role: string;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {

 // private baseUrl = 'https://localhost:7001/api/Dashboard';

  constructor(private http: HttpClient) {}

getTotalProperties(): Observable<number> {
  return this.http.get<number>(
    'https://localhost:7001/api/Dashboard/property/total'
  );
}

  getTotalUsers(): Observable<any> {
    return this.http.get<number>('https://localhost:7001/api/Dashboard/totalusers');
  }

 /*  getActiveTenants(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/active-tenants`);
  }

  getMonthlyRevenue(): Observable<any> {
    return this.http.get(`${this.baseUrl}/revenue/monthly`);
  }

  getMonthlyBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/charts/bookings`);
  }

  getUserRoleDistribution(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/charts/user-roles`);
  } */
}