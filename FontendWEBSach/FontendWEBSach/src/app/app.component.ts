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

 
}