import { Component , Output, EventEmitter, Input} from '@angular/core';
@Component({
  selector: 'app-modal-edit-voucher',
  templateUrl: './modal-edit-voucher.component.html',
  styleUrls: ['./modal-edit-voucher.component.css']
})
export class ModalEditVoucherComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  isModalVisible = false;
  closeModal(): void {
      this.closeModalEvent.emit();
  }
}
