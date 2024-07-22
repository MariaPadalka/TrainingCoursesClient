import { Injectable } from '@angular/core';
import { Subject } from '../../models/subject.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private apiUrl = `${environment.apiUrl}/subjects`;

  constructor(private http: HttpClient) {}

  getAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.apiUrl);
  }

  getSubjectById(id: string): Observable<Subject> {
    return this.http.get<Subject>(`${this.apiUrl}/${id}`);
  }

  createSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.apiUrl, subject);
  }

  updateSubject(id: string, subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(`${this.apiUrl}/${id}`, subject);
  }

  patchSubject(id: string, subject: Partial<Subject>): Observable<Subject> {
    return this.http.patch<Subject>(`${this.apiUrl}/${id}`, subject);
  }

  deleteSubject(id: string): Observable<string> {
    return this.http
      .delete<{ message: string }>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.message));
  }
}
