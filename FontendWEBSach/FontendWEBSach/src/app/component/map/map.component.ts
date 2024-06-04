import { Component , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  isModalVisible = false;
  closeModal(): void {
      this.closeModalEvent.emit();
  }
}
