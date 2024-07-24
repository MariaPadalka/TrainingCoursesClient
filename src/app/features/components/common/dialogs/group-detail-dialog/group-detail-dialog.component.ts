import { Component, Inject } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { Group } from '../../../../../core/models/group.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-group-detail-dialog',
    templateUrl: './group-detail-dialog.component.html',
    styleUrls: ['./group-detail-dialog.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatDialogModule],
})
export class GroupDetailDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<GroupDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Group
    ) {}

    onClose(): void {
        this.dialogRef.close();
    }
}
