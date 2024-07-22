// teacher.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/environment';
import { Teacher } from '../../models/teacher.model';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private apiUrl = environment.apiUrl;
  private basicPath = 'teachers';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTeacherById(teacherId: string): Observable<Teacher> {
    return this.http.get<Teacher>(
      `${this.apiUrl}/${this.basicPath}/${teacherId}`
    );
  }

  getCurrentTeacher(): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${this.basicPath}/current`);
  }

  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${this.apiUrl}/${this.basicPath}`, teacher);
  }

  updateTeacher(id: string, teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(
      `${this.apiUrl}/${this.basicPath}/${id}`,
      teacher
    );
  }

  patchTeacher(id: string, teacher: Partial<Teacher>): Observable<Teacher> {
    return this.http.patch<Teacher>(
      `${this.apiUrl}/${this.basicPath}/${id}`,
      teacher
    );
  }

  deleteTeacher(id: string): Observable<string> {
    return this.http
      .delete<{ message: string }>(`${this.apiUrl}/${this.basicPath}/${id}`)
      .pipe(map((response) => response.message));
  }
}
