import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { bookimg } from 'src/interfaces/bookimg';
@Injectable({
  providedIn: 'root'
})
export class BookImgsService {

  private baseUrl: string = 'https://localhost:7009/api/';
  constructor(private http: HttpClient, private router: Router) {
   }
  BookImg() {
    return this.http.get<any>(`${this.baseUrl}Bookimgs`)
  }
  BookImgId(id: string) {
    return this.http.get<any>(`${this.baseUrl}Bookimgs/${id}`);
  }
  addimage(book: any) {
    return this.http.post<bookimg>(`${this.baseUrl}Bookimgs`, book);
  }
}
