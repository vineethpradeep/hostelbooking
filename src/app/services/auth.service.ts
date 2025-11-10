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
  private TOKEN_KEY = 'app_token';
  private USER_ROLE = 'app_role';
  private USER_NAME = 'app_user';
  private baseUrl = 'https://localhost:7001/api/Auth'; // set to your API base; update if needed

  constructor(private http: HttpClient) {}

  register(data: RegisterModel): Observable<any> {
      return this.http.post(`${this.baseUrl}/register`, data);
  }

   login(data: LoginModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  // Save token and role after login
  setTokenAfterLogin(token: string, role: string,username:string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_ROLE, role);
    localStorage.setItem(this.USER_NAME, username);
  }

  // Logout user
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_ROLE);
    localStorage.removeItem(this.USER_NAME);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token !== null && token !== '' && token !== undefined;
  }

  // Get saved token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Get user role
  getUserRole(): string {
    return localStorage.getItem(this.USER_ROLE) ?? '';
  }
  getUserName(): string {
     return localStorage.getItem(this.USER_NAME) ?? '';
  }
}