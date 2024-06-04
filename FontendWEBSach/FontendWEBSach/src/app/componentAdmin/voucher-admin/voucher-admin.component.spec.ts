import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherAdminComponent } from './voucher-admin.component';

describe('VoucherAdminComponent', () => {
  let component: VoucherAdminComponent;
  let fixture: ComponentFixture<VoucherAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherAdminComponent]
    });
    fixture = TestBed.createComponent(VoucherAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
