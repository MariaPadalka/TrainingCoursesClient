import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
    MatFormField,
    MatFormFieldModule,
    MatLabel,
} from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Group } from '../../../../core/models/group.model';
import { Load } from '../../../../core/models/load.model';
import { Teacher } from '../../../../core/models/teacher.model';
import { LoadService } from '../../../../core/services/load/load.service';
import { TeacherService } from '../../../../core/services/teacher/teacher.service';
import { GroupDetailDialogComponent } from '../../common/dialogs/group-detail-dialog/group-detail-dialog.component';
import { TeacherDetailDialogComponent } from '../../common/dialogs/teacher-detail-dialog/teacher-detail-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { showError } from '../../../../core/handlers/error.handler.';
import { SubjectDetailDialogComponent } from '../../common/dialogs/subject-detail-dialog/subject-detail-dialog.component';
import { Subject } from '../../../../core/models/subject.model';
import { MatInputModule } from '@angular/material/input';
import { LoadDialogComponent } from '../../common/dialogs/load-dialog/load-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadPopulated } from '../../../../core/models/populated/load-populated';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from '../../common/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-admin-loads-table',
    standalone: true,
    imports: [
        MatProgressSpinner,
        CommonModule,
        MatLabel,
        MatTabsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatFormField,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './admin-loads-table.component.html',
    styleUrls: [
        './admin-loads-table.component.scss',
        '../../../../../styles/table.scss',
        '../admin-table.style.scss',
    ],
})
export class AdminLoadsTableComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'teacherName',
        'subjectName',
        'groupName',
        'lessonType',
        'hours',
        'paymentPerHour',
        'totalPayment',
        'actions',
    ];
    dataSource = new MatTableDataSource<LoadPopulated>([]);
    isLoading = true;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private teacherService: TeacherService,
        private loadService: LoadService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.setLoads();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    setLoads(): void {
        this.loadService
            .getLoads()
            .subscribe({
                next: (data: LoadPopulated[]) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data.forEach((load: any) => {
                        load.paymentPerHour =
                            load.subject.hourlyRate[load.lessonType];
                        load.totalPayment = load.hours * load.paymentPerHour;
                        load.teacherName = `${load.teacher.lastName} ${load.teacher.firstName} ${load.teacher.patronymic}`;
                        load.groupName = load.group.specialty;
                        load.subjectName = load.subject.subjectName;
                    });
                    this.dataSource.data = data;
                },
                error: (response: HttpErrorResponse) => {
                    showError(this.snackBar, response);
                    console.error('Failed to fetch loads', response);
                },
            })
            .add(() => (this.isLoading = false));
    }
    openTeacherDetailDialog(teacherId: string): void {
        this.teacherService.getTeacherById(teacherId).subscribe({
            next: (teacher: Teacher) => {
                this.dialog.open(TeacherDetailDialogComponent, {
                    width: '300px',
                    data: teacher,
                });
            },
            error: (response: HttpErrorResponse) => {
                showError(this.snackBar, response);
                console.error(response);
            },
        });
    }

    openGroupDetailDialog(group: Group): void {
        this.dialog.open(GroupDetailDialogComponent, {
            width: '300px',
            data: group,
        });
    }

    openSubjectDetailDialog(subject: Subject): void {
        this.dialog.open(SubjectDetailDialogComponent, {
            width: '400px',
            data: subject,
        });
    }

    openLoadDialog(load?: Load): void {
        const dialogRef = this.dialog.open(LoadDialogComponent, {
            data: {
                load,
                onSubmit: (updatedLoad: Load) => {
                    if (load) {
                        this.updateLoad(updatedLoad);
                    } else {
                        this.createLoad(updatedLoad);
                    }
                },
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.setLoads();
            }
        });
    }

    createLoad(load: Load): void {
        this.loadService.createLoad(load).subscribe({
            next: () => {
                this.setLoads();
                this.snackBar.open('Load created successfully', 'Close', {
                    duration: 3000,
                });
            },
            error: (response) => {
                showError(this.snackBar, response);
            },
        });
    }

    updateLoad(load: Load): void {
        this.loadService.updateLoad(load._id, load).subscribe({
            next: () => {
                this.setLoads();
                this.snackBar.open('Load updated successfully', 'Close', {
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
                question: 'Are you sure you want to delete this load?',
                onConfirm: () => this.deleteLoad(id),
            },
        });
    }

    deleteLoad(id: string): void {
        this.loadService.deleteLoad(id).subscribe({
            next: () => {
                this.setLoads(); // Refresh the list after deletion
                this.snackBar.open('Load deleted successfully', 'Close', {
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

        // Ensure the filter is applied when sorting or pagination is involved
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
