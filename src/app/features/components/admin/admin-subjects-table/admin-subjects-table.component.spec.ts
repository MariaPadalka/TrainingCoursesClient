import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubjectsTableComponent } from './admin-subjects-table.component';

describe('AdminSubjectsTableComponent', () => {
    let component: AdminSubjectsTableComponent;
    let fixture: ComponentFixture<AdminSubjectsTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminSubjectsTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AdminSubjectsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
