import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.css']
})
export class ProductslistComponent {
  @Input() products: any[] = [];
  @Input() loadedBooksCount: number = 0;
  @Input() pageSize: number = 10;
  @Input() page: number = 1;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  constructor(
    private router: Router
  ) { }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.pageChange.emit(this.page);
  }

  navigateToProduct(productId: string, productName: string) {
    const sanitizedProductName = productName.replace(/\s+/g, '-');
    const combined = `${sanitizedProductName}-${productId}`;
    this.router.navigate(['product', combined]);
  }
  percent1(price: number, per: number): number { return price * (1 - per); }

  percent2(per: number) { return '-' + per * 100 + '%'; }

}
