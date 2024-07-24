import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private baseUrl: string = 'https://localhost:7009/api/';
  constructor(private http: HttpClient, private router: Router) {
   }
  Authors() {
    return this.http.get<any>(`${this.baseUrl}Authors`)
  }
  
  AddAuthor(authorData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Authors`, authorData);
  }

  deleteAuthorById(authorId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}Authors/${authorId}`);
  }

}
