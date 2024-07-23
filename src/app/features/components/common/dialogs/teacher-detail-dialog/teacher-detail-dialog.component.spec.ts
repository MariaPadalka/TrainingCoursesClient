import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDetailDialogComponent } from './teacher-detail-dialog.component';

describe('TeacherDetailDialogComponent', () => {
    let component: TeacherDetailDialogComponent;
    let fixture: ComponentFixture<TeacherDetailDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TeacherDetailDialogComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TeacherDetailDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
