import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = `${API_BASE_URL}/Profile`;

  constructor(private http: HttpClient) {}

  getProfile(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }
  updateProfile(payload: any) {
  return this.http.put(
    this.baseUrl,
    payload
  );
}

}
