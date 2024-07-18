import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLoadsComponent } from './teacher-loads.component';

describe('TeacherLoadsComponent', () => {
  let component: TeacherLoadsComponent;
  let fixture: ComponentFixture<TeacherLoadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherLoadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherLoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
