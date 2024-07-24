import { Component,Input,OnInit  } from '@angular/core';
import { BillWithCustomer } from 'src/interfaces/Orders';
import { OrdersService } from 'src/services/Orders/orders.service';
import { SharedataService } from 'src/services/sharedata/sharedata.service';
import { WordService } from 'src/services/Word/word.service';
import { BillsService } from 'src/services/Bills/bills.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  providers: [DatePipe]
})
export class OrderDetailComponent {
  @Input() id: any;
  orderData:any;
  address:string='';
  phone:string='';
  idbill:string='';
  namecustomer:string='';
  adress:string='';
  total:number=0;
  time?: Date;
  constructor(private Order:OrdersService,
    private wordService: WordService,
    private billservice:BillsService,
    private route:ActivatedRoute,
    private datePipe: DatePipe)
  {

  }
  ngOnInit(): void {
    this.idbill = this.route.snapshot.paramMap.get('id') || '';
    if (this.idbill) {
      this.fetchBillDetails();
    }
  }

  fetchBillDetails(): void {
    if (this.idbill) {
      this.billservice.getdetailsbill(this.idbill).subscribe({
        next: (res) => {
          this.orderData = res;
          if (this.orderData.length > 0) {
            this.total = this.orderData[0].totalAmount;
            this.namecustomer = this.orderData[0].nameCustomer;
            this.time = this.orderData[0].orderDate;
            this.address = this.orderData[0].address;
            this.phone = this.orderData[0].phoneNumber;
          }
          console.log('get successful:', this.orderData);
        },
        error: err => {
          console.error('get failed:', err);
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

  //  this.wordService.exportToWord(data, fileName);
  // }
  // ToTal()
  // {
  //   for(let i of this.orderData)
  //   {
  //     this.total+=i.unitPrice*i.quantity
  //   }
  // }
  }
}
