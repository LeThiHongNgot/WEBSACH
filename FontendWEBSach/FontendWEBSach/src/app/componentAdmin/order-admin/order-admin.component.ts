import { Component } from '@angular/core';
import { OrderWithDetails } from 'src/interfaces/Orders';
import { OrdersService } from 'src/services/Orders/orders.service';
import { SharedataService } from 'src/services/sharedata/sharedata.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css']
})
export class OrderAdminComponent {
  orderData:OrderWithDetails[]=[];
  idcustomer:string=''
  time:string=''
 constructor(private Order:OrdersService,private sharedata:SharedataService, private router:Router)
 {
  this.Order.getOrders(0).subscribe({
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

 handleChange(event: any,id:string,time:string) {
   const selectedValue = event.target.value;
   this.idcustomer=id
   this.time=time
   console.log(this.idcustomer)
   console.log(this.time)
   if (selectedValue === '1') {
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

 sendIdTime(id:string,time:string)
 {
  this.sharedata.setOrder(id,time);
  this.router.navigate(['OrderDetail-admin']);
 }
}
