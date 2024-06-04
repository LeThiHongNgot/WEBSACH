import { Component , Output, EventEmitter, Input} from '@angular/core';
import { Order } from 'src/interfaces/Orders';
import { OrdersService } from 'src/services/Orders/orders.service';
@Component({
  selector: 'app-modal-apcept',
  templateUrl: './modal-apcept.component.html',
  styleUrls: ['./modal-apcept.component.css']
})
export class ModalApceptComponent {
  @Input() idcustomer: any;
  @Input() time: any;
  @Output() closeModalEvent = new EventEmitter<void>();
  isModalVisible = false;
  constructor(private orderservice:OrdersService)
  {

  }
  upadatestatus()
  {
    const encodedTimestamp = encodeURIComponent(this.time);
    if(this.idcustomer!=''&&this.time!='')
    {
      this.orderservice.updateOrderStatus(this.idcustomer,this.time).subscribe({
        next: res => {
          if (res && res.success === true)
          {
          alert("Cập nhật trang thái thành công")
          window.location.reload();
          }
        },
        error: err => {
          console.log("Lỗi khi xóa: ", err)
        }
      })
    }

  }
  closeModal(): void {

    if(this.idcustomer!=''&&this.time!='')
    {
      this.upadatestatus()
    }

    this.closeModalEvent.emit();

  }

}
