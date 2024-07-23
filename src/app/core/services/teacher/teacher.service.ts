import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/environment';
import { Teacher } from '../../models/teacher.model';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { TeacherPopulated } from '../../models/populated/teacher-populated';

@Injectable({
    providedIn: 'root',
})
export class TeacherService {
    private apiUrl = environment.apiUrl;
    private basicPath = 'teachers';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    getTeachers(): Observable<TeacherPopulated[]> {
        return this.http.get<TeacherPopulated[]>(
            `${this.apiUrl}/${this.basicPath}`
        );
    }

    getTeacherById(teacherId: string): Observable<TeacherPopulated> {
        return this.http.get<TeacherPopulated>(
            `${this.apiUrl}/${this.basicPath}/${teacherId}`
        );
    }

    getCurrentTeacher(): Observable<TeacherPopulated> {
        return this.http.get<TeacherPopulated>(
            `${this.apiUrl}/${this.basicPath}/current`
        );
    }

    createTeacher(teacher: Partial<Teacher>): Observable<Teacher> {
        return this.http.post<Teacher>(
            `${this.apiUrl}/${this.basicPath}`,
            teacher
        );
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
            .delete<{
                message: string;
            }>(`${this.apiUrl}/${this.basicPath}/${id}`)
            .pipe(map((response) => response.message));
    }
}
