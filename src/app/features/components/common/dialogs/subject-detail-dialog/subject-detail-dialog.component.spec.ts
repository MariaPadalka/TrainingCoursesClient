import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDetailDialogComponent } from './subject-detail-dialog.component';

describe('SubjectDetailDialogComponent', () => {
  let component: SubjectDetailDialogComponent;
  let fixture: ComponentFixture<SubjectDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
