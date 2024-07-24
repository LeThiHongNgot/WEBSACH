import { Component } from '@angular/core';
import { BillWithCustomer } from 'src/interfaces/Orders';
import { OrdersService } from 'src/services/Orders/orders.service';
import { SharedataService } from 'src/services/sharedata/sharedata.service';
import { Router } from '@angular/router';
import { BillsService } from 'src/services/Bills/bills.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css'],
  providers: [DatePipe]
})
export class OrderAdminComponent {
  orderData:BillWithCustomer[]=[]
  id:string=''
 constructor(private Order:OrdersService,
  private router:Router,
  private bill:BillsService)
 {
  this.getbill()
 }
 getbill()
 {
  this.bill.getbill().subscribe({
    next: res => {
      this.orderData=res
      console.log(res)
    },
    error: err => {
      console.log("Lỗi lấy dữ liệu: ", err)
    }
  });
 }
 isModalApceptVisible = false;
 status?:string;
 statusPayment?:string;

 handlestatusChange(event: any,id:string) {
   const selectedValue = event.target.value;
   this.id=id
   this.status=selectedValue
   if (selectedValue) {
       this.openModalApcept();
   } else {
       this.isModalApceptVisible = false;
   }
}
handlepaymentstatusChange(id:string,event: any) {
  const selectElement = event.target as HTMLSelectElement;
  const statusPayment = selectElement.value;
  this.id=id
  this.statusPayment=statusPayment
  console.log(statusPayment)
  if (statusPayment!=null) {
      this.openModalApcept();
  } else {
      this.isModalApceptVisible = false;
  }
}
 // Hiển thị modal
 openModalApcept() {
   this.isModalApceptVisible = true;
 }
 // Đóng modal
 closeModalApcept() {
   this.isModalApceptVisible = false;
 }
 sendId(id: string): void {
  this.router.navigate(['OrderDetail-admin', id]);
}
onUpdateSuccess() {
  this.status=undefined
  this.statusPayment=undefined
  console.log(this.status,this.statusPayment)
  this.getbill();
}
}
