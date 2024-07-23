import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../common/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        RouterModule,
        MatIconModule,
        MatSidenavModule,
        FlexLayoutModule,
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnDestroy {
    user!: User | null;
    userSubscription!: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.userSubscription = this.authService.user$.subscribe((user) => {
            this.user = user;
        });
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    openConfirmationDialog(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                question: 'Are you sure you want to logout?',
                onConfirm: () => this.logout(),
            },
        });

        dialogRef.afterClosed().subscribe((_) => {
            this.router.navigate(['/login']);
        });
    }

    logout(): void {
        this.authService.logout();
    }
}
