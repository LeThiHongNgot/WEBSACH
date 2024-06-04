import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { BookDetail } from 'src/interfaces/bookdetail';


@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {

  private baseUrl: string = 'https://localhost:7009/api/';
  constructor(private http: HttpClient, private router: Router) {
   }
  BookDetail() {
    return this.http.get< BookDetail[]>(`${this.baseUrl}Bookdetails`)
  }
   // Lấy sách theo id
   BookDetailId(id: string) {
    return this.http.get<any>(`${this.baseUrl}Bookdetails/${id}`);
  }


  // Thêm mới sách
  addBookDetail(book: any){
    return this.http.post<BookDetail>(`${this.baseUrl}Bookdetails`, book);
  }

  // Xóa sách theo id
  deleteBookDetailId(id: string) {
    return this.http.delete<any>(`${this.baseUrl}Bookdetails/${id}`);
  }

  // Cập nhật thông tin sách
  updateBookDetail(book: any) {
    return this.http.put<any>(`${this.baseUrl}Bookdetails/${book.id}`, book);
  }
}
