import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private baseUrl = 'https://localhost:7001/api/Menu';

  constructor(private http: HttpClient) {}

  // API call
  fetchMenusFromAPI(role: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${role}`);
  }

  // Save to LocalStorage
  saveMenusToLocal(role: string, menus: any[]) {
    localStorage.setItem(role + 'Menus', JSON.stringify(menus));
  }

  // Get from LocalStorage
  getMenus(role: string) {
    const menus = localStorage.getItem(role + 'Menus');
    return menus ? JSON.parse(menus) : [];
  }

}
