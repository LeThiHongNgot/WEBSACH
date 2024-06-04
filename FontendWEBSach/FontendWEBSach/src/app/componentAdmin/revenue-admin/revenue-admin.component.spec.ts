import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueAdminComponent } from './revenue-admin.component';

describe('RevenueAdminComponent', () => {
  let component: RevenueAdminComponent;
  let fixture: ComponentFixture<RevenueAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevenueAdminComponent]
    });
    fixture = TestBed.createComponent(RevenueAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
