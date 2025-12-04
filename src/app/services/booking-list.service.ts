import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking-list.model';


@Injectable({
  providedIn: 'root'
})
export class BookingListService {

  private apiUrl = 'https://localhost:7001/api/booking';

  constructor(private http: HttpClient) {}

  // ------------------------------------------
  // GET: Fetch all bookings
  // ------------------------------------------
 /*  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }
 */
  // ------------------------------------------
  // GET: Search bookings with query parameters
  // api/booking/search?propertyId=..&status=.. etc.
  // ------------------------------------------
  searchBookings(query: any): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/search`, { params: query });
  }
}
