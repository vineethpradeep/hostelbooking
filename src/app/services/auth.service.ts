import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  setTokenAfterLogin(token: any, role: any, firstName: any) {
    throw new Error('Method not implemented.');
  }

  // -----------------------------
  // LocalStorage Keys
  // -----------------------------
  private readonly TOKEN_KEY = 'app_token';
  private readonly USER_ROLE = 'app_role';
  private readonly USER_NAME = 'app_user';

  private readonly HEADER_MENUS = 'HeaderMenus';
 // private readonly USER_HEADER_MENUS = 'UserHeaderMenus';

  // -----------------------------
  // API Base URL
  // -----------------------------
  private readonly baseUrl = 'https://localhost:7001/api/Auth';
 // setTokenAfterLogin: any;

  constructor(private http: HttpClient) {}

  // -----------------------------
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

        // Expected response:
        // res.Data.AccessToken
        // res.Data.User.Roles[0] -> admin | user
        // res.Data.User.FirstName
        // res.Data.Menus

        if (res?.Data?.AccessToken && res?.Data?.User?.Roles?.length) {

          const token = res.Data.AccessToken;
          const role  = res.Data.User.Roles[0];
          const name  = res.Data.User.FirstName;

          this.saveAuthData(token, role, name);
          this.saveMenusByRole(res.Data.Menus, role);
        }

        return res;
      })
    );
  }

  // -----------------------------
  // SAVE AUTH DATA
  // -----------------------------
  private saveAuthData(token: string, role: string, username: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_ROLE, role);
    localStorage.setItem(this.USER_NAME, username);
  }

  // -----------------------------
  // SAVE MENUS BY ROLE
  // -----------------------------


  private saveMenusByRole(menus: any[], role: string): void {
       localStorage.setItem(this.HEADER_MENUS, JSON.stringify(menus));
  }

  // -----------------------------
  // LOGOUT
  // -----------------------------
  logout(): void {
    localStorage.clear();
  }

  // -----------------------------
  // AUTH HELPERS (GUARDS USE THESE)
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



  getMenus(): any[] {
    return JSON.parse(localStorage.getItem(this.HEADER_MENUS) ?? '[]');
  }

  // -----------------------------
  // TOKEN (OPTIONAL)
  // -----------------------------
  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) ?? '';
  }
}
