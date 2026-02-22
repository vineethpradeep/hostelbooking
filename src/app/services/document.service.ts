import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api';
import { DocumentDto } from '../models/document.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class DocumentService {

  private baseUrl = `${API_BASE_URL}/UserDocuments`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): { headers?: HttpHeaders } {
    const token = localStorage.getItem('app_token');
    if (!token) return {};
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  getByUser(userId: number): Observable<ApiResponse<DocumentDto[]>> {
    return this.http.get<ApiResponse<DocumentDto[]>>(
      `${this.baseUrl}/user/${userId}`,
      this.getAuthHeaders()
    );
  }

  upload(userId: number, file: File, docType: string, docName: string): Observable<ApiResponse<DocumentDto>> {
    const formData = new FormData();
    formData.append('UserId', userId.toString());
    formData.append('DocumentType', docType);
    formData.append('DocumentName', docName);
    formData.append('File', file, file.name);
    const token = localStorage.getItem('app_token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.post<ApiResponse<DocumentDto>>(this.baseUrl, formData, { headers });
  }

  update(doc: DocumentDto): Observable<ApiResponse<DocumentDto>> {
    return this.http.put<ApiResponse<DocumentDto>>(
      `${this.baseUrl}/${doc.DocumentId}`,
      doc,
      this.getAuthHeaders()
    );
  }

  delete(docId: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(
      `${this.baseUrl}/${docId}`,
      this.getAuthHeaders()
    );
  }
}
