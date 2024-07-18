import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = this.authService.getUserRole(); // Implement this method in your AuthService
    const expectedRole = next.data['role']; // Retrieve the expected role from route data

    if (role === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login if roles don't match
      return false;
    }
  }
}
