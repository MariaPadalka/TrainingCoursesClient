import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../../core/services/teacher/teacher.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { User } from '../../../../core/models/user.model';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Subject } from '../../../../core/models/subject.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SubjectDetailDialogComponent } from '../../common/dialogs/subject-detail-dialog/subject-detail-dialog.component';
import { PasswordFormComponent } from '../../common/password-form/password-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TeacherPopulated } from '../../../../core/models/populated/teacher-populated';
import { showError } from '../../../../core/handlers/error.handler.';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        PasswordFormComponent,
        MatTabsModule,
        MatProgressSpinnerModule,
    ],
    selector: 'app-teacher-profile',
    templateUrl: './teacher-profile.component.html',
    styleUrls: ['./teacher-profile.component.scss'],
})
export class TeacherProfileComponent implements OnInit {
    teacher!: TeacherPopulated | null;
    user!: User | null;

    constructor(
        private authService: AuthService,
        private teacherService: TeacherService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.loadUserDetails();
        this.loadTeacherDetails();
    }

    loadTeacherDetails(): void {
        this.teacherService.getCurrentTeacher().subscribe({
            next: (teacher) => {
                this.teacher = teacher;
            },
            error: (response) => {
                console.error('Failed to load teacher details', response);
                showError(this.snackBar, response);
            },
        });
    }
    loadUserDetails(): void {
        this.user = this.authService.getUser();
    }

    openSubjectDetailDialog(subject: Subject): void {
        this.dialog.open(SubjectDetailDialogComponent, {
            width: '400px',
            data: subject,
        });
    }
}
