import { Component } from '@angular/core';
import { TeacherLoadsComponent } from '../teacher-loads/teacher-loads.component';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [TeacherLoadsComponent],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css',
})
export class TeacherDashboardComponent {}
