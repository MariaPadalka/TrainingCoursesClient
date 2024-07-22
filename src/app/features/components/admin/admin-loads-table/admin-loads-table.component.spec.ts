import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoadsTableComponent } from './admin-loads-table.component';

describe('AdminLoadsTableComponent', () => {
  let component: AdminLoadsTableComponent;
  let fixture: ComponentFixture<AdminLoadsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLoadsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLoadsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
