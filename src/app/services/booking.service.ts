import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingFormDto } from '../models/booking-form.model';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'https://localhost:7001/api/Booking';  // CHANGE THIS to your API URL

  constructor(private http: HttpClient) {}

  // GET ALL BOOKINGS
 /*  getBookings(): Observable<BookingFormDto[]> {
    return this.http.get<BookingFormDto[]>(this.baseUrl);
  }
 */
  // GET ONE BOOKING
  /* getBooking(id: number): Observable<BookingFormDto> {
    return this.http.get<BookingFormDto>(`${this.baseUrl}/${id}`);
  }
 */
  // CREATE BOOKING
  createBooking(dto: BookingFormDto): Observable<any> {
    return this.http.post(this.baseUrl, dto);
  }

  // UPDATE BOOKING
  /* updateBooking(dto: BookingFormDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${dto.bookingId}`, dto);
  }
 */
  // DELETE BOOKING
 /*  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  } */

    getBedBookingDetails(bedId: number) {
  return this.http.get<any>(
    `${this.baseUrl}/beds/${bedId}/booking-details`
  );
}

}
