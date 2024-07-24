import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  private apiUrl = 'https://localhost:7009/api/Bills';

  constructor(private http: HttpClient) { }
  getbill() {
    return this.http.get<any>(`${this.apiUrl}/orderNotSuccess`)
  }
  getBillStatus(customerId: string, status: string): Observable<any> {
    const url = `${this.apiUrl}/customer/${customerId}/status/${encodeURIComponent(status)}`;
    return this.http.get<any>(url);
  }
  getbillSuccess() {
    return this.http.get<any>(`${this.apiUrl}/orderSuccess`)
  }
  postBill(bill: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, bill, { headers: headers });
  }
  updateBillStatus(billId: string, status: string) {
    const url = `${this.apiUrl}/${encodeURIComponent(billId)}/${encodeURIComponent(status)}`;
    const body = { status: status };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url, body ,{ headers: headers })
  }
  updateBillStatusPayment(billId: string, statuspayment:string) {
    const url = `${this.apiUrl}/update/${encodeURIComponent(billId)}/${encodeURIComponent(statuspayment)}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url,{ headers: headers })
  }
  getdetailsbill(billId: string) {
    const url = `${this.apiUrl}/withorderbill/${encodeURIComponent(billId)}`;
    return this.http.get(url)
  }
}
