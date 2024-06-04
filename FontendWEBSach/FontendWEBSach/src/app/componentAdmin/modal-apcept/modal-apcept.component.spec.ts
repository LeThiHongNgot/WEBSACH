import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalApceptComponent } from './modal-apcept.component';

describe('ModalApceptComponent', () => {
  let component: ModalApceptComponent;
  let fixture: ComponentFixture<ModalApceptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalApceptComponent]
    });
    fixture = TestBed.createComponent(ModalApceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
