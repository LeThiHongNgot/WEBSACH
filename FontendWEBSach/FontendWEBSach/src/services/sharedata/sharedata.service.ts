import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedataService {
  private checkedProductIdsSource = new BehaviorSubject<string[]>([]);
  checkedProductIds$ = this.checkedProductIdsSource.asObservable();

  private productsPriceSource = new BehaviorSubject<{ [id: string]: number }>({});
  productsPrice$ = this.productsPriceSource.asObservable();

  private quantitySource = new BehaviorSubject<{ [key: string]: number }>({});
  quantity$ = this.quantitySource.asObservable();

  setCheckedProductIds(checkedProductIds: string[]) {
    this.checkedProductIdsSource.next(checkedProductIds);
  }

  setProductsPrice(productsPrice: { [id: string]: number }) {
    this.productsPriceSource.next(productsPrice);
  }

  setQuantity(quantity: { [key: string]: number }) {
    this.quantitySource.next(quantity);
  }
  private idCustomerSource = new BehaviorSubject<string>('');
  idCustomer$ = this.idCustomerSource.asObservable();

  private timeSource = new BehaviorSubject<string>('');
  time$ = this.timeSource.asObservable();

  setOrder(idCustomer:string,time:string)
  {
    this.idCustomerSource.next(idCustomer);
    this.timeSource.next(time);
  }

  private totalRevenueSource = new Subject<number>();
  totalRevenue$ = this.totalRevenueSource.asObservable();

  updateTotalRevenue(totalRevenue: number) {
    this.totalRevenueSource.next(totalRevenue);
  }
}
