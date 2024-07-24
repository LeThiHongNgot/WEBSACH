import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  private baseUrl: string = 'https://localhost:7009/api/';

  constructor(private http: HttpClient, private router: Router) {
  }

  Vouchers() {
    return this.http.get<any>(`${this.baseUrl}Vouchers`)
  }
  VouchersParam(params: any): Observable<any> {
    // Assuming your API endpoint structure
    return this.http.get<any>(`${this.baseUrl}Vouchers/${params}`);
  }
  addVoucher(voucher: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Vouchers`, voucher);
  }
  PostVoucher(voucher: any) {
    return this.http.post<any>(`${this.baseUrl}Vouchers`, voucher)
  }
  PutVoucher(id:string,voucher: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}Vouchers/${id}`, voucher)
  }
  DeleteVoucher(voucherId: string) {
    return this.http.delete<any>(`${this.baseUrl}Vouchers/${voucherId}`)
  }

  
}
