import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/register.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7001/api/Auth'; // set to your API base; update if needed

  constructor(private http: HttpClient) {}

  register(data: RegisterModel): Observable<any> {
      return this.http.post(`${this.baseUrl}/register`, data);
  }

   login(data: LoginModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
}