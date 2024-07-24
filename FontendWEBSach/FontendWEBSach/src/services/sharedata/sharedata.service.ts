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
  private idSource = new BehaviorSubject<string>('');
  idbill$ = this.idSource.asObservable();

  setOrder(id:string)
  {
    this.idSource.next(id);;
  }

  private totalRevenueSource = new Subject<number>();
  totalRevenue$ = this.totalRevenueSource.asObservable();

  updateTotalRevenue(totalRevenue: number) {
    this.totalRevenueSource.next(totalRevenue);
  }
}
