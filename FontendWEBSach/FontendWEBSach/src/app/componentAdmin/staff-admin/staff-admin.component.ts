import { Component } from '@angular/core';
import { User } from 'src/interfaces/User';
import { UsersService } from 'src/services/Users/users.service';

@Component({
  selector: 'app-staff-admin',
  templateUrl: './staff-admin.component.html',
  styleUrls: ['./staff-admin.component.css']
})
export class StaffAdminComponent {
  constructor(private users: UsersService) {}

  Users: User[]=[];
  filteredUsers: User[]=[];
  user: any = {};

  selectAllChecked = false; // Biến để theo dõi trạng thái chọn tất cả
  selectedStaff: any[] = []; // Mảng để lưu trữ trạng thái chọn của từng sách

  ngOnInit()
  {
    this.users.Users().subscribe({
      next: res => {
        this.Users = res;
        console.log(res)
        this.loadpro(null);
      },
      error: err => {
        console.log("Lỗi lấy dữ liệu: ", err)
      }
    })
  }


  assets: any;

  isDeleteModalVisible = false;

  loadpro(searchTerm: string | null) {
    if (searchTerm && searchTerm.trim() !== '') {
      // Filter the books based on the search term
      this.filteredUsers = this.Users.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // If no search term or an empty search term, show all books
      this.filteredUsers = this.Users.slice(0, 25); // Or simply assign this.filteredBooks = this.Books; for all books
    }
    console.log(this.filteredUsers)
  }

  selectAll(event: any) {
    this.selectAllChecked = event.target.checked; // Cập nhật trạng thái chọn tất cả

    if (this.selectAllChecked) {
      this.selectedStaff = this.Users.slice(0, 25);
    } else {
      this.selectedStaff = [];
    }
  }

  selectStaff(event: any, staff: any) {
    if (event.target.checked) {
      this.selectedStaff.push(staff);
    } else {
      const index = this.selectedStaff.findIndex((selectedStaff) => selectedStaff.id === staff.id);
      if (index !== -1) {
        this.selectedStaff.splice(index, 1);
      }
    }
  }
  // Hàm xóa sách
  deleteStaff(cmt: any) {
    console.log('Deleting staff:', );
  }
  // Hiển thị modal xác nhận xóa
  openDeleteModal() {
    this.isDeleteModalVisible = true;
  }

  // Đóng modal xác nhận xóa
  closeDeleteModal() {
    this.isDeleteModalVisible = false;
  }

  isAddStaffModalVisible = false;

  // Hiển thị modal add
  openAddStaffModal() {
    this.isAddStaffModalVisible = true;
  }

  // Đóng modal add
  closeAddtStaffModal() {
    this.isAddStaffModalVisible = false;
  }
}
