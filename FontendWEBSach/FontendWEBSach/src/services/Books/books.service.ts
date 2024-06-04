import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import {BookDetailsViewModel} from 'src/interfaces/fullbook';
import { Observable } from 'rxjs';
import { bookhome } from 'src/interfaces/bookhome';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private baseUrl: string = 'https://localhost:7009/api/';

  constructor(private http: HttpClient, private router: Router) {
  }
//get 3 bảng book theo thể loại
  getBookdetailsByCategory(categoryId: string, page: number | null = null, pageSize: number | null = null) {
    const url = `${this.baseUrl}Books/details/books?page=${page}&pageSize=${pageSize}&categoryId=${categoryId}`;
    return this.http.get<any>(url);
  }
  //get theo id 3 bảng book
  getBookDetailsWithImagesid(bookId: string) {
    const url = `${this.baseUrl}Books/details/images/${bookId}`;
    return this.http.get<BookDetailsViewModel>(url);
  }
  //get gop 3 bảng book lại với nhau
  getBookDetailImages() {
    const url = `${this.baseUrl}Books/details/images`;
    return this.http.get<BookDetailsViewModel[]>(url);
  }
  // get những sách có số sao là 5
  getBookoutstanding(page: number | null = null, pageSize: number | null = null):Observable<any>  {
    const url = `${this.baseUrl}ProductReviews/outstanding?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  //get tất cả sách và lượng sao được preview
  getBookHavePreView(page: number | null = null, pageSize: number | null = null):Observable<any>  {
    const url = `${this.baseUrl}ProductReviews/GetBookReview?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  // gọi bảng book
  Books() {
    return this.http.get<any>(`${this.baseUrl}Books`)
  }
  // gọi theo id bảng book
  BooksId(id: string) {
    return this.http.get<any>(`${this.baseUrl}Books/${id}`);
  }
  // Thêm mới sách

  postBook(bookData: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7009/api/Books`, bookData);
  }
  // Xóa sách theo id
  deleteBookById(id: string){
    return this.http.delete<any>(`${this.baseUrl}Bookdetails/${id}`);
  }

  // Cập nhật thông tin sách
  updateBook(book: any) {
    return this.http.put<any>(`${this.baseUrl}Bookdetails/${book.id}`, book);
  }

  countBook() {
    return this.http.get<any>(`${this.baseUrl}Books/count`);
  }
}
