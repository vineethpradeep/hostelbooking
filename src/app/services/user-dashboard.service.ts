import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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
  getCurrentBooking(userId: number): Observable<any> {
  return this.http.get<any>(
    `${this.baseUrl}/current-booking`,
    {
      params: { userId: userId.toString() }
    }
  );
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
      `${this.baseUrl}/usermaintenance/${userId}`
    );
  }
getRecentBookings(userId: number, take: number = 5): Observable<any[]> {
  return this.http.get<any[]>(
    `${this.baseUrl}/recent-bookings`,
    {
      params: {
        userId: userId.toString(),
        take: take.toString()
      }
    }
  );
}

}