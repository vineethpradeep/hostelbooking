import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {

  private baseUrl = 'https://localhost:7001/api/UserDashboard';

  constructor(private http: HttpClient) {}

  // ✅ DASHBOARD SUMMARY
  getDashboard(userId: number) {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  // ✅ CURRENT BOOKING DETAILS
  getCurrentBooking() {
    return this.http.get<any>(`${this.baseUrl}/current-booking`);
  }

  // ✅ ROOM AMENITIES
  getRoomAmenities(roomId: number) {
    return this.http.get<{ Amenities: string }>(
      `${this.baseUrl}/${roomId}/Amenities`
    );
  }

  // ✅ UPCOMING PAYMENTS
  getUpcomingPayments(userId: number) {
    return this.http.get<any[]>(
      `${this.baseUrl}/upcoming/${userId}`
    );
  }

  // ✅ MAINTENANCE REQUESTS
  getMaintenanceRequests(userId: number) {
    return this.http.get<any[]>(
      `${this.baseUrl}/user/${userId}`
    );
  }
}
