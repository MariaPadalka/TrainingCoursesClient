import { Component, Inject } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TeacherPopulated } from '../../../../../core/models/populated/teacher-populated';

@Component({
    selector: 'app-teacher-detail-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, CommonModule],
    templateUrl: './teacher-detail-dialog.component.html',
    styleUrl: './teacher-detail-dialog.component.scss',
})
export class TeacherDetailDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<TeacherDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public teacher: TeacherPopulated
    ) {}

    onClose(): void {
        this.dialogRef.close();
    }
}
