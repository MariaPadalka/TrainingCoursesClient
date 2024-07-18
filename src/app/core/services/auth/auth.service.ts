// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../../../enviroments/environment'; // Ensure this path is correct

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = environment.apiUrl;
//   private tokenKey = 'accsess-token';
//   private userKey = 'current_user';

//   constructor(private http: HttpClient) {}

//   login(email: string, password: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
//   }

//   saveToken(token: string): void {
//     localStorage.setItem(this.tokenKey, token); // Store token in localStorage
//   }

//   getToken(): string | null {
//     return localStorage.getItem(this.tokenKey); // Retrieve token from localStorage
//   }

//   saveUser(user: any): void {
//     localStorage.setItem(this.userKey, JSON.stringify(user));
//   }

//   getUser(): any {
//     const user = localStorage.getItem(this.userKey);
//     return user ? JSON.parse(user) : null;
//   }

//   getUserRole(): string {
//     return this.getUser()?.role;
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken(); // Check if token exists
//   }

//   logout(): void {
//     localStorage.removeItem(this.tokenKey);
//     localStorage.removeItem(this.userKey); // Remove token from localStorage on logout
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'access-token';
  private userKey = 'current_user';

  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = this.getUser();
    if (savedUser) {
      this.userSubject.next(savedUser);
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  saveUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userSubject.next(user); // Update user subject
  }

  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  getUserRole(): string {
    return this.getUser()?.role;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.userSubject.next(null);
  }
}
