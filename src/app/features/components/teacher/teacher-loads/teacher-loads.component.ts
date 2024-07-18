import { Component, OnInit } from '@angular/core';
import { LoadService } from '../../../../core/services/load/load.service';
import { Load } from '../../../../core/models/load.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { TeacherService } from '../../../../core/services/teacher/teacher.service';
import { Teacher } from '../../../../core/models/teacher.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  selector: 'app-teacher-loads',
  templateUrl: './teacher-loads.component.html',
  styleUrls: ['./teacher-loads.component.scss'],
})
export class TeacherLoadsComponent implements OnInit {
  teacher!: Teacher;
  loads: Load[] = [];
  filteredLoads: Load[] = [];
  displayedColumns: string[] = ['group', 'subject', 'lessonType', 'hours'];

  groupFilter = new FormControl('');
  subjectFilter = new FormControl('');

  constructor(
    private loadService: LoadService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.setTeacher();

    this.groupFilter.valueChanges.subscribe(() => this.applyFilters());
    this.subjectFilter.valueChanges.subscribe(() => this.applyFilters());
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
        this.loads = data;
        this.filteredLoads = data;
      },
      error: (err: Error) => {
        console.error('Failed to fetch loads', err);
      },
    });
  }

  applyFilters(): void {
    const groupFilterValue = this.groupFilter.value?.toLowerCase() || '';
    const subjectFilterValue = this.subjectFilter.value?.toLowerCase() || '';

    this.filteredLoads = this.loads.filter(
      (load) =>
        load.group.specialty.toLowerCase().includes(groupFilterValue) &&
        load.subject.subjectName.toLowerCase().includes(subjectFilterValue)
    );
  }
}
