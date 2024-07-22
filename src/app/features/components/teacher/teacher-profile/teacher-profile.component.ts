import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../../../core/models/teacher.model';
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
  teacher!: Teacher | null;
  user!: User | null;

  constructor(
    private authService: AuthService,
    private teacherService: TeacherService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUserDetails();
    this.loadTeacherDetails();
  }

  loadTeacherDetails(): void {
    this.teacherService.getCurrentTeacher().subscribe({
      next: (teacher) => {
        this.teacher = teacher;
        console.log(this.teacher);
      },
      error: (error) => console.error('Failed to load teacher details', error),
    });
  }
  loadUserDetails(): void {
    this.user = this.authService.getUser();
    console.log(this.user);
  }

  openSubjectDetailDialog(subject: Subject): void {
    this.dialog.open(SubjectDetailDialogComponent, {
      width: '400px',
      data: subject,
    });
  }
}
