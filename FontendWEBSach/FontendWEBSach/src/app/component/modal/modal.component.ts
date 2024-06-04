import { Component, Output, EventEmitter, Renderer2, ElementRef, HostListener,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {Customer} from '../../../interfaces/Customer';
import { CustomerService } from 'src/services/customer/customer.service';
import 'firebase/auth';
import { OtpService } from 'src/services/otp/otp.service';
import { CustomermainService } from 'src/services/customermain/customermain.service';
import { SharedataService } from 'src/services/sharedata/sharedata.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
    @Output() closeModalEvent = new EventEmitter<void>();
    //-------------------------------------------------------------------//
    DataRegister: any = {}; // Đối tượng để lưu trữ dữ liệu nhập từ form
    Datalogin: any = {};
    errorMessagePhone:string ='';
    errorMessageEmail:string ='';
    errorConfirmPassword:string='';
    errorPassword:string='';
    passConfirmNull:boolean=false;
    eye:boolean=true;
    eyeConfirm:boolean=true;
    changeid:string='';
    reCaptchaVerifier!: any;
    checkresgiter:boolean=false;
    CheckStatusFormregister:boolean=false;
    constructor( private customermain:CustomermainService,
      private customer: CustomerService, private router: Router,private el: ElementRef,
      private renderer: Renderer2, private otpService: OtpService,
      private sharedata:SharedataService) {}
    isInputDisabled :boolean=true;
    isInputDisabledOpt:boolean=true;
    isInputDisabledphone:boolean=false;
    verificationId: string = '';

  sendOTP() {
   if(!CheckPhoneNumber(this.DataRegister.phone))
   {
    this.errorMessagePhone = 'Số điện thoại không chính xác!';
    }else
    {
     this.customermain.CustomerPhone(this.DataRegister.phone).subscribe(
       {
         next: (res) => {
          if(!this.CheckStatusFormregister)
          {
            this.errorMessagePhone='Số điên thoại đã được đăng ký'
          }
         },
         error: (err) => {
          console.log(err)
          this.checkresgiter=true;
         }
       }
     );
    }
    if(this.checkresgiter||this.CheckStatusFormregister)
    {
      const phone = this.DataRegister.phone.substring(1);
      this.otpService.sendOTP(`+84${phone}`).then((result) => {
        this.isInputDisabledOpt=false;
       this.errorMessagePhone="Kiễm tra tin nhắn để nhận mã otp"
        this.verificationId = result.verificationId;
      });
     }
  }
  verifyOTP(event:any) {
    const inputValue = event.target.value;
    if (inputValue.length === 6) {
      this.otpService.verifyOTP(this.verificationId,inputValue).then((user) => {
        event.target.value='';
        this.isInputDisabled=false;
        this.isInputDisabledphone=true;
        this.isInputDisabledOpt=true;
      }).catch((error) => {
        console.error('Mã Otp chưa đúng:', error);
      });
    }
  }
    closeModal(): void {
      this.closeModalEvent.emit();
    }
    dt: Customer[] = [];
    showPassword:boolean= false;
    showPasswordConfirm:boolean=false;
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
    togglePasswordConfirmVisibility()
    {
      this.showPasswordConfirm=!this.showPasswordConfirm;
    }
    eyeError()
    {
        this.errorPassword=kiemTraMucDoManhMatKhau(this.DataRegister.password)
    }
    eyeConfirmError()
    {
      if(this.DataRegister.confirmPassword!=null||this.DataRegister.confirmPassword!=""){
        this.passConfirmNull=false;
        this.eyeConfirm=true;
      }
    }
  // ------------------------------------------------------------------//
    register()
    {
      const formRegisterElement = this.el.nativeElement.querySelector('#formregister');
      const formLogin = this.el.nativeElement.querySelector('#formlogin');
    const datasignup = {
      id: this.DataRegister.phone,
      fullName: this.DataRegister.username,
      activated: true,
      password: this.DataRegister.password,
      phone: this.DataRegister.phone,
    };
    if(!(this.DataRegister.password==this.DataRegister.confirmPassword))
     {
       this.errorConfirmPassword='Mật khẩu không khớp!';
     }else
     {
      this.customer.signUp(datasignup)
      .subscribe({
        next:(res=>{
          console.log(res.message);
          this.DataRegister={};
          this.renderer.setStyle(formLogin, 'display', 'block');
          this.renderer.setStyle(formRegisterElement, 'display', 'none');
        }),
        error:(err=>{
          alert("Vui lòng nhập đúng thông tin ")
        })
      })
     }
    }
    // -------------------------------------------------------//
    login()
    {
      this.customer.signIn(this.Datalogin.phoneLogin,this.Datalogin.passLogin).subscribe(
        {
            next:(res=>{
              this.Datalogin={};
              this.router.navigate(['user']);
              this.closeModalEvent.emit();
            }),
            error:(err=>{
              alert(" Đăng nhập không thành công ")
            })
          }
      )
  }
  ChangPageForget()
  {
    this.CheckStatusFormregister=true;
    const formRegisterElement = this.el.nativeElement.querySelector('#formregister');
    const btnregister = this.el.nativeElement.querySelector('#btnregister');
    const name = this.el.nativeElement.querySelector('#name');
    const formLogin = this.el.nativeElement.querySelector('#formlogin');
    const btnforget = this.el.nativeElement.querySelector('#btnforget');
    this.renderer.setStyle(formLogin, 'display', 'none');
    this.renderer.setStyle(name, 'display', 'none');
    this.renderer.setStyle(formRegisterElement,'display', 'block');
    this.renderer.setStyle(btnregister,'display', 'none');
    this.renderer.setStyle(btnforget,'display', 'block');
  }
  Fogetpass()
  {
      const formRegisterElement = this.el.nativeElement.querySelector('#formregister');
      const formLogin = this.el.nativeElement.querySelector('#formlogin');
      this.customer.forgerPass(this.DataRegister.phone,this.DataRegister.password).subscribe({
        next:(res=>{
          this.DataRegister={};
          this.renderer.setStyle(formLogin, 'display', 'block');
          this.renderer.setStyle(formRegisterElement, 'display', 'none');
        }),
        error:(err=>{
          alert("Thay đổi mật khẩu không thành công ")
        })
      })
  }
    FormLoginRegister() {
      this.CheckStatusFormregister=false;
      const formRegisterElement = this.el.nativeElement.querySelector('#formregister');
      const formLogin = this.el.nativeElement.querySelector('#formlogin');
      const btnforget = this.el.nativeElement.querySelector('#btnforget');
      const formRegisterDisplay = window.getComputedStyle(formRegisterElement).display;
      const btnregister = this.el.nativeElement.querySelector('#btnregister');
      this.renderer.setStyle(btnregister,'display', 'block');
      this.renderer.setStyle(btnforget,'display', 'none');

      if (formRegisterDisplay === 'none') {
        this.renderer.setStyle(formRegisterElement,'display', 'block');
        this.renderer.setStyle(formLogin, 'display', 'none');
      } else {
        this.renderer.setStyle(formLogin, 'display', 'block');
        this.renderer.setStyle(formRegisterElement, 'display', 'none');
      }
    }
    JustNumber(event: any)
    {
      event.target.value = event.target.value.replace(/\D/g, '');
    }


  }

  //---------------------Tạo function--------------------------------//
  function CheckPhoneNumber(phone: string): boolean {
    const regex = /^(0|\+84)[1-9]\d{8}$/;
    return regex.test(phone);
  }
 function CheckFormatEmail(input: string): boolean {
   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(input);
  }


  function kiemTraMucDoManhMatKhau(matKhau: string): string {
    // Kiểm tra chiều dài
    if (matKhau.length < 8) {
      return 'Yếu';
    } else if (matKhau.length < 12) {
      return 'Trung bình';
    }
    // Kiểm tra ký tự đặc biệt
    const kyTuDacBiet = /[!@#$%^&*(),.?":{}|<>]/;
    if (!kyTuDacBiet.test(matKhau)) {
      return 'Trung bình';
    }

    // Kiểm tra chữ cái (chữ hoa và chữ thường)
    const coChuHoa = /[A-Z]/;
    const coChuThuong = /[a-z]/;
    if (!coChuHoa.test(matKhau) || !coChuThuong.test(matKhau)) {
      return 'Trung bình';
    }
    // Kiểm tra số
    const coSo = /\d/;
    if (!coSo.test(matKhau)) {
      return 'Trung bình';
    }
    // Nếu vượt qua tất cả các kiểm tra, mật khẩu được coi là mạnh
    return 'Mạnh';
  }

