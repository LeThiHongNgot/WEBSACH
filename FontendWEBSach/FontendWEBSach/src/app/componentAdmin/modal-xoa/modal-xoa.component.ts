import { Component , Output, EventEmitter, Input} from '@angular/core';
import { UsersService } from 'src/services/Users/users.service';
import { VoucherService } from 'src/services/Voucher/voucher.service';
import { CustomermainService } from 'src/services/customermain/customermain.service';
import { BooksService } from 'src/services/Books/books.service';
import { ProductViewService } from 'src/services/ProductView/product-view.service';
import { ProductView } from 'src/interfaces/ProductView';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-xoa',
  templateUrl: './modal-xoa.component.html',
  styleUrls: ['./modal-xoa.component.css']
})
export class ModalXoaComponent {
  constructor(private router: Router,private BookAll:BooksService ,private vouchers:VoucherService ,private customer: CustomermainService,private View:ProductViewService) {};
  @Input() idVoucherDelete: any;
  @Input() idCustomerDelete: any;
  @Input() idbookDelete: any;
  @Input() idReview: any;
  @Output() closeModalEvent = new EventEmitter<void>();
  isModalVisible = false;
  delete(id: any) {
    console.log('hàm delete: ', id);
    this.customer.deleteCustomer(id).subscribe({
      next: res => {
        alert("Xóa thành công!")
        window.location.reload();
      },
      error: err => {
        console.log("Lỗi khi xóa: ", err)
      }
    })
  }
  deleteVoucher(id: any) {
    console.log('hàm delete: ', id);
    this.vouchers.DeleteVoucher(id).subscribe({
      next: res => {
        alert("Xóa thành công!")
        window.location.reload();
      },
      error: err => {
        console.log("Lỗi khi xóa: ", err)
      }
    })
  }
  deletebook(idbook:string)
  {
    console.log(idbook)
    this.BookAll.deleteBookById(idbook).subscribe({
      next: (res) => {
        alert("Xóa thành công")
        window.location.reload();
      },
      error: (err) => {
        console.log("Lỗi khi xóa: ", err)

      },
    });
  }
  deleteView(idReview:string)
  {
    this.View.deleteProductReview(idReview).subscribe({
      next: (res) => {
        alert("xóa thành công")
        window.location.reload();
      },
      error: (err) => {
        console.log("Lỗi khi xóa: ", err)
      },
    });
  }
  closeModal(): void {
    if(this.idReview!='')
    {
      this.deleteView(this.idReview)

    }
    if(this.idVoucherDelete !='')
    {
      this.deleteVoucher(this.idVoucherDelete)
    }
    if(this.idCustomerDelete !='')
    {this.delete(this.idCustomerDelete);
  }
    if(this.idbookDelete !='')
    { this.deletebook(this.idbookDelete);
    }
    this.closeModalEvent.emit();
  }
}
