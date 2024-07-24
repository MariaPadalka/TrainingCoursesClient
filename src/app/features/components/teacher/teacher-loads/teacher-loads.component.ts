import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TeacherService } from '../../../../core/services/teacher/teacher.service';
import { LoadService } from '../../../../core/services/load/load.service';
import { Teacher } from '../../../../core/models/teacher.model';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { GroupDetailDialogComponent } from '../../common/dialogs/group-detail-dialog/group-detail-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Group } from '../../../../core/models/group.model';
import { SubjectDetailDialogComponent } from '../../common/dialogs/subject-detail-dialog/subject-detail-dialog.component';
import { Subject } from '../../../../core/models/subject.model';
import { showError } from '../../../../core/handlers/error.handler.';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { LoadPopulated } from '../../../../core/models/populated/load-populated';
import { MatIconModule } from '@angular/material/icon';

@Component({
    standalone: true,
    selector: 'app-teacher-loads',
    templateUrl: './teacher-loads.component.html',
    styleUrls: [
        './teacher-loads.component.scss',
        '../../../../../styles/table.scss',
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatIconModule,
    ],
})
export class TeacherLoadsComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'subjectName',
        'groupName',
        'lessonType',
        'hours',
        'paymentPerHour',
        'totalPayment',
    ];
    dataSource = new MatTableDataSource<LoadPopulated>([]);
    teacher!: Teacher;
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
        this.setTeacher();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    setTeacher(): void {
        this.teacherService.getCurrentTeacher().subscribe({
            next: (teacher) => {
                if (teacher) {
                    this.teacher = teacher;
                    this.setTeacherLoads();
                }
            },
            error: (response: HttpErrorResponse) => {
                showError(this.snackBar, response);
                console.error('Failed to retrieve current teacher:', response);
            },
        });
    }

    setTeacherLoads(): void {
        this.loadService
            .getTeachersLoads()
            .subscribe({
                next: (data: LoadPopulated[]) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data.forEach((load: any) => {
                        load.paymentPerHour =
                            load.subject.hourlyRate[load.lessonType];
                        load.totalPayment = load.hours * load.paymentPerHour;
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
