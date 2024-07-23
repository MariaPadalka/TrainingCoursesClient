import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from '../../../../core/models/subject.model';
import { SubjectService } from '../../../../core/services/subject/subject.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from '../../common/dialogs/confirmation-dialog/confirmation-dialog.component';
import { SubjectDialogComponent } from '../../common/dialogs/subject-dialog/subject-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { showError } from '../../../../core/handlers/error.handler.';

@Component({
    selector: 'app-admin-subjects-table',
    standalone: true,
    imports: [
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatPaginator,
        MatProgressSpinnerModule,
    ],
    templateUrl: './admin-subjects-table.component.html',
    styleUrls: [
        './admin-subjects-table.component.scss',
        '../../../../../styles/table.scss',
        '../admin-table.style.scss',
    ],
})
export class AdminSubjectsTableComponent implements OnInit {
    subjects: Subject[] = [];
    displayedColumns: string[] = [
        'subjectName',
        'hourlyRatePractice',
        'hourlyRateLecture',
        'actions',
    ];
    dataSource = new MatTableDataSource<Subject>([]);
    isLoading = true;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private subjectService: SubjectService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.loadSubjects();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    loadSubjects(): void {
        this.subjectService
            .getAllSubjects()
            .subscribe({
                next: (subjects) => {
                    const data = subjects.map((subject) => ({
                        ...subject,
                        hourlyRatePractice: subject.hourlyRate.practice,
                        hourlyRateLecture: subject.hourlyRate.lecture,
                    }));
                    this.dataSource.data = data; // Update the data source
                },
                error: (response: HttpErrorResponse) => {
                    showError(this.snackBar, response);
                },
            })
            .add(() => (this.isLoading = false));
    }

    openSubjectDialog(subject?: Subject): void {
        const dialogRef = this.dialog.open(SubjectDialogComponent, {
            data: {
                subject,
                subjects: this.subjects,
                onSubmit: (updatedSubject: Subject) => {
                    if (subject) {
                        this.updateSubject(updatedSubject);
                    } else {
                        this.createSubject(updatedSubject);
                    }
                },
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.loadSubjects();
            }
        });
    }

    createSubject(subject: Subject): void {
        this.subjectService.createSubject(subject).subscribe({
            next: () => {
                this.loadSubjects();
                this.snackBar.open('Subject created successfully', 'Close', {
                    duration: 3000,
                });
            },
            error: (response) => {
                showError(this.snackBar, response);
            },
        });
    }

    updateSubject(subject: Subject): void {
        this.subjectService.updateSubject(subject._id, subject).subscribe({
            next: () => {
                this.loadSubjects();
                this.snackBar.open('Subject updated successfully', 'Close', {
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
                    'Are you sure you want to delete this subject?\n Loads for this subject is going to be deleted too!',
                onConfirm: () => this.deleteSubject(id),
            },
        });
    }

    deleteSubject(id: string): void {
        this.subjectService.deleteSubject(id).subscribe({
            next: () => {
                this.subjects = this.subjects.filter(
                    (subject) => subject._id !== id
                );
                this.loadSubjects(); // Refresh the list after deletion
                this.snackBar.open('Subject deleted successfully', 'Close', {
                    duration: 3000,
                });
            },
            error: (response) => {
                showError(this.snackBar, response);
            },
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
}
