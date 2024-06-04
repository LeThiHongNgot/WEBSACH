import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAdminComponent } from './staff-admin.component';

describe('StaffAdminComponent', () => {
  let component: StaffAdminComponent;
  let fixture: ComponentFixture<StaffAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffAdminComponent]
    });
    fixture = TestBed.createComponent(StaffAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
