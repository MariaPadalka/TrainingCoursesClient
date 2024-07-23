import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../../../core/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { showError } from '../../../../core/handlers/error.handler.';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatIconModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    errorMessage = '';
    hidePassword = true;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });

        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/']);
        }
    }

    onSubmit(): void {
        if (this.form.valid) {
            const { email, password } = this.form.value;
            this.authService.login(email, password).subscribe({
                next: (response) => {
                    this.authService.saveToken(response.accessToken);
                    this.authService.saveUser(new User(email, response.role));
                    this.router.navigate(['/']);
                },
                error: (response: HttpErrorResponse) => {
                    if (response.status === 500) {
                        this.errorMessage = response.statusText;
                    } else {
                        this.errorMessage = response.error.message;
                    }
                    console.error('Login failed', response);
                    showError(this.snackBar, response);
                },
            });
        }
    }
}
