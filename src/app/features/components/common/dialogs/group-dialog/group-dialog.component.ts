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
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

export class Group {
  _id: string;
  specialty: string;
  department: string;
  studentCount: number;

  constructor(
    _id: string,
    specialty: string,
    department: string,
    studentCount: number
  ) {
    this._id = _id;
    this.specialty = specialty;
    this.department = department;
    this.studentCount = studentCount;
  }
}

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss'],
  standalone: true,
  imports: [
    MatInputModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDialogTitle,
    MatSnackBarModule,
  ],
})
export class GroupDialogComponent {
  groupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      group?: Group;
      groups: Group[];
      onSubmit: (group: Partial<Group>) => void;
    },
    private snackBar: MatSnackBar
  ) {
    this.groupForm = this.fb.group({
      specialty: [data.group?.specialty || '', Validators.required],
      department: [data.group?.department || '', Validators.required],
      studentCount: [
        data.group?.studentCount || 0,
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.groupForm.valid) {
      const group: Partial<Group> = {
        ...this.data.group,
        specialty: this.groupForm.value.specialty,
        department: this.groupForm.value.department,
        studentCount: this.groupForm.value.studentCount,
      };
      if (this.groupNotDuplicate(group)) {
        this.data.onSubmit(group);
        this.dialogRef.close(group);
      }
    }
  }

  groupNotDuplicate(group: Partial<Group>): boolean {
    const groupSpecialty = group.specialty || '';
    const groupDepartment = group.department || '';
    const isDuplicate = this.data.groups.some(
      (g) =>
        g._id !== group._id &&
        g.specialty === groupSpecialty &&
        g.department === groupDepartment
    );
    if (isDuplicate) {
      this.snackBar.open(
        'Group with this specialty and department already exists',
        'Close',
        {
          duration: 3000,
        }
      );
      return false;
    }
    return true;
  }
}
