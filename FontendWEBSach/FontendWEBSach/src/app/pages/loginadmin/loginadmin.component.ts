import { Component } from '@angular/core';
import { UsersService } from 'src/services/Users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent {

  constructor(private usersService:UsersService,
              private router:Router,

  )
  {

  }
  message: string = '';
  DataLogin:any={}
  DataForget:any={}
  otpSent: boolean = true;
  otp: string[] = new Array(6).fill('');
  newPassword: string = '';
  confirmPassword: string = '';
  otpVerified: boolean = false;
  login()
  {
    this.usersService.signIn(this.DataLogin.email,this.DataLogin.password).subscribe(
      { next: (res) => {
        this.router.navigate(['books']);
      },
      error: (err) => {
        console.log("Đăng nhập không thành công",err)
      }
      }
    )
  }

  onOtpInput(event: any, nextInputId: string): void {
    const currentInput = event.target;
    const value = currentInput.value;

    if (value.length === 1) {
      // Move focus to next input
      const nextInput = document.querySelector(`#${nextInputId}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  sendOtp(): void {
    this.usersService.sendOtpEmail(this.DataForget.email).subscribe({
      next: (response) => {
        this.message = `OTP email sent successfully.`;
        this.otpSent = true;
      },
      error: (err) => {
        console.error('Error sending OTP email:', err);
        this.message = 'Error sending OTP email';
      }
    });
  }

  verifyOtp(): void {
    if (this.otp.join('').length === 6) { // Join otp array to make a single string
      const otpString = this.otp.join('');
      this.usersService.verifyOtp(this.DataForget.email, otpString).subscribe({
        next: () => {
          this.message = 'OTP verified successfully';
          this.otpSent = false; // Hide OTP input fields
          this.otpVerified = true; // Show password input fields
        },
        error: (err) => {
          console.error('Error verifying OTP:', err);
          this.message = 'Invalid OTP';
        }
      });
    }
  }
  onOtpChange(): void {
    if (this.otp.length === 6) {
      this.verifyOtp();
    }
  }
  resetPassword(): void {
    if (this.newPassword === this.confirmPassword) {
      this.usersService.updatePassword(this.DataForget.email,this.newPassword).subscribe({
        next: () => {
          this.message = 'Password reset successfully';
        },
        error: (err) => {
          console.error('Error verifying OTP:', err);

        }
      });

    } else {
      this.message = 'Passwords do not match';
    }
  }
}
