import { Component, OnInit } from '@angular/core';
import { AdminGroupsTableComponent } from '../../../components/admin/admin-groups-table/admin-groups-table.component';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-groups',
    standalone: true,
    imports: [AdminGroupsTableComponent],
    templateUrl: './admin-groups.component.html',
    styleUrl: './admin-groups.component.scss',
})
export class AdminGroupsComponent implements OnInit {
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
