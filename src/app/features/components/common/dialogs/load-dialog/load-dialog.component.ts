import { Component, Inject, OnInit } from '@angular/core';
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialogModule,
} from '@angular/material/dialog';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { SubjectService } from '../../../../../core/services/subject/subject.service';
import { TeacherService } from '../../../../../core/services/teacher/teacher.service';
import { GroupService } from '../../../../../core/services/group/group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Load } from '../../../../../core/models/load.model';
import { Subject } from '../../../../../core/models/subject.model';
import { Teacher } from '../../../../../core/models/teacher.model';
import { Group } from '../../../../../core/models/group.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TeacherPopulated } from '../../../../../core/models/populated/teacher-populated';
import { LoadPopulated } from '../../../../../core/models/populated/load-populated';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-load-dialog',
    templateUrl: './load-dialog.component.html',
    styleUrls: ['./load-dialog.component.css'],

    standalone: true,
    imports: [
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        CommonModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule,
    ],
})
export class LoadDialogComponent implements OnInit {
    loadForm: FormGroup;
    subjects: Subject[] = [];
    teachers: TeacherPopulated[] = [];
    groups: Group[] = [];

    constructor(
        private fb: FormBuilder,
        private subjectService: SubjectService,
        private teacherService: TeacherService,
        private groupService: GroupService,
        public dialogRef: MatDialogRef<LoadDialogComponent>,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            load?: LoadPopulated;
            onSubmit: (load: Partial<Load>) => void;
        }
    ) {
        this.loadForm = this.fb.group({
            teacher: [data.load?.teacher._id || '', Validators.required],
            group: [data.load?.group._id || '', Validators.required],
            subject: [data.load?.subject._id || '', Validators.required],
            lessonType: [data.load?.lessonType || '', Validators.required],
            hours: [
                data.load?.hours || '',
                [Validators.required, Validators.min(1)],
            ],
        });
    }

    ngOnInit(): void {
        this.loadSubjects();
        this.loadTeachers();
        this.loadGroups();
    }

    loadSubjects(): void {
        this.subjectService.getAllSubjects().subscribe({
            next: (data: Subject[]) => {
                this.subjects = data;
            },
            error: (response: HttpErrorResponse) => {
                console.error('Failed to fetch subjects', response);
                this.snackBar.open('Failed to load subjects', 'Close', {
                    duration: 3000,
                });
            },
        });
    }

    loadTeachers(): void {
        this.teacherService.getTeachers().subscribe({
            next: (data: TeacherPopulated[]) => {
                this.teachers = data;
            },
            error: (response: HttpErrorResponse) => {
                console.error('Failed to fetch teachers', response);
                this.snackBar.open('Failed to load teachers', 'Close', {
                    duration: 3000,
                });
            },
        });
    }

    loadGroups(): void {
        this.groupService.getAllGroups().subscribe({
            next: (data: Group[]) => {
                this.groups = data;
            },
            error: (response: HttpErrorResponse) => {
                console.error('Failed to fetch groups', response);
                this.snackBar.open('Failed to load groups', 'Close', {
                    duration: 3000,
                });
            },
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSaveClick(): void {
        if (this.loadForm.valid) {
            const loadData: Partial<Load> = this.loadForm.value;
            this.data.onSubmit({ ...loadData, _id: this.data.load?._id });
            this.dialogRef.close();
        }
    }
}
