import { Component , Output, EventEmitter, Input} from '@angular/core';
import { UsersService } from 'src/services/Users/users.service';
import { OtpService } from 'src/services/otp/otp.service';

@Component({
  selector: 'app-modal-add-staff',
  templateUrl: './modal-add-staff.component.html',
  styleUrls: ['./modal-add-staff.component.css']
})
export class ModalAddStaffComponent {
  constructor(private staffs: UsersService,
    private otpService:OtpService
  ) {}

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
    };


    this.otpService.validateEmail(this.DataStaff.Email).subscribe({
      next: (data) => {

        this.staffs.PostUser(dataStaff).subscribe({
          next: res => {
            this.staffs.sendEmail(
              this.DataStaff.Email,
              this.DataStaff.Phone,
              this.DataStaff.Password
            ).subscribe({
              next: emailRes => {
                alert("Thêm nhân viên thành công và email đã được gửi!");
              },
              error: emailErr => {
                console.log("Lỗi khi gửi email: ", emailErr);
                alert("Nhân viên đã được thêm nhưng lỗi khi gửi email.");
              }
            });
          },
          error: err => {
            console.log("Lỗi khi thêm dữ liệu: ", err);
            alert("Lỗi khi thêm nhân viên.");
          }
        });
      },
      error: (error) => {
        console.log('Email không tồn tại:');
      }
    });
  }


  closeModal(): void {
      this.closeModalEvent.emit();
  }


}
