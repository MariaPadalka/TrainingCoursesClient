import { Component } from '@angular/core';
import { TeacherLoadsComponent } from '../../../components/teacher/teacher-loads/teacher-loads.component';

@Component({
    selector: 'app-teacher-dashboard',
    standalone: true,
    imports: [TeacherLoadsComponent],
    templateUrl: './teacher-dashboard.component.html',
    styleUrls: [
        './teacher-dashboard.component.scss',
        '../../../../../styles/table.scss',
    ],
})
export class TeacherDashboardComponent {}
