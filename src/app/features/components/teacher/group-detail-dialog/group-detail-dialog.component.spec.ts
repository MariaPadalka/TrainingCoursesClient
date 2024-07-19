import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDetailDialogComponent } from './group-detail-dialog.component';

describe('GroupDetailDialogComponent', () => {
  let component: GroupDetailDialogComponent;
  let fixture: ComponentFixture<GroupDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
