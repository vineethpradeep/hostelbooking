import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_BASE_URL } from './api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // -----------------------------
  // LocalStorage Keys
  // -----------------------------
  private readonly TOKEN_KEY = 'app_token';
  private readonly USER_ROLE = 'app_role';
  private readonly USER_NAME = 'app_user';
  private readonly USER_ID   = 'app_user_id';
  private readonly HEADER_MENUS = 'HeaderMenus';

  // -----------------------------
  // API Base URL
  // -----------------------------
  //private readonly baseUrl = 'https://localhost:7001/api/Auth';
  private readonly baseUrl = `${API_BASE_URL}/Auth`;

  constructor(private http: HttpClient) {}



    // REGISTER
  // -----------------------------
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
  // -----------------------------
  // LOGIN
  // -----------------------------
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      map((res: any) => {

        console.log('LOGIN RESPONSE 👉', res);

        const token = res?.Data?.AccessToken;
        const user  = res?.Data?.User;

        if (!token || !user || user.UserId == null) {
          throw new Error('Invalid login response: UserId missing');
        }

        const role = user.Roles[0];
        const name = user.FirstName;
        const userId = user.UserId; // ✅ FIXED

        this.saveAuthData(token, role, name, userId);
        this.saveMenus(res.Data.Menus);

        return res;
      })
    );
  }

  // -----------------------------
  // SAVE AUTH DATA
  // -----------------------------
  private saveAuthData(
    token: string,
    role: string,
    username: string,
    userId: number
  ): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_ROLE, role);
    localStorage.setItem(this.USER_NAME, username);
    localStorage.setItem(this.USER_ID, userId.toString()); // ✅ FIXED
  }

  // -----------------------------
  // SAVE MENUS
  // -----------------------------
  private saveMenus(menus: any[]): void {
    localStorage.setItem(this.HEADER_MENUS, JSON.stringify(menus ?? []));
  }

  // -----------------------------
  // LOGOUT
  // -----------------------------
  logout(): void {
    localStorage.clear();
  }

  // -----------------------------
  // HELPERS
  // -----------------------------
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getRole(): string {
    return localStorage.getItem(this.USER_ROLE) ?? '';
  }

  getUserName(): string {
    return localStorage.getItem(this.USER_NAME) ?? '';
  }

  getUserId(): number {
    return Number(localStorage.getItem(this.USER_ID)) || 0;
  }

  getMenus(): any[] {
    return JSON.parse(localStorage.getItem(this.HEADER_MENUS) ?? '[]');
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) ?? '';
  }
}
