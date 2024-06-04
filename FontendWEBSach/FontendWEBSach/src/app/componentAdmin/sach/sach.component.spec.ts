import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SachComponent } from './sach.component';

describe('SachComponent', () => {
  let component: SachComponent;
  let fixture: ComponentFixture<SachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SachComponent]
    });
    fixture = TestBed.createComponent(SachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
