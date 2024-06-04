import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditVoucherComponent } from './modal-edit-voucher.component';

describe('ModalEditVoucherComponent', () => {
  let component: ModalEditVoucherComponent;
  let fixture: ComponentFixture<ModalEditVoucherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditVoucherComponent]
    });
    fixture = TestBed.createComponent(ModalEditVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
