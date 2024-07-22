import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Subject } from '../../../../../core/models/subject.model'; // Adjust the import path based on your structure
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-subject-detail-dialog',
  templateUrl: './subject-detail-dialog.component.html',
  styleUrls: ['./subject-detail-dialog.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class SubjectDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Subject) {}
}
