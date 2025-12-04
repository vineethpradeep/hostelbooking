import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // -----------------------------
  // LocalStorage Keys
  // -----------------------------
  private TOKEN_KEY = 'app_token';
  private USER_ROLE = 'app_role';
  private USER_NAME = 'app_user';

  private ADMIN_HEADER_MENUS = 'AdminHeaderMenus';

  private USER_HEADER_MENUS = 'UserHeaderMenus';
  private USER_DASHBOARD = 'UserDashboard';

  // -----------------------------
  // API Base URL
  // -----------------------------
  private baseUrl = 'https://localhost:7001/api/Auth';

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

        debugger;

        // Expected response: { token, role, username }
        if (res && res.Data.AccessToken && res.Data.User.Roles[0]) {

          this.setTokenAfterLogin(res.Data.AccessToken, res.Data.User.Roles[0], res.Data.User.FirstName);
          this.setMenuAfterLogin(res.Data.Menus);          
        }

        return res;
      })
    );
  }

  // -----------------------------
  // SAVE TOKEN + ROLE + USERNAME
  // -----------------------------
  setTokenAfterLogin(token: string, role: string, username: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_ROLE, role);
    localStorage.setItem(this.USER_NAME, username);
  }
setMenuAfterLogin(menus: any) {
  localStorage.setItem(this.ADMIN_HEADER_MENUS, JSON.stringify(menus));
}


  // -----------------------------
  // LOGOUT
  // -----------------------------
  logout() {
    localStorage.clear();
  }

  // -----------------------------
  // AUTH GUARD HELPERS
  // -----------------------------
  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token;
  }

  getUserRole(): string {
    return localStorage.getItem(this.USER_ROLE) ?? '';
  }

  getUserName(): string {
    return localStorage.getItem(this.USER_NAME) ?? '';
  }

    getMenuList(): string {
    return localStorage.getItem(this.ADMIN_HEADER_MENUS) ?? '';
  }


  // -----------------------------
  // USER MENUS
  // -----------------------------
 /*  loadUserHeaderMenus() {
    this.http.get('https://localhost:7001/api/Menu/user/header')
      .subscribe((res: any) => {
        if (res.success) {
          localStorage.setItem(this.USER_HEADER_MENUS, JSON.stringify(res.data));
        }
      });
  }
 */
  // -----------------------------
  // USER DASHBOARD (NO USER-ID)
  // -----------------------------
 /*  loadUserDashboard() {
    this.http.get('https://localhost:7001/api/Dashboard/user/dashboard')
      .subscribe((res: any) => {
        if (res.success) {
          localStorage.setItem(this.USER_DASHBOARD, JSON.stringify(res.data));
        }
      });
  }
 */
}
