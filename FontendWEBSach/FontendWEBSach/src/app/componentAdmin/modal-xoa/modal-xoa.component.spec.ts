import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalXoaComponent } from './modal-xoa.component';

describe('ModalXoaComponent', () => {
  let component: ModalXoaComponent;
  let fixture: ComponentFixture<ModalXoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalXoaComponent]
    });
    fixture = TestBed.createComponent(ModalXoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
