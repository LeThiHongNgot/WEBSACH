import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { VoucherService } from 'src/services/Voucher/voucher.service';

@Component({
  selector: 'app-modal-add-voucher',
  templateUrl: './modal-add-voucher.component.html',
  styleUrls: ['./modal-add-voucher.component.css']
})
export class ModalAddVoucherComponent implements OnInit {
  constructor(private vouchers: VoucherService) {}
  
  @Output() closeModalEvent = new EventEmitter<void>();
  isModalVisible = false;
  DataVoucher: any = {};
  @Input() isEditMode?: string;

  ngOnInit(): void {
    if (this.isEditMode != null) {
      console.log(this.isEditMode);
      this.vouchers.VouchersParam(this.isEditMode).subscribe({
        next: res => {
          this.DataVoucher = res;
          this.DataVoucher.dateBegin = this.formatDate(res.dateBegin);
          this.DataVoucher.dateEnd = this.formatDate(res.dateEnd);
        },
        error: err => {
          console.error('Lỗi khi lấy dữ liệu voucher:', err);
        }
      });
    }
  }

  addVoucher(): void {
    const dataVoucher = {
      Id: this.DataVoucher.id,
      Quantity: this.DataVoucher.quantity,
      PercentDiscount: this.DataVoucher.percentDiscount,
      MaxDiscount: this.DataVoucher.maxDiscount,
      DateBegin: this.DataVoucher.dateBegin,
      DateEnd: this.DataVoucher.dateEnd
    };
    console.log(dataVoucher)
    if(this.isEditMode!=null)
    {
      this.vouchers.PutVoucher(this.isEditMode,dataVoucher).subscribe({
        next: res => {
          
          alert("Chỉnh sửa voucher thành công!");
          window.location.reload();
        },
        error: err => {
          console.log("Lỗi tạo thêm:", err);
        }
      });
    }else
    {
      this.vouchers.PostVoucher(dataVoucher).subscribe({
        next: res => {
          console.log(res);
          this.DataVoucher = {};
          alert("Thêm voucher thành công!");
          window.location.reload();
        },
        error: err => {
          console.log("Lỗi tạo thêm:", err);
        }
      });
    }
  }

  convertToUppercase(value: string): string {
    return value.toUpperCase();
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  private formatDate(date: string): string {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }
}
