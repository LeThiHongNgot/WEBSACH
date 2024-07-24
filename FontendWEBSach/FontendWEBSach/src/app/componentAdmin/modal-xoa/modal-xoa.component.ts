import { Component, Output, EventEmitter, Input } from '@angular/core';
import { VoucherService } from 'src/services/Voucher/voucher.service';
import { CustomermainService } from 'src/services/customermain/customermain.service';
import { BooksService } from 'src/services/Books/books.service';
import { ProductViewService } from 'src/services/ProductView/product-view.service';
import { CategoriesService } from 'src/services/Categories/categories.service';
import { SupliersService } from 'src/services/Supliers/supliers.service';
import { AuthorsService } from 'src/services/Authors/authors.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-xoa',
  templateUrl: './modal-xoa.component.html',
  styleUrls: ['./modal-xoa.component.css']
})
export class ModalXoaComponent {
  constructor(
    private router: Router,
    private BookAll: BooksService,
    private Vouchers: VoucherService,
    private customer: CustomermainService,
    private View: ProductViewService,
    private Author: AuthorsService,
    private Category: CategoriesService,
    private Supplier: SupliersService

  ) { };
  @Input() idDeleteVoucher: any;
  @Input() idCustomerDelete: any;
  @Input() idbookDelete: any;
  @Input() idReview: any;
  @Input() idAuthor: any;
  @Input() idCategory: any;
  @Input() idSupplier: any;
  @Output() closeModalEvent = new EventEmitter<void>();
  isModalVisible = false;
  delete(id: any) {
    this.customer.deleteCustomer(id).subscribe({
      next: res => {
        alert("Xóa khách hàng thành công!")
        window.location.reload();
      },
      error: err => {
        console.log("Lỗi khi xóa: ", err)
      }
    })
  }

  deleteVoucher(idVoucher: string) {
    console.log("voucherrrrrrrrrrrr")
    this.Vouchers.DeleteVoucher(idVoucher).subscribe({
      next: res => {
        alert("Xóa voucher thành công!")
        window.location.reload();
      },
      error: err => {
        console.log("Lỗi khi xóa: ", err)
      }
    })
  }

  deletebook(idbook: string) {
    console.log(idbook)
    this.BookAll.deleteBookById(idbook).subscribe({
      next: (res) => {
        alert("Xóa sách thành công")
        window.location.reload();
      },
      error: (err) => {
        console.log("Lỗi khi xóa: ", err)

      },
    });
  }

  deleteView(idReview: string) {
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

  deleteAuthor(idAuthor: string) {
    console.log(idAuthor)
    this.Author.deleteAuthorById(idAuthor).subscribe({
      next: (res) => {
        alert("Xóa tác giả thành công")
        window.location.reload();
      },
      error: (err) => {
        console.log("Lỗi khi xóa: ", err)
      },
    });
  }
  deleteCategory(idCategory: string) {
    console.log(idCategory)
    this.Category.deleteCategoryrById(idCategory).subscribe({
      next: (res) => {
        alert("Xóa loại sách thành công")
        window.location.reload();
      },
      error: (err) => {
        console.log("Lỗi khi xóa: ", err)
      },
    });
  }
  deleteSuppiler(idSupplier: string) {
    console.log(idSupplier)
    this.Supplier.deleteSupplierId(idSupplier).subscribe({
      next: (res) => {
        alert("Xóa nhà cung cấp thành công")
        window.location.reload();
      },
      error: (err) => {
        console.log("Lỗi khi xóa: ", err)
      },
    });
  }

  confirmDelete(): void {
    if (this.idReview != undefined) {
      this.deleteView(this.idReview);
    }
    if (this.idDeleteVoucher!= undefined) {
      this.deleteVoucher(this.idDeleteVoucher);
    }
    if (this.idCustomerDelete != undefined) {
      this.delete(this.idCustomerDelete);
    }
    if (this.idbookDelete != undefined) {
      this.deletebook(this.idbookDelete);
    }
    if (this.idAuthor != undefined&&this.idAuthor != '') {
      this.deleteAuthor(this.idAuthor);
    }
    if (this.idCategory != undefined&&this.idCategory != '') {
      this.deleteCategory(this.idCategory);
    }
    if (this.idSupplier != undefined && this.idSupplier != '') {
      this.deleteSuppiler(this.idSupplier);
    }
    this.closeModalEvent.emit();
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
