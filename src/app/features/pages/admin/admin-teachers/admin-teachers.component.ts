import { Component } from '@angular/core';
import { AdminTeachersTableComponent } from '../../../components/admin/admin-teachers-table/admin-teachers-table.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
    selector: 'app-admin-teachers',
    standalone: true,
    imports: [AdminTeachersTableComponent],
    templateUrl: './admin-teachers.component.html',
    styleUrl: './admin-teachers.component.scss',
})
export class AdminTeachersComponent {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}
    ngOnInit(): void {
        if (!this.authService.accessAllowed('admin')) {
            this.router.navigate(['/login']);
        }
    }
}
