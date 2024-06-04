import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddVoucherComponent } from './modal-add-voucher.component';

describe('ModalAddVoucherComponent', () => {
  let component: ModalAddVoucherComponent;
  let fixture: ComponentFixture<ModalAddVoucherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAddVoucherComponent]
    });
    fixture = TestBed.createComponent(ModalAddVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
