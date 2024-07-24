import { Component } from '@angular/core';
import { CustomerService } from 'src/services/customer/customer.service';
import { CustomermainService } from 'src/services/customermain/customermain.service';
import { Customer } from 'src/interfaces/Customer';
import { Router } from '@angular/router';
import { OrdersService } from 'src/services/Orders/orders.service';
import {ShoppingCartItem} from 'src/interfaces/Orders';
import { CloudConfig, Cloudinary, CloudinaryImage, URLConfig } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { UploadService } from 'src/services/Users/upload.service';
import { BillsService } from 'src/services/Bills/bills.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  Dataupdatepassword: any = {};
  currentPage: string = 'hoSo';
  getCustomer:Customer| null = null;
  idcustomer:string='';
  gender: string = '';
  phone:string='';
  photo!:string;
  address:string='';
  blameaddress:any={};
  selectedDate: Date = new Date();
  shopingCart:ShoppingCartItem[]=[]
  totalcart:number=0;

  active = 1;
  showPage(pageName: string) {
    if(pageName==='donHang')
    {
      this.StatusBill('Chờ Xác Nhận')
    }
    this.currentPage = pageName;
  }
  selectedMenuItem: string = 'hoSo';
  selectMenuItem(itemName: string) {
    this.selectedMenuItem = itemName;
  }
  constructor(private customer: CustomerService, private customerMain:CustomermainService,
    private router: Router,
    private ordersservice: OrdersService,
     private upload: UploadService,private billService:BillsService) {
    const savedImageSrc = localStorage.getItem('userImageSrc');
    if (savedImageSrc) {
      this.userImageSrc = savedImageSrc;
    }
    this.getCustomerID()
    this.CartShoping()
  }
  idUser!: string;
  img!: CloudinaryImage;
  publicIdPost!: string;
  imgFromUser!: CloudinaryImage;
  cloudName = "dpk9xllkq";
  uploadPreset = "angular_app";
  userImageSrc!: string;
  file!: File | null;
  getCustomerID()
{
  this.idcustomer=this.customer.getClaimValue();
  this.customerMain.CustomersId(this.idcustomer).subscribe
  ({
    next:(res)=>{
      this.getCustomer= res
      this.idUser = res.id
      this.gender = res.gender;
      this.phone=res.phone;
      this.photo=res.photo;
      console.log(this.photo)
      if(res.address==null)
      {
        this.blameaddress.t=null;
        this.blameaddress.h=null;
        this.blameaddress.x=null
        this.blameaddress.ap=null;
      }else
      {
        this.blameaddress=extractAddressInfo(res.address)
      }
      const cloudConfig = new CloudConfig({cloudName: 'dpk9xllkq'});
      const urlConfig = new URLConfig({secure: true});
      console.log(this.photo)
      this.img = new CloudinaryImage(this.photo, cloudConfig, urlConfig);
      this.img.resize(fill().height(70).width(70))
    },
    error:(err)=>{
      console.error('Lỗi lấy dữ liệu ',err);
    },})
}
ngOnInit()
{

}
getOrdersByStatus(status: number): ShoppingCartItem[] {
  return this.shopingCart.filter(item => item.status === status);
}
Updatepass()
{
 const dataupdate={
    id: this.getCustomer?.id,
    fullName: this.getCustomer?.fullName,
    photo:this.getCustomer?.photo,
    activated: true,
    password: this.Dataupdatepassword.password,
    email: this.getCustomer?.email,
    gender: this.gender,
    address: this.getCustomer?.address,
    birthday: this.getCustomer?.birthday,
 }
  const password = this.Dataupdatepassword.passwordODL;
if(this.Dataupdatepassword.password==this.Dataupdatepassword.passwordconfirm)
{
  this.customer.updatepass(this.phone, password).subscribe
  ({
    next:(res)=>{
      this.idcustomer = this.customer.getClaimValue();
      console.log(dataupdate);
      this.customer.update(this.idcustomer, dataupdate).subscribe({
        next: (res) => {
          alert("Thay đổi mật khẩu thành công")
        },
        error: (err) => {
          console.error('Lỗi thay đổi dữ liệu ', err);
        },
      });
    },
    error:(err)=>{
      console.error('Mật khẩu không đúng ',err);
    },})
}
else
{
  alert('Không đúng')
}
}
Address()
{
  this.idcustomer=this.customer.getClaimValue();
  this.updateAddress()
  const dataupdate={
    id: this.idcustomer,
    fullName: this.getCustomer?.fullName,
    photo:this.getCustomer?.photo,
    activated: true,
    password: this.getCustomer?.password,
    email: this.getCustomer?.email,
    gender: this.gender,
    address: this.fulladdress,
    birthday: this.getCustomer?.birthday,
    phone:this.getCustomer?.phone
 }
 this.customerMain.updateCustomer(this.idcustomer,dataupdate).subscribe(
  {
    next: (res) => {
      this.getCustomerID()
      alert("Lưu địa chỉ thành công")
    },
    error: (err) => {
      alert('Lỗi thay đổi dữ liệu ');
    },
  }
 )

}

updateprofile()
{
  //công thêm 1 ngày
  if (this.getCustomer?.birthday ) {
    const originalDate = new Date(this.getCustomer.birthday);
    originalDate.setDate(originalDate.getDate() + 1);
    this.getCustomer.birthday = originalDate;
  }
  this.idcustomer=this.customer.getClaimValue();
  const dataupdate={
    id: this.idcustomer,
    fullName: this.getCustomer?.fullName,
    photo:this.getCustomer?.photo,
    activated: true,
    password: this.getCustomer?.password,
    email: this.getCustomer?.email,
    gender: this.gender,
    address: this.getCustomer?.address,
    birthday:  this.getCustomer?.birthday,
    phone:this.getCustomer?.phone
 }
 this.customerMain.updateCustomer(this.idcustomer,dataupdate).subscribe(
  {
    next: (res) => {
      window.location.reload();
      alert("Lưu profile thanh công")
    },
    error: (err) => {
      alert('Lỗi thay lưu dữ liệu ');
    },
  }
 )
}

CartShoping() {
  this.ordersservice.getHistoryOrders(this.idcustomer).subscribe(
    {
      next: (res) => {
        this.shopingCart = res;

        this.shopingCart.forEach(element => {
          for (let i = 0; i < element.image0.length; i++) {
            this.totalcart += element.price[i] * element.quantity[i];
          }
        });
      },
      error: (err) => {
        console.log(err);
      },
    }
  );
  this.totalcart+=20000
}
  onDateChange(event: any) {
    this.selectedDate = event.value;
    console.log('Selected Date:', this.selectedDate);
  }
//----------------------------------------
logout()
{
  localStorage.removeItem('access_token');
  alert('Đăng xuất thành công')
  this.router.navigate(['home'])
}
// ------------------------------------------

  selectImage(): void {

    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  async onSelect(event: any): Promise<void> {
    const inputFile = event.target as HTMLInputElement;
    if (inputFile && inputFile.files && inputFile.files.length > 0) {
      this.file = inputFile.files[0];
      console.log('Tên của tệp đã chọn:', this.file);
      const data = new FormData();
      data.append('file', this.file);
      data.append('upload_preset', 'angular_app');
      data.append('cloud_name', 'dpk9xllkq');

      this.upload.uploadImage(data).subscribe({
        next: (res: any) => {
          this.publicIdPost = res.public_id;

          if (this.publicIdPost) {
            const customerUpdateData = {
              id: this.getCustomer?.id,
              fullName: this.getCustomer?.fullName,
              photo: this.publicIdPost,
              activated: true,
              password: this.getCustomer?.password,
              email: this.getCustomer?.email,
              gender: this.getCustomer?.gender,
              address: this.getCustomer?.address,
              birthday: this.getCustomer?.birthday,
              phone: this.getCustomer?.phone
            };

            console.log(customerUpdateData);
            this.customerMain.updateCustomer(this.idUser, customerUpdateData).subscribe({
              next:() => {
                window.location.reload();
                alert("Upload ảnh thành công!");
              },
              error: (err: any) => {
                console.error("Lỗi khi cập nhật dữ liệu:", err);
              }
            });
          }
        },
        error: (err: any) => {
          console.error("Lỗi khi upload ảnh:", err);
        }
      });
    }
  }


  //Địa chỉ
  city: string ='';
  district: string = '';
  ward: string = '';
  apt:string='';
  detailedAddress: string = '';
  disableAddressFields: boolean = false;
  fulladdress:string='';
  updateAddress() {
    this.detailedAddress = `${', '+'' +this.blameaddress.x? this.blameaddress.x + ', ' : ''}${this.blameaddress.h? this.blameaddress.h + ', ' : ''}${ this.blameaddress.t}`;
    this.fulladdress = `${this.apt ? this.apt + ', ' : ''}${this.blameaddress.x ? this.blameaddress.x + ', ' : ''}${this.blameaddress.h ? this.blameaddress.h + ', ' : ''}${this.blameaddress.t || ''}`;
    this.disableAddressFields = this.detailedAddress.trim() !== ''; // Kiểm tra xem có địa chỉ chi tiết không để vô hiệu hóa trường
    console.log(this.fulladdress)
 }
 bills: any[] = [];
 StatusBill(status:string)
 {
  this.bills=[]
  this.billService.getBillStatus(this.idcustomer,status).subscribe({
    next:(res:any[]) => {
      this.bills = res;
      console.log(this.bills)
    },
    error: (err: any) => {
      console.error("Lỗi khi cập nhật dữ liệu:", err);
    }
  });
}
 }

function extractAddressInfo(fullAddress:string) {
  const addressParts = fullAddress.split(',').map(part => part.trim());
  // Kiểm tra số lượng phần tử trong mảng để đảm bảo đủ thông tin
  if (addressParts.length < 4) {
    return null; // Địa chỉ không đầy đủ thông tin
  }

  const [ap, x, h, t] = addressParts;

  return {
    ap: ap,
    x: x,
    h: h,
    t: t
  };
}

