import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNotCompleteComponent } from './order-not-complete.component';

describe('OrderNotCompleteComponent', () => {
  let component: OrderNotCompleteComponent;
  let fixture: ComponentFixture<OrderNotCompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderNotCompleteComponent]
    });
    fixture = TestBed.createComponent(OrderNotCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
