import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { environment } from '../../../../enviroments/environment';
import { User } from '../../models/user.model';
import { RoleType } from '../../types/role.type';

interface AuthResponse {
  accessToken: string;
  role: RoleType;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'access-token';
  private userKey = 'user';

  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = this.getUser();
    if (savedUser) {
      this.userSubject.next(savedUser);
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
  }

  refreshToken(): Observable<string> {
    return this.http
      .post<{ accessToken: string }>(
        `${this.apiUrl}/auth/refresh`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(map((response: { accessToken: string }) => response.accessToken));
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  saveUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUser(): User | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.userSubject.next(null);
    this.http.post<{ accessToken: string }>(
      `${this.apiUrl}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
