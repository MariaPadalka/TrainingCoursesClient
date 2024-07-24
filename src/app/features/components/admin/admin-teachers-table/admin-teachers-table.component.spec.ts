import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeachersTableComponent } from './admin-teachers-table.component';

describe('AdminTeachersTableComponent', () => {
    let component: AdminTeachersTableComponent;
    let fixture: ComponentFixture<AdminTeachersTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminTeachersTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AdminTeachersTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
