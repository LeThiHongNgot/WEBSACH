import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ProductView} from 'src/interfaces/ProductView';
import {ProductReviewBookid} from 'src/interfaces/ProductView';
import { Observable } from 'rxjs';
import {ProductReviewDTO} from 'src/interfaces/ProductView';
@Injectable({
  providedIn: 'root'
})
export class ProductViewService {

  private apiUrl = 'https://localhost:7009/api/ProductReviews';

  constructor(private http: HttpClient) {}


  getProductReviews(page:number|null,pageSize:number|null): Observable<ProductReviewDTO[]> {
    const url = `${this.apiUrl}?page=${page}&pageSize=${pageSize}`
    return this.http.get<ProductReviewDTO[]>(url);
  }
  getAllProductReviews(): Observable<ProductReviewDTO[]> {
    const url = `${this.apiUrl}`
    return this.http.get<ProductReviewDTO[]>(url);
  }
  getProductReviewByBookId(id: string): Observable<ProductReviewBookid[]> {
    const url = `${this.apiUrl}/books/${id}`;
    return this.http.get<ProductReviewBookid[]>(url);
  }

  getProductReviewRatingBookId(id: string) {
    const url = `${this.apiUrl}/books/${id}/ratings`;
    return this.http.get<any>(url);
  }

  getProductReviewaAveragBookId(id: string) {
    const url = `${this.apiUrl}/books/averag/${id}`;
    return this.http.get<any>(url);
  }

  addProductReview(productReview: any): Observable<ProductView> {
    return this.http.post<ProductView>(this.apiUrl, productReview);
  }

  // PUT (update) an existing product review
  updateProductReview(id: string, productReview: ProductView): Observable<ProductView> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<ProductView>(url, productReview);
  }
  // DELETE a product review by ID
  deleteProductReview(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
