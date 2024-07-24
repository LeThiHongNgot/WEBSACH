import { Component , Output, EventEmitter, Input} from '@angular/core';
import { Order } from 'src/interfaces/Orders';
import { BillsService } from 'src/services/Bills/bills.service';
@Component({
  selector: 'app-modal-apcept',
  templateUrl: './modal-apcept.component.html',
  styleUrls: ['./modal-apcept.component.css']
})
export class ModalApceptComponent {
  @Input() id: any;
  @Input() status:any;
  @Input() statusPayment?:any;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() updateSuccess = new EventEmitter<void>();
  isModalVisible = false;
  constructor(private billservice:BillsService)
  {

  }
  onStatusChange(id: string, status:string): void {
    this.billservice.updateBillStatus(id, status).subscribe({
      next: res => {
        alert("Cập nhật trạng thái thành công")
        this.status=undefined
        this.updateSuccess.emit();
      },
      error: err => {
        console.error('Update failed:', err);
      }
    });
  }
  onStatuspaymentChange(id :string,value:string)
 {
  this.billservice.updateBillStatusPayment(id,value).subscribe({
    next: res => {
      alert("Cập nhật trạng của thanh toán thái thành công")
      this.statusPayment=undefined
      this.updateSuccess.emit();
    },
    error: err => {
      console.error('Update failed:', err);
    }
  });


 }
  Access(){
    console.log(this.status)
    if(this.id!=''&&this.status!=undefined)
    {
      this.onStatusChange(this.id,this.status)
      this.closeModalEvent.emit();
    }
    if(this.id!=''&&this.statusPayment!=undefined)
    {
      this.onStatuspaymentChange(this.id,this.statusPayment)
      this.closeModalEvent.emit();

    }

  }
  closeModal()
  {
  this.closeModalEvent.emit();
  }
}
