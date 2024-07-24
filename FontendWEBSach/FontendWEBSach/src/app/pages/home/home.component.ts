import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { bookhome } from '../../../interfaces/bookhome';
import { Router } from '@angular/router';
import { bookimg } from '../../../interfaces/bookimg';
import { Author } from '../../../interfaces/Author';
import { BooksService } from 'src/services/Books/books.service';
import { BookImgsService } from 'src/services/BookImgs/bookimgs.service';
import { AuthorsService } from 'src/services/Authors/authors.service';
import { BookDetailsViewModel } from 'src/interfaces/fullbook';
import { forkJoin, Observable, of } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images =
    [
      'assets/banner/vuidentruong.jpg',
      'assets/banner/childrenbook.jpg',
      'assets/banner/manga.jpg',
    ]
  constructor(private http: HttpClient, private router: Router, private bookImgs: BookImgsService, private books: BooksService,
    private authors: AuthorsService) { }
  Books: bookhome[] = [];
  img: bookimg[] = [];
  author: Author | null = null;
  pageSize = 10;
  page = 1;
  bookfull: BookDetailsViewModel[] = [];
  booksuggest: BookDetailsViewModel[] = [];
  lenghtBook: number = 0;
  loadedBooksCount: number = 0;
  ngOnInit() {
    this.getProductDetailsoutstanding(this.page, this.pageSize)

    this.getProductsuggest()
    console.log(this.lenghtBook)
  }
  getProductDetailsoutstanding(page: number, pageSize: number): void {
    this.books.getBookoutstanding(page, pageSize).subscribe({
      next: (res) => {
        this.bookfull = res.data
        this.lenghtBook = res.totalCount
      },
      error: (err) => {
      },
    });
  }
  getProductsuggest(): void {
    this.books.getBookHavePreView(1, 5).subscribe({
      next: (res) => {
        this.booksuggest = res.data
      },
      error: (err) => {
      },
    });
  }

  getBookImage(bookId: string): string {
    const matchingImage = this.img.find((img) => img.bookId === bookId);
    return matchingImage ? matchingImage.image0 : ''; // Return the image URL if found, otherwise an empty string
  }

  //-------------------------------thay đôi số page khi chuyển trang
  onPageChange(newPage: number): void {
    this.page = newPage;
    this.getProductDetailsoutstanding(this.page, this.pageSize)
  }

}
