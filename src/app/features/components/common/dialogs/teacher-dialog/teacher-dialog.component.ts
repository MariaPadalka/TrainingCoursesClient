import { Component, Inject, OnInit } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Teacher } from '../../../../../core/models/teacher.model';
import { SubjectService } from '../../../../../core/services/subject/subject.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../../../core/models/user.model';
import { TeacherPopulated } from '../../../../../core/models/populated/teacher-populated';

@Component({
    selector: 'app-teacher-dialog',
    standalone: true,
    imports: [
        MatInputModule,
        CommonModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        MatDialogModule,
        MatDialogTitle,
        MatOptionModule,
        ReactiveFormsModule,
        MatSelectModule,
    ],
    templateUrl: './teacher-dialog.component.html',
    styleUrls: ['./teacher-dialog.component.css'],
})
export class TeacherDialogComponent implements OnInit {
    subjectForm: FormGroup;
    subjects: Subject[] = [];

    constructor(
        private fb: FormBuilder,
        private subjectService: SubjectService,
        public dialogRef: MatDialogRef<TeacherDialogComponent>,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            teacher?: TeacherPopulated;
            onSubmit: (teacher: Partial<Teacher>) => void;
        }
    ) {
        this.subjectForm = this.fb.group({
            firstName: [data.teacher?.firstName || '', Validators.required],
            lastName: [data.teacher?.lastName || '', Validators.required],
            patronymic: [data.teacher?.patronymic || '', Validators.required],
            email: [
                data.teacher?.user.email || '',
                [Validators.required, Validators.email],
            ],
            phone: [data.teacher?.phone || '', [Validators.required]],
            experience: [
                data.teacher?.experience || 0,
                [Validators.required, Validators.min(0)],
            ],
            subjects: [
                data.teacher?.subjects.map((subject) => subject._id) || [],
            ],
        });
    }

    ngOnInit(): void {
        this.loadSubjects();
    }

    loadSubjects(): void {
        this.subjectService.getAllSubjects().subscribe({
            next: (data: Subject[]) => {
                this.subjects = data;
            },
            error: (err: Error) => {
                console.error('Failed to fetch subjects', err);
                this.snackBar.open('Failed to load subjects', 'Close', {
                    duration: 3000,
                });
            },
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSaveClick(): void {
        if (this.subjectForm.valid) {
            const teacherData: Partial<Teacher> = this.subjectForm.value;
            this.data.onSubmit({ ...teacherData, _id: this.data.teacher?._id });
            this.dialogRef.close();
        }
    }
}
