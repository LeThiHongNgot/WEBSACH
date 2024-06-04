import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Order } from 'src/interfaces/Orders';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl: string = 'https://localhost:7009/api/';
  constructor(private http: HttpClient, private router: Router) {
   }

   updateOrderStatus(customerId: string, description: string) {
    const encodedDescription = encodeURIComponent(description);
    const url = `${this.baseUrl}Orders/update-status/${customerId}/${encodedDescription}`;
    return this.http.put<any>(url, null);
  }

   getOrdersByCustomerIdAndTimestamp(customerId: string, times: string) {
    const url = `${this.baseUrl}Orders/History/${customerId}/${times}`;

    console.log(url);
    return this.http.get<any[]>(url);

  }
   getOrders(status:number) {
    return this.http.get<any[]>(`${this.baseUrl}Orders?status=${status}`)
  }
  postOrder(order:any) {
    return this.http.post(`${this.baseUrl}Orders`, order);
  }
  getHistoryOrders(id :string) {
    return this.http.get<any[]>(`${this.baseUrl}Orders/History/${id}`)
  }
}
