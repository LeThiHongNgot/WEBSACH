import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = 'https://localhost:7009/api/';

  constructor(private http: HttpClient, private router: Router) {
  }

  Users() {
    return this.http.get<any>(`${this.baseUrl}Users`)
  }
  PostUser(User: any) {
    return this.http.post<any>(`${this.baseUrl}Users`, User)
  }
  PutUser(User: any) {
    return this.http.put<any>(`${this.baseUrl}Users/${User.id}`, User)
  }
  DeleteUser(id: any) {
    return this.http.delete<any>(`${this.baseUrl}Users/${id}`)
  }
}
