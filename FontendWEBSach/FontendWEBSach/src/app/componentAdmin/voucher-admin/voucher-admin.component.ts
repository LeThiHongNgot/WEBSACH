import { Component } from '@angular/core';
import { Voucher } from 'src/interfaces/Voucher';
import { VoucherService } from 'src/services/Voucher/voucher.service';

@Component({
  selector: 'app-voucher-admin',
  templateUrl: './voucher-admin.component.html',
  styleUrls: ['./voucher-admin.component.css']
})
export class VoucherAdminComponent {
  constructor(private vouchers: VoucherService) {
  }
  Vouchers: Voucher[]=[];
  filteredVouchers: Voucher[]=[];
  voucher: any = {}

  ngOnInit()
  {
    this.vouchers.Vouchers().subscribe({
      next: res => {
        console.log(res)
        this.Vouchers = res
        console.log(res)
        this.loadpro(null)
      },
      error: err => {
        console.log("Lỗi lấy dữ liệu: ", err)
      }
    });
  }

  isDeleteModalVisible = false;
  isEditVoucherModalVisible = false;
  isAddVoucherModalVisible = false;
  idVoucherDelete: any;
  loadpro(searchTerm: string | null) {
    if (searchTerm && searchTerm.trim() !== '') {
      // Filter the books based on the search term
      this.filteredVouchers = this.Vouchers.filter(vou =>
        vou.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // If no search term or an empty search term, show all books
      this.filteredVouchers = this.Vouchers.slice(0, 25); // Or simply assign this.filteredBooks = this.Books; for all books

    }
  }

  // Hiển thị modal add
  openAddVoucherModal() {
    this.isAddVoucherModalVisible = true;
  }

  // Đóng modal add
  closeAddtVoucherModal() {
    this.isAddVoucherModalVisible = false;
  }

  // Hiển thị modal edit
  openEditVoucherModal() {
    this.isEditVoucherModalVisible = true;
  }

  // Đóng modal edit
  closeEditVoucherModal() {
    this.isEditVoucherModalVisible = false;
  }

  // Hiển thị modal xác nhận xóa
  openDeleteModal(id: any) {
    this.idVoucherDelete= id;
    this.isDeleteModalVisible = true;
  }

  // Đóng modal xác nhận xóa
  closeDeleteModal() {
    this.isDeleteModalVisible = false;
  }
}
