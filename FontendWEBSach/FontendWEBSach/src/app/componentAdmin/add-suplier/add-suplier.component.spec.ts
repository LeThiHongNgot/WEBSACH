import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuplierComponent } from './add-suplier.component';

describe('AddSuplierComponent', () => {
  let component: AddSuplierComponent;
  let fixture: ComponentFixture<AddSuplierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSuplierComponent]
    });
    fixture = TestBed.createComponent(AddSuplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
