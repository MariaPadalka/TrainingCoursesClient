import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { RoleType } from '../../../../core/types/role.type';
import { CommonModule } from '@angular/common';
import { TeacherProfileComponent } from '../../../components/teacher/teacher-profile/teacher-profile.component';
import { AdminSettingsComponent } from '../../../components/admin/admin-settings/admin-settings.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PasswordFormComponent } from '../../../components/common/password-form/password-form.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    PasswordFormComponent,
    TeacherProfileComponent,
    MatTabsModule,
    AdminSettingsComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './settings.component.html',
  styleUrls: [
    './settings.component.scss',
    '../../../components/main/main.component.scss',
  ],
})
export class SettingsComponent implements OnInit, AfterViewInit {
  userRole!: RoleType | undefined;
  isLoading = true;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUser()?.role;
    console.log(this.userRole);
  }

  ngAfterViewInit(): void {
    this.isLoading = false;
    this.cdr.detectChanges();
  }
}
