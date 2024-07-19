import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { TeacherService } from '../../../../core/services/teacher/teacher.service';
import { LoadService } from '../../../../core/services/load/load.service';
import { Load } from '../../../../core/models/load.model';
import { Teacher } from '../../../../core/models/teacher.model';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GroupDetailDialogComponent } from '../group-detail-dialog/group-detail-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-teacher-loads',
  templateUrl: './teacher-loads.component.html',
  styleUrls: ['./teacher-loads.component.scss'],
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
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

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private teacherService: TeacherService,
    private loadService: LoadService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setTeacher();
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
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        console.log(data);
      },
      error: (err: Error) => {
        console.error('Failed to fetch loads', err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      console.log(`Sorted ${sortState.direction}ending`);
    } else {
      console.log('Sorting cleared');
    }
  }

  openGroupDetailDialog(group: any): void {
    this.dialog.open(GroupDetailDialogComponent, {
      width: '300px',
      data: group,
    });
  }
}
