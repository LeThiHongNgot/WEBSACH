import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CustomermainService {

  private baseUrl: string = 'https://localhost:7009/api/';
  constructor(private http: HttpClient, private router: Router) {
   }
   updateCustomerPhoto(id: string, photoBase64: string | null) {
    if (photoBase64 !== null) {
        // Convert base64 string to Blob
        const byteCharacters = atob(photoBase64);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: 'image/png' });

        // Append the Blob to FormData
        const formData = new FormData();
        formData.append('image', blob, 'customer_photo.png');

        // Construct the URL for the specific customer
        const customerUrl = `${this.baseUrl}/${id}`;

        // Send a PUT request to update the customer photo
        return this.http.put(customerUrl, formData);
    } else {
        // Handle the case where photoBase64 is null
        return /* Your response for null case, possibly an Observable with an error */;
    }
}

   Customers() {
    return this.http.get<any[]>(`${this.baseUrl}Customers`)
  }
  CustomersId(id: string) {
    return this.http.get<any>(`${this.baseUrl}Customers/GetCustomerId${id}`)
  }
  CustomerPhone(phone: string)
  {
    return this.http.get<any>(`${this.baseUrl}Customers/GetCustomerId${phone}`)
  }
  createCustomer(customerData: any){
    return this.http.post(`${this.baseUrl}Customers`, customerData)
  }
  updateCustomer(id: string, updatedData: any){
    console.log(this.http.put(`${this.baseUrl}Customers/${id}`, updatedData))
    return this.http.put(`${this.baseUrl}Customers/${id}`, updatedData)

  }
  deleteCustomer(id: string) {
    return this.http.delete(`${this.baseUrl}Customers/${id}`)
  }
}
