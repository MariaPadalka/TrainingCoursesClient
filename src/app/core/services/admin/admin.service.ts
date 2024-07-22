import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../../models/user.model';
import { Admin } from '../../models/admin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = environment.apiUrl;
  private basicPath = 'admins';

  constructor(private http: HttpClient) {}

  registerAdmin(email: string): Observable<Admin> {
    return this.http
      .post<{ user: Admin }>(`${this.apiUrl}/${this.basicPath}`, { email })
      .pipe(map((response) => response.user));
  }

  deleteAdminById(adminId: string): Observable<string> {
    return this.http
      .delete<{ message: string }>(
        `${this.apiUrl}/${this.basicPath}/${adminId}`
      )
      .pipe(map((response) => response.message));
  }

  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiUrl}/${this.basicPath}`);
  }
}
