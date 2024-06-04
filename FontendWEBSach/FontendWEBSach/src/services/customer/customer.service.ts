import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl: string = 'https://localhost:7009/api/Login/';
  userInfo = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient, private router: Router,) {
   }
   forgerPass(phone: number, pass: string) {
    return this.http.put(`${this.baseUrl}updatePassword/${phone}/${pass}`, {});
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}signup`, userObj)
  }

  signIn(phone: string, password: string): Observable<any> {
    const url = `${this.baseUrl}signin/${phone}/${password}`;
    return this.http.post<any>(url, {}).pipe(
      map(response => {
        // Save the token to localStorage
        localStorage.setItem('access_token', response.token);

        // Save additional data to localStorage
        localStorage.setItem('stage', response.stage);

        // Return the response for further processing if needed
        return response;
      })
    );
  }
  update(id: string, data: any) {
    return this.http.put<any>(`${this.baseUrl}update/${id}`, data);
  }
  updatepass(phone: string, password: string): Observable<any> {
    const apiUrl = `${this.baseUrl}VerifyPassword/${phone}/${password}`;
    return this.http.get<any>(apiUrl);
  }
  getClaimValue(): string | '' {
    const token = localStorage.getItem('access_token');
   const claimName = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    if (token) {
      try {
        // Giải mã token
        const decodedToken = this.jwtHelper.decodeToken(token);
        // Lấy giá trị của claimName
        const claimValue = decodedToken[claimName];

        return claimValue;
      } catch (error) {
        console.error('Error decoding token:', error);
        return '';
      }
    } else {
      console.warn('Token not found.');
      return '';
    }
  }
}
