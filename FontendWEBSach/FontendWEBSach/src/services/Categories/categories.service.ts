import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl: string = 'https://localhost:7009/api/';
  constructor(private http: HttpClient, private router: Router) {
   }
  Categories() {
    return this.http.get<any>(`${this.baseUrl}Categories`)
  }
   // GET category by ID
  CategoryId(id: string) {
    return this.http.get<any>(`${this.baseUrl}Categories/${id}`)

  }

  createCategory(categoryData: any) {
    return this.http.post(`${this.baseUrl}Categories`, categoryData)

  }

  updateCategory(id: string, updatedData: any){
    return this.http.put(`${this.baseUrl}Categories/${id}`, updatedData)

  }

  // DELETE category
  deleteCategory(id: string) {
    return this.http.delete(`${this.baseUrl}Categories/${id}`)
  }
}
