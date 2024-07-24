import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = 'https://localhost:7009/api/';

  constructor(private http: HttpClient, private router: Router) {
  }
  sendEmail(toEmail: string, username: string, password: string) {
    const emailData = {
      fromEmail: 'lehongngot17102003@gmail.com',
      toEmail: toEmail,
      subject: 'Your Account Details',
      body: `
          <p>Hi there,</p>
          <p>Here are your account details:</p>
          <p><strong>Username:</strong> <span style="color: blue;">${username}</span></p>
          <p><strong>Password:</strong> <span style="color: red;">${password}</span></p>
          <p>Please keep this information safe and secure.</p>
          <p>Best regards,<br>Your Company BookStore2N</p>
      `,
      isBodyHtml: true
    };

    return this.http.post(`${this.baseUrl}Users/send`, emailData);
  }
  sendOtpEmail(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}Users/sendOtp`, { fromEmail: 'lehongngot17102003@gmail.com', toEmail: email, subject: 'Your OTP Code', body: '' });
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.baseUrl}Users/verify`, { email, otp });
  }
  Users() {
    return this.http.get<any>(`${this.baseUrl}Users`)
  }
  PostUser(User: any) {
    return this.http.post<any>(`${this.baseUrl}Users`, User)
  }
  updatePassword(email: string, newPassword: string): Observable<any> {
    const url = `${this.baseUrl}Users/updatePassword`;
    const requestBody = { Email: email, NewPassword: newPassword };
    return this.http.put<any>(url, requestBody);
  }

  DeleteUser(id: any) {
    return this.http.delete<any>(`${this.baseUrl}Users/${id}`)
  }
  signIn(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}Users/signin/${email}/${password}`;
    return this.http.post<any>(url, {}).pipe(
      map(response => {
        // Save the token to localStorage
        localStorage.setItem('user_token', response.token);
        localStorage.setItem('role', response.role);

        return response;
      })
    );
  }
}
