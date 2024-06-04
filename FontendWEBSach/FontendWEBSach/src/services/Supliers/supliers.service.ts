import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SupliersService {

  private baseUrl: string = 'https://localhost:7009/api/';

  constructor(private http: HttpClient, private router: Router) {}

  // Get a list of suppliers
  Suppliers() {
    return this.http.get<any>(`${this.baseUrl}Suppliers`);
  }

  // Get details of a specific supplier by ID
  SupplierId(id: string) {
    return this.http.get<any>(`${this.baseUrl}Suppliers/${id}`);
  }

  // Add a new supplier
  addSupplier(supplier: any) {
    return this.http.post<any>(`${this.baseUrl}Suppliers`, supplier);
  }

  // Delete a supplier by ID
  deleteSupplierId(id: string) {
    return this.http.delete<any>(`${this.baseUrl}Suppliers/${id}`);
  }
  // Update information of an existing supplier
  updateSupplier(supplier: any) {
    return this.http.put<any>(`${this.baseUrl}Suppliers/${supplier.id}`, supplier);
  }

}
