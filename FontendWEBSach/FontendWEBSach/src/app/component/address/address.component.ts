import { Component , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  isModalVisible = false;
  closeModal(): void {
      this.closeModalEvent.emit();
  }
}
