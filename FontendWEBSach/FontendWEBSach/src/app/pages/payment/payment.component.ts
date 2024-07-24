import { Component, ElementRef, NgZone, OnInit, Renderer2 } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { SharedataService } from 'src/services/sharedata/sharedata.service';
import { BooksService } from 'src/services/Books/books.service';
import { BookDetailsViewModel } from 'src/interfaces/fullbook';
import { CustomermainService } from 'src/services/customermain/customermain.service';
import { CustomerService } from 'src/services/customer/customer.service';
import { OrdersService } from 'src/services/Orders/orders.service';
import { Order } from 'src/interfaces/Orders';
import { VoucherService } from 'src/services/Voucher/voucher.service';
declare var paypal: any;
import { BillsService } from 'src/services/Bills/bills.service';
import { ActivatedRoute } from '@angular/router';
import { CartsService } from 'src/services/Carts/carts.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  checkedProductIds: string[] = [];
  productsPrice: { [id: string]: number } = {};
  quantity: { [key: string]: number } = {};
  books: BookDetailsViewModel[] = [];
  idcustomer: string = '';
  address: string = '';
  Orderdata: Order[] = [];
  currentDate = new Date();
  year = this.currentDate.getFullYear();
  month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0');
  day = this.currentDate.getDate().toString().padStart(2, '0');
  hours = this.currentDate.getHours().toString().padStart(2, '0');
  minutes = this.currentDate.getMinutes().toString().padStart(2, '0');
  seconds = this.currentDate.getSeconds().toString().padStart(2, '0');
  totalmoney: number = 0;
  IscheckOrder: boolean = false;
  selectedPaymentMethod: string = 'cash';
  showPaypalButton: boolean = false;
  vouchers: any[] = [];
  voucherid?:string;
  statusPayment?:string;

  // Tỷ giá hối đoái (ví dụ)
  exchangeRate: number = 23000;
  selectedCoupon: string = '';
  discountAmount: number = 0;

  constructor(
    private ren: Renderer2,
    private ele: ElementRef,
    private orderService: OrdersService,
    private customer: CustomerService,
    private customerMain: CustomermainService,
    private router: Router,
    private bookfull: BooksService,
    private voucherService: VoucherService,
    private ngZone: NgZone,// Inject NgZone
    private billservice:BillsService,
    private route:ActivatedRoute,
    private cartService:CartsService
  ) {

    this.route.queryParams.subscribe(params => {
    const sessionKey = params['sessionKey'];

    if (sessionKey) {
      const storedCheckedProductIds = sessionStorage.getItem(`${sessionKey}_checkedProductIds`);
      const storedProductsPrice = sessionStorage.getItem(`${sessionKey}_productsPrice`);
      const storedQuantity = sessionStorage.getItem(`${sessionKey}_quantity`);

      if (storedCheckedProductIds && storedProductsPrice && storedQuantity) {
        this.checkedProductIds = JSON.parse(storedCheckedProductIds) || [];
        this.productsPrice = JSON.parse(storedProductsPrice) || {};
        this.quantity = JSON.parse(storedQuantity) || {};

      } else {
        console.error('Failed to retrieve session data');
      }
    } else {
      console.error('No session key found in query parameters');
    }

    // Tiếp tục xử lý hoặc gọi phương thức để tải dữ liệu nếu cần
    this.loadProduct();
  });

    this.calculateTotalMoney();

    if (this.checkedProductIds.length !== 0) {
      this.displayPaymentSection(true);
      this.getCustomerID();
      this.loadProduct();
    } else {
      this.displayPaymentSection(false);
    }
  }

  ngOnInit() {
    this.renderPaypalButton();
    this.loadVouchers();
  }

  displayPaymentSection(display: boolean) {
    const payment = this.ele.nativeElement.querySelector('#ment');
    if (payment) {
      this.ren.setStyle(payment, 'display', display ? 'block' : 'none');
    }
  }

  getCustomerID() {
    this.idcustomer = this.customer.getClaimValue();
    this.customerMain.CustomersId(this.idcustomer).subscribe({
      next: (res) => {
        // Use NgZone.run to ensure this code runs inside Angular's zone
        this.ngZone.run(() => {
          this.address = res.address;
          console.log(this.address);
        });
      },
      error: (err) => {
        console.error('Lỗi khi lấy thông tin khách hàng', err);
      },
    });
  }

  loadProduct() {
    const bookObservables = this.checkedProductIds.map(id => this.bookfull.getBookDetailsWithImagesid(id));
    forkJoin(bookObservables).subscribe({
      next: (results) => {
        this.ngZone.run(() => {
          this.books = results;
        });
      },
      error: (err) => {
        console.log('Lỗi khi lấy thông tin sách', err);
      }
    });
  }

  percent1(price: number, per: number): number {
    return price * (1 - per / 100);
  }

  stranUser() {
    // Use NgZone.run to ensure this code runs inside Angular's zone
    this.ngZone.run(() => {
      this.router.navigate(['user']);
    });
  }

  onPaymentMethodChange(event: any) {
    this.selectedPaymentMethod = event.value;
    this.showPaypalButton = this.selectedPaymentMethod === 'paypal';
    if (this.showPaypalButton) {
      setTimeout(() => {
        this.renderPaypalButton();
      });
    }
  }

  renderPaypalButton() {
    if (document.getElementById('paypal-button')) {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
        const amountInUSD = this.calculateTotalAmount() / this.exchangeRate;
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: 'USD',
                value: amountInUSD.toFixed(2) // Ensure 2 decimal places
              }
            }]
          });
        },
        onApprove: async (data: any, actions: any) => {
          try {
            const details = await actions.order.capture();
            this.statusPayment="Paypal"
            this.processOrder();
          } catch (err) {
            console.error('Error during capture:', err);
            alert('Đã xảy ra lỗi trong quá trình xử lý thanh toán. Vui lòng thử lại sau.');
          }
        },
        onError: (err: any) => {
          alert('Đã xảy ra lỗi trong quá trình thanh toán bằng PayPal. Vui lòng thử lại sau.');
        }
      }).render('#paypal-button');
    }
  }

  processOrder() {
    if (!this.address) {
      alert('Vui lòng chọn vào mục địa chỉ khác để điền thông tin địa chỉ giao hàng');
      return;
    }

    if (this.checkedProductIds.length === 0) {
      alert('Không có sản phẩm nào được chọn.');
      return;
    }
    let ordersProcessed = 0;
    const totalOrders = this.checkedProductIds.length;
    const idbill = this.idcustomer + `${this.hours}${this.minutes}${this.seconds}`;
    const databill = {
      id: idbill,
      userId: null,
      voucherId: this.voucherid,
      BillDate: `${this.year}-${this.month}-${this.day}`,
      totalAmount: this.totalmoney,
      paymentStatus: this.statusPayment,
      status: 'Chờ Xác Nhận'
    };
    console.log(databill)
    this.billservice.postBill(databill).subscribe({
      next: (res) => {
        for (let i of this.checkedProductIds) {
          const dataOrder = {
            id: i+`${this.hours}${this.minutes}${this.seconds}`,
            customerId: this.idcustomer,
            orderDate: `${this.year}-${this.month}-${this.day}`,
            address: this.address,
            description: `${this.year}-${this.month}-${this.day} ${this.hours}:${this.minutes}:${this.seconds}`,
            unitPrice: this.quantity[i] * this.productsPrice[i],
            quantity: this.quantity[i],
            bookId: i,
            billId:idbill
          };
          this.orderService.postOrder(dataOrder).subscribe({
            next: (res) => {
              const id = i + this.idcustomer;
              this.cartService.deleteCartsById(id).subscribe({
                next: () => {
                  console.log('Đã xóa mục:', );
                },
                error: (err) => {
                  console.error('Lỗi khi xóa mục:', err);
                }
              });
              ordersProcessed++;
              if (ordersProcessed === totalOrders) {
                alert('Vui lòng chờ xác nhận đơn hàng từ shop');
                this.ngZone.run(() => {
                  this.resetState();
                  this.router.navigate(['user']);
                });
              }
            },
            error: (err) => {
              console.error('Lỗi khi xử lý đơn hàng', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Lỗi tạo bill ', err);
      }
    });
  }

  resetState() {
    this.checkedProductIds = [];
    this.productsPrice = {};
    this.quantity = {};
    this.books = [];
    this.totalmoney = 0;
    this.showPaypalButton = false;
    this.selectedPaymentMethod = 'cash';
    this.displayPaymentSection(false);
  }

  calculateTotalMoney() {
    this.totalmoney = this.checkedProductIds.reduce((acc, id) => {
      return acc + (this.productsPrice[id] * (this.quantity[id] || 1));
    }, 0);
  }

  calculateTotalAmount() {
    const shippingFee = 20000;
    const totalPrice = this.totalmoney + shippingFee - this.discountAmount;
    return totalPrice;
  }

  updateDiscountAmount(voucher: any) {
    this.voucherid=voucher.id
    let calculatedDiscount = this.totalmoney * (voucher.percentDiscount / 100);
    this.discountAmount = Math.min(calculatedDiscount, voucher.maxDiscount);

    // Cập nhật lại tổng tiền sau khi áp dụng mã giảm giá
    this.calculateTotalMoney();
  }

  checkValidVouchers(vouchers: any[]) {
    const currentDate = new Date();
    return vouchers.filter(voucher => {
      const endDate = new Date(voucher.dateEnd);
      return voucher.quantity > 0 && endDate > currentDate;
    });
  }

  loadVouchers() {
    this.voucherService.Vouchers().subscribe((data) => {
      this.vouchers = this.checkValidVouchers(data);
    });
  }
}
