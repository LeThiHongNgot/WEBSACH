import { Component } from '@angular/core';
import { OrderWithDetails } from 'src/interfaces/Orders';
import { OrdersService } from 'src/services/Orders/orders.service';
import { SharedataService } from 'src/services/sharedata/sharedata.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-revenue-admin',
  templateUrl: './revenue-admin.component.html',
  styleUrls: ['./revenue-admin.component.css']
})
export class RevenueAdminComponent {
  totalRevenue: number = 0;
  orderData:OrderWithDetails[]=[];
  Doanhthu:number=0;
  quantity:number=0;
  totalproduct:number=0;
  constructor(private router:Router,private sharedata:SharedataService,private Order:OrdersService)
  {
   this.Order.getOrders(1).subscribe({
     next: res => {
       this.orderData=res
       this.calculateTotalRevenue()
       this. calculateTotal()
     },
     error: err => {
       console.log("Lỗi lấy dữ liệu: ", err)
     }
   });
  }
  productDetails: ProductDetail[] = [];
  calculateTotal() {
    let uniqueProducts = new Set<string>();

    // Clear existing product details
    this.productDetails = [];

    this.orderData.forEach((order) => {
      const key = order.bookName;

      // If the product is not in the set, add it to the set and create a new ProductDetail
      if (!uniqueProducts.has(key)) {
        uniqueProducts.add(key);

        const productDetail: ProductDetail = {
          name: order.bookName,
          unitPrice: order.unitPrice,
          quantitySold: order.quantity,
          totalRevenue: order.unitPrice * order.quantity,
        };

        this.productDetails.push(productDetail);
      } else {
        // If the product is already in the set, update the quantitySold and totalRevenue
        const existingProductDetail = this.productDetails.find((p) => p.name === key);

        if (existingProductDetail) {
          existingProductDetail.quantitySold += order.quantity;
          existingProductDetail.totalRevenue += order.unitPrice * order.quantity;
        }
      }
    });
  }
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('table'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save the workbook
    XLSX.writeFile(wb, 'ThongKeSachDaBan.xlsx');
  }
  calculateTotalRevenue() {
    let totalRevenue = 0;
    let totalQuantity = 0;
    let uniqueProducts = new Set<string>();

    this.orderData.forEach((order) => {
      totalRevenue += order.unitPrice * order.quantity;
      totalQuantity += order.quantity;
      uniqueProducts.add(order.bookName);
    });
    this.Doanhthu=totalRevenue
    this.quantity=totalQuantity
    // this.sharedata.updateTotalRevenue(this.Doanhthu);
    this.totalproduct = uniqueProducts.size;
  }

}
interface ProductDetail {
  name: string;
  unitPrice: number;
  quantitySold: number;
  totalRevenue: number;
}


