import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddStakholderbookComponent } from './modal-add-stakholderbook.component';

describe('ModalAddStakholderbookComponent', () => {
  let component: ModalAddStakholderbookComponent;
  let fixture: ComponentFixture<ModalAddStakholderbookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAddStakholderbookComponent]
    });
    fixture = TestBed.createComponent(ModalAddStakholderbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
