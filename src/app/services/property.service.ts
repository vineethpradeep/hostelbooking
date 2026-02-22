import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api';
import { PropertyDto } from '../models/property.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private baseUrl = `${API_BASE_URL}/Property`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): { headers?: HttpHeaders } {
    const token = localStorage.getItem('token');
    if (!token) return {};
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  getAll(): Observable<ApiResponse<PropertyDto[]>> {
    return this.http.get<ApiResponse<PropertyDto[]>>(this.baseUrl, this.getAuthHeaders());
  }

  create(property: PropertyDto): Observable<ApiResponse<PropertyDto>> {
    return this.http.post<ApiResponse<PropertyDto>>(this.baseUrl, property, this.getAuthHeaders());
  }

  update(property: PropertyDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${property.PropertyId}`, property, this.getAuthHeaders());
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.getAuthHeaders());
  }
}
