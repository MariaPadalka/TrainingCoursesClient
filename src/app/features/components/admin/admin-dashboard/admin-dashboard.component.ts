import { Component } from '@angular/core';
import { AdminSubjectsTableComponent } from '../admin-subjects-table/admin-subjects-table.component';
import { AdminGroupsTableComponent } from '../admin-groups-table/admin-groups-table.component';
import { AdminLoadsTableComponent } from '../admin-loads-table/admin-loads-table.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    AdminSubjectsTableComponent,
    AdminGroupsTableComponent,
    AdminLoadsTableComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: [
    './admin-dashboard.component.scss',
    '../../main/main.component.scss',
  ],
})
export class AdminDashboardComponent {}
