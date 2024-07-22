import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject } from '../../../../../core/models/subject.model';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subject-dialog',
  templateUrl: './subject-dialog.component.html',
  styleUrls: ['./subject-dialog.component.scss'],
  standalone: true,
  imports: [
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDialogTitle,
  ],
})
export class SubjectDialogComponent {
  subjectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SubjectDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      subject?: Subject;
      subjects: Subject[];
      onSubmit: (subject: Partial<Subject>) => void;
    }
  ) {
    this.subjectForm = this.fb.group({
      subjectName: [data.subject?.subjectName || '', Validators.required],
      hourlyRatePractice: [
        data.subject?.hourlyRate.practice || 0,
        [Validators.required, Validators.min(0)],
      ],
      hourlyRateLecture: [
        data.subject?.hourlyRate.lecture || 0,
        [Validators.required, Validators.min(0)],
      ],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  subjectNotDupricate(subject: Partial<Subject>): boolean {
    const subjectNames = this.data.subjects
      .filter((s) => s._id !== subject._id)
      .map((s) => s.subjectName);
    const subjectName = subject.subjectName || '';
    if (subjectNames.includes(subjectName)) {
      this.snackBar.open('Subject with this name already exist', 'Close', {
        duration: 3000,
      });
      return false;
    }
    return true;
  }

  onSaveClick(): void {
    if (this.subjectForm.valid) {
      const subject: Partial<Subject> = {
        ...this.data.subject,
        subjectName: this.subjectForm.value.subjectName,
        hourlyRate: {
          practice: this.subjectForm.value.hourlyRatePractice,
          lecture: this.subjectForm.value.hourlyRateLecture,
        },
      };
      if (this.subjectNotDupricate(subject)) {
        this.data.onSubmit(subject);
        this.dialogRef.close(subject);
      }
    }
  }
}
