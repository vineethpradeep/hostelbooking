import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'https://localhost:7001/api/Profile';

  constructor(private http: HttpClient) {}

  getProfile(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }
  updateProfile(payload: any) {
  return this.http.put(
    'https://localhost:7001/api/Profile',
    payload
  );
}

}
