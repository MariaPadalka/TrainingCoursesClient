import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
    selector: 'app-password-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatTabsModule,
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './password-form.component.html',
    styleUrl: './password-form.component.scss',
})
export class PasswordFormComponent implements OnInit {
    submitted = false;
    errorMessage: string = '';
    passwordForm!: FormGroup;
    hideOldPassword = true;
    hideNewPassword = true;
    hideConfirmNewPassword = true;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.passwordForm = this.fb.group(
            {
                oldPassword: ['', Validators.required],
                newPassword: [
                    '',
                    [Validators.required, Validators.minLength(8)],
                ],
                confirmNewPassword: ['', Validators.required],
            },
            { validator: this.passwordsMatch }
        );
    }
    passwordsMatch(formGroup: FormGroup): Object | null {
        const { newPassword, confirmNewPassword } = formGroup.controls;
        return newPassword.value === confirmNewPassword.value
            ? null
            : { mismatch: true };
    }

    changePassword(): void {
        this.submitted = true;
        if (this.passwordForm.invalid) {
            return;
        }

        const { oldPassword, newPassword } = this.passwordForm.value;

        this.authService.changePassword(oldPassword, newPassword).subscribe({
            next: (message: string) => {
                alert(message);
                this.passwordForm.reset();
                this.authService.logout();
                this.router.navigate(['/login']);
            },
            error: (response: HttpErrorResponse) => {
                console.error('Password change failed', response.error);
                this.errorMessage = response.error.message;
            },
        });
    }
}
