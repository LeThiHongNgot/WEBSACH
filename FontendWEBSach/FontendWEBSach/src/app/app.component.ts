import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { bookhome } from 'src/interfaces/bookhome';
import { bookimg } from 'src/interfaces/bookimg';
import { Author } from 'src/interfaces/Author';
import { Category } from 'src/interfaces/Category';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  product: any = {}
  title = 'WebQuanLyCuaHangSach';
  constructor(private http: HttpClient, private router: Router) {}
  data: bookhome[] = [];
  bookImage: bookimg[]=[];
  author:Author |null=null;
  filteredProducts: bookhome[] = [];
  categories: Category[] = [];

  ngOnInit() {
    // Make a GET request to fetch book data
    this.http.get<bookhome[]>('https://localhost:7009/api/Books').subscribe({
      next: response => {

          this.data = response;

      },
      error: error => {
        console.error('Lỗi xảy ra khi lấy dữ liệu sách', error);
      }
    });
    this.http.get<bookimg[]>(`https://localhost:7009/api/Bookimgs?`).subscribe(
      {
        next: response => {
          // Store the image in the bookImage object with the book ID as the key
          if (response) {
            this.bookImage = response;
          }
        },
        error: error => {
          console.error('Lỗi xảy ra khi lấy dữ liệu hình ảnh', error);
        }
      });
    this.http.get<Category[]>(`https://localhost:7009/api/Categories?`).subscribe(
      {
        next: response => {
          if(response) {
            this.categories = response;
          }
        },
        error: error => {
          console.error('Lỗi xảy ra khi lấy dữ liệu thể loại', error);
        }
      });
  }

 


}
