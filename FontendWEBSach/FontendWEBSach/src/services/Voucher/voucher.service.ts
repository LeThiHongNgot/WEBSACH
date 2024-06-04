import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
  PostVoucher(voucher: any) {
    return this.http.post<any>(`${this.baseUrl}Vouchers`, voucher)
  }
  PutVoucher(voucher: any) {
    return this.http.put<any>(`${this.baseUrl}Vouchers/${voucher.id}`, voucher)
  }
  DeleteVoucher(id: any) {
    return this.http.delete<any>(`${this.baseUrl}Vouchers/${id}`)
  }
}
