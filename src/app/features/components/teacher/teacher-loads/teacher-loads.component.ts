import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { TeacherService } from '../../../../core/services/teacher/teacher.service';
import { LoadService } from '../../../../core/services/load/load.service';
import { Load } from '../../../../core/models/load.model';
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
  ],
})
export class TeacherLoadsComponent implements OnInit {
  displayedColumns: string[] = [
    'subject',
    'group',
    'lessonType',
    'hours',
    'paymentPerHour',
    'totalPayment',
  ];
  dataSource = new MatTableDataSource<Load>([]);
  teacher!: Teacher;
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private teacherService: TeacherService,
    private loadService: LoadService,
    public dialog: MatDialog
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
      error: (error) => {
        console.error('Failed to retrieve current teacher:', error);
      },
    });
  }

  setTeacherLoads(): void {
    this.loadService.getTeachersLoads().subscribe({
      next: (data: Load[]) => {
        data.forEach((load: any) => {
          load.paymentPerHour = load.subject.hourlyRate[load.lessonType];
          load.totalPayment = load.hours * load.paymentPerHour;
        });
        this.dataSource.data = data;
        console.log(this.dataSource.data);
        this.isLoading = false;
      },
      error: (err: Error) => {
        console.error('Failed to fetch loads', err);
      },
    });
  }

  openGroupDetailDialog(group: Group): void {
    this.dialog.open(GroupDetailDialogComponent, {
      width: '300px',
      data: group,
    });
  }
}
