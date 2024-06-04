import { Component,Input } from '@angular/core';
import { OrderWithDetails } from 'src/interfaces/Orders';
import { OrdersService } from 'src/services/Orders/orders.service';
import { SharedataService } from 'src/services/sharedata/sharedata.service';
import { WordService } from 'src/services/Word/word.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
  @Input() idCustomer: any;
  @Input() Time: any;
  orderData:OrderWithDetails[]=[];
  address:string='';
  phone:string='';
  idOrderCustomer:string='';
  namecustomer:string='';
  time:string='';
  total:number=0;
  id:string='';
  constructor(private Order:OrdersService,private sharedata:SharedataService,private wordService: WordService)
  {
      this.sharedata.idCustomer$.subscribe((value) => {
        this.idOrderCustomer = value;
      });
      this.sharedata.time$.subscribe((value) => {
        this.time= value;
      });
      if (this.idOrderCustomer !== null && this.time !== null) {
        const encodedTimestamp = encodeURIComponent(this.time);
        this.Order.getOrdersByCustomerIdAndTimestamp(this.idOrderCustomer, encodedTimestamp).subscribe({
          next: res => {
            this.orderData = res;
            if (Array.isArray(this.orderData) && this.orderData.length > 0) {
              this.address = this.orderData[0].address;
              this.phone = this.orderData[0].phone;
              this.id=this.orderData[0].id
              this.namecustomer = this.orderData[0].customerName;
            } else {
              console.log('Invalid or empty response structure.');
            }
            this.ToTal()
          },
          error: err => {
            console.log("Error fetching data: ", err);
          }
        });
      }
  }

  exportToWord(): void {
    const data = {
      phone:this.phone,
     name: this.namecustomer,
      address:this.address,
      id: this.id, // Sample order ID
      total: this.total, // Sample total price
      time: this.time, // Sample order date
      orderData: this.orderData,
    };
    const fileName = 'InHoaDon.pdf';

    this.wordService.exportToWord(data, fileName);
  }
  ToTal()
  {
    for(let i of this.orderData)
    {
      this.total+=i.unitPrice*i.quantity
    }
  }
}
