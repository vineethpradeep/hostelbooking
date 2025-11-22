import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../models/user.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // set this to your API base
  private baseUrl = 'https://localhost:7001/api/Users';
  deleteUser: any;

  constructor(private http: HttpClient) {}

  // If your API requires auth, include headers here (optional)
  private getAuthHeaders(): { headers?: HttpHeaders } {
    const token = localStorage.getItem('token');
    if (!token) return {};
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // Returns ApiResponse<UserDto[]>
  getUsers(propertyId: number, userType: string): Observable<ApiResponse<UserDto[]>> {
    const url = `${this.baseUrl}/property/${propertyId}/type/${encodeURIComponent(userType)}`;
    return this.http.get<ApiResponse<UserDto[]>>(url, this.getAuthHeaders());
  }
updateUser(user: UserDto) {
  return this.http.put(`${this.baseUrl}/${user.UserId}`, user);
}

deleteUserById(userId: number) {
  return this.http.delete(`${this.baseUrl}/${userId}`);
}


}
