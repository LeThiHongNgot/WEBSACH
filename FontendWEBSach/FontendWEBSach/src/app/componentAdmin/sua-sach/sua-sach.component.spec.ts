import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaSachComponent } from './sua-sach.component';

describe('SuaSachComponent', () => {
  let component: SuaSachComponent;
  let fixture: ComponentFixture<SuaSachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuaSachComponent]
    });
    fixture = TestBed.createComponent(SuaSachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
