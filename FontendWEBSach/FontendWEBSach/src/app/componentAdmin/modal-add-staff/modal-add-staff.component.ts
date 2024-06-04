import { Component , Output, EventEmitter, Input} from '@angular/core';
import { UsersService } from 'src/services/Users/users.service';

@Component({
  selector: 'app-modal-add-staff',
  templateUrl: './modal-add-staff.component.html',
  styleUrls: ['./modal-add-staff.component.css']
})
export class ModalAddStaffComponent {
  constructor(private staffs: UsersService) {}

  DataStaff: any = {}
  @Output() closeModalEvent = new EventEmitter<void>();
  
  isModalVisible = false;

  addStaff() {
    const dataStaff = {
      Id: this.DataStaff.Phone,
      FullName: this.DataStaff.FullName,
      Password: this.DataStaff.Password,
      Email: this.DataStaff.Email,
      Phone: this.DataStaff.Phone,
      Bills: [],
      UserRoles: []
    }
    this.staffs.PostUser(dataStaff).subscribe({
      next: res => {
        alert("Thêm nhân viên thành công!")
      },
      error: err => {
        console.log("Lỗi khi thêm dữ liệu: ", err)
      }
    })
  }

  closeModal(): void {
      this.closeModalEvent.emit();
  }

  
}
