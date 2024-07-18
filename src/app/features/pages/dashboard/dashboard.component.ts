import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { HomeComponent } from '../../../shared/home/home.component';
import { AdminDashboardComponent } from '../../components/admin/admin-dashboard/admin-dashboard.component';
import { TeacherDashboardComponent } from '../../components/teacher/teacher-dashboard/teacher-dashboard.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    HomeComponent,
    AdminDashboardComponent,
    TeacherDashboardComponent,
  ],
})
export class DashboardComponent implements OnInit {
  userRole!: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
  }
}
