
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseUrl: string = 'https://localhost:7009/api/';

  constructor(private http: HttpClient) { }

  uploadImage(vals: any): Observable<any>{
    let data = vals;
    return this.http.post("https://api.cloudinary.com/v1_1/dpk9xllkq/image/upload", data)
  }
  uploadImage2(vals: any) {
    return this.http.post<any>(`${this.baseUrl}ImageUpload`, vals)
  }
}
