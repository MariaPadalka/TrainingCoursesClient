import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse,
    HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        let authReq = req;

        if (token) {
            authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        console.log('Request', req.url);
        console.log('body:', req.body);

        return next.handle(authReq).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('Response:', event.body);
                }
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && !error.url?.includes('/auth')) {
                    return this.handle401Error(authReq, next);
                }
                return throwError(() => error);
            })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        return this.authService.refreshToken().pipe(
            switchMap((accessToken: string) => {
                this.authService.saveToken(accessToken);
                const clonedRequest = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                return next.handle(clonedRequest);
            }),
            catchError((error: HttpErrorResponse) => {
                this.authService.logout();
                this.snackBar.open('Token expired. Please login.', 'Close', {
                    duration: 3000,
                });
                this.router.navigate(['/login']);
                return throwError(() => error);
            })
        );
    }
}
