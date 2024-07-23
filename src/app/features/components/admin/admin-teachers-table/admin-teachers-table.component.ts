import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TeacherService } from '../../../../core/services/teacher/teacher.service';
import { SubjectDetailDialogComponent } from '../../common/dialogs/subject-detail-dialog/subject-detail-dialog.component';
import { Subject } from '../../../../core/models/subject.model';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { showError } from '../../../../core/handlers/error.handler.';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeacherDialogComponent } from '../../common/dialogs/teacher-dialog/teacher-dialog.component';
import { ConfirmationDialogComponent } from '../../common/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { Teacher } from '../../../../core/models/teacher.model';
import { TeacherPopulated } from '../../../../core/models/populated/teacher-populated';

@Component({
    selector: 'app-admin-teachers-table',
    standalone: true,
    imports:[
      CommonModule,
       MatProgressSpinnerModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
      ],
    templateUrl: './admin-teachers-table.component.html',
    styleUrls: [
        './admin-teachers-table.component.scss',
        '../../../../../styles/table.scss',
        '../admin-table.style.scss',
    ],
})
export class AdminTeachersTableComponent implements OnInit {
    displayedColumns: string[] = [
        'name',
        'phone',
        'email',
        'experienceInYears',
        'subjects',
        'actions',
    ];
    dataSource = new MatTableDataSource<TeacherPopulated>([]);
    isLoading = true;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private teacherService: TeacherService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar // private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.loadTeachers();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    loadTeachers(): void {
        this.teacherService
            .getTeachers()
            .subscribe({
                next: (data: TeacherPopulated[]) => {
                    data.forEach((teacher: any) => {
                        teacher.name = `${teacher.lastName} ${teacher.firstName} ${teacher.patronymic}`;
                        teacher.email = teacher.user.email;
                        teacher.experienceInYears = `${teacher.experience} years`;
                    });
                    this.dataSource.data = data;
                },
                error: (response: HttpErrorResponse) => {
                    showError(this.snackBar, response);
                    console.error('Failed to fetch teachers', response);
                },
            })
            .add(() => (this.isLoading = false));
    }

    openSubjectDetailDialog(subject: Subject): void {
        this.dialog.open(SubjectDetailDialogComponent, {
            width: '400px',
            data: subject,
        });
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value
            .trim()
            .toLowerCase();
        this.dataSource.filter = filterValue;

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openTeacherDialog(teacher?: Teacher): void {
        const dialogRef = this.dialog.open(TeacherDialogComponent, {
            data: {
                teacher,
                onSubmit: (updatedTeacher: Teacher) => {
                    if (teacher) {
                        this.updateTeacher(updatedTeacher);
                    } else {
                        this.createTeacher(updatedTeacher);
                    }
                },
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.loadTeachers();
            }
        });
    }

    createTeacher(teacher: Teacher): void {
        this.teacherService.createTeacher(teacher).subscribe({
            next: () => {
                this.loadTeachers();
                this.snackBar.open('Teacher created successfully', 'Close', {
                    duration: 3000,
                });
            },
            error: (response) => {
                showError(this.snackBar, response);
            },
        });
    }

    updateTeacher(teacher: Teacher): void {
        this.teacherService.updateTeacher(teacher._id, teacher).subscribe({
            next: () => {
                this.loadTeachers();
                this.snackBar.open('Teacher updated successfully', 'Close', {
                    duration: 3000,
                });
            },
            error: (response) => {
                showError(this.snackBar, response);
            },
        });
    }

    openDeleteDialog(id: string): void {
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
                question:
                    'Are you sure you want to delete this teacher?\n Loads for this teacher is going to be deleted too!',
                onConfirm: () => this.deleteTeacher(id),
            },
        });
    }

    deleteTeacher(id: string): void {
        this.teacherService.deleteTeacher(id).subscribe({
            next: () => {
                this.loadTeachers(); // Refresh the list after deletion
                this.snackBar.open('Teacher deleted successfully', 'Close', {
                    duration: 3000,
                });
            },
            error: (response) => {
                showError(this.snackBar, response);
            },
        });
    }
}
