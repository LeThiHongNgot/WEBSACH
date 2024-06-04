import { Component,  Renderer2, ElementRef,AfterViewInit} from '@angular/core';
import { SharedataService } from 'src/services/sharedata/sharedata.service';
import { Observable } from 'rxjs';
import { BooksService } from 'src/services/Books/books.service';
import { forkJoin } from 'rxjs';
import { BookDetailsViewModel } from 'src/interfaces/fullbook';
import { Router } from '@angular/router';
import { CustomermainService } from 'src/services/customermain/customermain.service';
import { CustomerService } from 'src/services/customer/customer.service';
import { OrdersService } from 'src/services/Orders/orders.service';
import { Order } from 'src/interfaces/Orders';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  checkedProductIds: string[] = [];
  productsPrice: { [id: string]: number } = {};
  quantity: { [key: string]: number } = {};
  books:BookDetailsViewModel[]=[]
  idcustomer:string='';
  address:string='';
  Orderdata:Order[]=[];
  currentDate = new Date();
  year = this.currentDate.getFullYear();
  month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0');
  day = this.currentDate.getDate().toString().padStart(2, '0');
  hours = this.currentDate.getHours().toString().padStart(2, '0');
  minutes = this.currentDate.getMinutes().toString().padStart(2, '0');
  seconds = this.currentDate.getSeconds().toString().padStart(2, '0');
  totalmoney:number=0
  IscheckOrder:boolean=false;

  constructor(private ren: Renderer2,private ele: ElementRef,private OrderService:OrdersService,private customer: CustomerService,private customerMain:CustomermainService,private router: Router,private sharedata:SharedataService, private bookfull:BooksService)
  {
    // lấy chuỗi thong tin sách của người mua
    // Observable<string[]>
    this.sharedata.checkedProductIds$.subscribe((value) => {
      this.checkedProductIds = value;
    });

    // Observable<{ [id: string]: number }>
    this.sharedata.productsPrice$.subscribe((value) => {
      this.productsPrice = value;
    });
    //  Observable<{ [key: string]: number }>
    this.sharedata.quantity$.subscribe((value) => {
      this.quantity = value;
    });
    // console.log(this.quantity)
    // console.log(this.productsPrice)
    // tính tổng tiền của đơn hàng
    for(let i of this.checkedProductIds)
  {
    this.totalmoney+=this.productsPrice[i]*this.quantity[i];

  }
  if(this.checkedProductIds.length!=0)
  {
    const payment = this.ele.nativeElement.querySelector('#ment');
    if (payment) {
      this.ren.setStyle(payment, 'display', 'block');
    }
    this.getCustomerID()
    this.loadproduct()
  }else
  {
    const payment = this.ele.nativeElement.querySelector('#ment');
    this.ren.setStyle(payment, 'display', 'none');
  }
  }
  // lấy địa chỉ cua  người dùng
  getCustomerID()
  {
    this.idcustomer=this.customer.getClaimValue();
    this.customerMain.CustomersId(this.idcustomer).subscribe
    ({
      next:(res)=>{
        this.address=res.address;
        console.log(this.address)
      },
      error:(err)=>{
        console.error('Lỗi lấy dữ liệu ',err);
      },})
  }
// lấy sách tương ứng
  loadproduct()
  {
    const bookObservables = this.checkedProductIds.map(id => this.bookfull.getBookDetailsWithImagesid(id));
    forkJoin(bookObservables).subscribe({
      next: (results) => {
        this.books = results;
      },
      error: (er) => {
        console.log('Lỗi lấy dữ liệu');
      }
    });
  }
  percent1(price: number, per: number): number {
    return price *(1- per) ;}
    stranUser()
    {
      this.router.navigate(['user']);
    }
 // thực hiện order
    Order()
  {
    console.log(this.address)
    if(this.address!=null)
    {
      for( let i of this.checkedProductIds)
     {
      const dataOrder = {
          id: i+`${this.hours}:${this.minutes}${this.seconds}`,
          customerId: this.idcustomer,
          orderDate: `${this.year}-${this.month}-${this.day}`,
          status: 0,
          address: this.address,
          description: `${this.year}-${this.month}-${this.day} ${this.hours}:${this.minutes}:${this.seconds}`,
          unitPrice: this.quantity[i] * this.productsPrice[i],
          quantity: this.quantity[i],
          bookId: i,
      };
      this.OrderService.postOrder(dataOrder).subscribe(
        {
          next:(res)=>{
            alert('Vui lòng chờ xác nhận đơn hàng từ shop')
            this.router.navigate(['user']);
          },
          error:(err)=>{
            console.error('Lỗi lấy dữ liệu ',err);
          },
        }
      )
    }
  }else
  {
    alert('Vui lòng chọn vào mục đia chỉ khác để điền thông tiền đia chỉ giao hàng')
  }
}

}
