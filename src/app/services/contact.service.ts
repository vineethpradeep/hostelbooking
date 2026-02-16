import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from './api';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

 private apiUrl = `${API_BASE_URL}/Contact`;

  constructor(private http: HttpClient) {}

  sendMessage(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
