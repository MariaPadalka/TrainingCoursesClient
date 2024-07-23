import { AuthService } from '../../../../core/services/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { User } from '../../../../core/models/user.model';
import { AdminService } from '../../../../core/services/admin/admin.service';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Admin } from '../../../../core/models/admin.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';
import { ConfirmationDialogComponent } from '../../common/dialogs/confirmation-dialog/confirmation-dialog.component';
import { showError } from '../../../../core/handlers/error.handler.';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-admin-settings',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatIcon,
        MatProgressSpinner,
    ],
    templateUrl: './admin-settings.component.html',
    styleUrl: './admin-settings.component.scss',
})
export class AdminSettingsComponent implements OnInit {
    user!: User | null;
    admins!: Admin[] | undefined;
    adminForm!: FormGroup;
    errorMessage: string = '';
    isLoading = true;

    constructor(
        private authService: AuthService,
        private adminService: AdminService,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.setupFormListeners();
        this.loadUserDetails();
        this.loadAdmins();
    }

    loadUserDetails(): void {
        this.user = this.authService.getUser();
    }

    loadAdmins(): void {
        this.adminService
            .getAdmins()
            .subscribe({
                next: (admins) => {
                    this.admins = admins.filter(
                        (admin) => admin.email !== this.user?.email
                    );
                },
                error: (response: HttpErrorResponse) => {
                    showError(this.snackBar, response);
                },
            })
            .add(() => (this.isLoading = false));
    }
    initForm(): void {
        this.adminForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }
    setupFormListeners(): void {
        this.adminForm.get('email')?.valueChanges.subscribe(() => {
            this.errorMessage = '';
        });
    }

    registerAdmin(): void {
        if (this.adminForm.valid) {
            const email = this.adminForm.get('email')?.value;

            this.adminService.registerAdmin(email).subscribe({
                next: (admin: Admin) => {
                    this.errorMessage = '';
                    this.admins?.push(admin);
                    this.adminForm.reset();
                },
                error: (response: HttpErrorResponse) => {
                    console.error('Registration failed', response);
                    this.errorMessage = response.error.message;
                },
            });
        }
    }

    deleteAdmin(adminId: string): void {
        this.adminService.deleteAdminById(adminId).subscribe({
            next: () => {
                this.admins = this.admins?.filter(
                    (admin) => admin.id !== adminId
                );
            },
            error: (response) => {
                showError(this.snackBar, response);
            },
        });
    }

    openDeleteDialog(adminId: string): void {
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
                question: 'Are you sure you want to delete this admin?',
                onConfirm: () => this.deleteAdmin(adminId),
            },
        });
    }
}
