import { Component } from '@angular/core';
import { AdminSubjectsTableComponent } from '../../../components/admin/admin-subjects-table/admin-subjects-table.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
    selector: 'app-admin-subjects',
    standalone: true,
    imports: [AdminSubjectsTableComponent],
    templateUrl: './admin-subjects.component.html',
    styleUrl: './admin-subjects.component.scss',
})
export class AdminSubjectsComponent {
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
