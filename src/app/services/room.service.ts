import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Rooms } from '../models/room.model';




@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = 'https://localhost:7001/api/Room';

  constructor(private http: HttpClient) {}

  // ✅ Get all rooms by property
  getRoomsByProperty(propertyId: number): Observable<Rooms[]> {
    return this.http.get<Rooms[]>(
      `${this.apiUrl}/by-property/${propertyId}`
    );
  }

  // ✅ Get SINGLE room by id (from list)
  getRoomById(propertyId: number, roomId: number): Observable<Rooms | undefined> {
    return this.getRoomsByProperty(propertyId).pipe(
      map((rooms: Rooms[]) =>
        rooms.find(r => r.RoomId === roomId)
      )
    );
  }
  
   // ✅ Get room details
  getRent(roomId: number): Observable<Rooms> {
    return this.http.get<Rooms>(`${this.apiUrl}/${roomId}`);
  }
 
 filterRooms(
  propertyId: number,
  minPrice: number | null,
  maxPrice: number | null,
  capacity: number | null
) {
  return this.http.post<any[]>(
    `${this.apiUrl}/filter`,
    { propertyId, minPrice, maxPrice, capacity }
  );
}
}

