import { Component, Input, EventEmitter, Renderer2, ElementRef } from '@angular/core';
import { Author } from 'src/interfaces/Author';
import { BooksService } from 'src/services/Books/books.service';
import { BookDetailsViewModel } from 'src/interfaces/fullbook';
import { CloudConfig, Cloudinary, CloudinaryImage, URLConfig } from '@cloudinary/url-gen';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sach',
  templateUrl: './sach.component.html',
  styleUrls: ['./sach.component.css']
})
export class SachComponent {
  constructor(private BookAll: BooksService,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2) { }
  sizepage = 4;
  page = 1;
  book: any = {}
  Authors: Author[] = [];
  selectedBooks: any[] = [];
  productful: BookDetailsViewModel[] = [];
  Books: BookDetailsViewModel[] = [];
  loadedBooksCount: number = 0;
  bookAllNonePage: BookDetailsViewModel[] = [];
  idbookdelete: string = "";
  cloudinaryImages: CloudinaryImage[] = [];
  normalImages: string[] = [];
  ngOnInit() {
    this.LoadBookPage(1)
    this.LoadBook()
  }
  LoadBookPage(page: number) {
    this.BookAll.getBookHavePreView(page, this.sizepage).subscribe({
      next: (res) => {
        this.productful = res.data;
        this.loadedBooksCount = res.totalCount;
      },
      error: (err) => {
        console.error('Error loading book previews', err);
      },
    });
  }

  LoadBook() {
    this.BookAll.getBookDetailImages().subscribe({
      next: (res) => {
        this.bookAllNonePage = res;

      },
      error: (err) => {
      },
    });
  }
  searchResults: any[] = [];
  loadpro(title: string) {
    const search = this.el.nativeElement.querySelector('#search');
    const begin = this.el.nativeElement.querySelector('#begin');
    this.renderer.setStyle(begin, 'display', 'none');
    this.renderer.setStyle(search, 'display', 'block');
    if (!title) {
      this.searchResults = this.bookAllNonePage;
      this.renderer.setStyle(begin, 'display', 'block');
      this.renderer.setStyle(search, 'display', 'none');
      return;
    }
    // Convert the search query to lowercase for case-insensitive search
    const searchTerm = title.toLowerCase();
    this.searchResults = this.bookAllNonePage.filter(book =>
      book.title.toLowerCase().includes(searchTerm)
    );
  }

  editBook(bookId: string, productName: string) {
    const sanitizedProductName = productName.replace(/\s+/g, '-');
    this.router.navigate(['them-sach', bookId])
  }
  assets: any;

  isDeleteModalVisible = false;
  // Hiển thị modal xác nhận xóa
  openDeleteModal(idbook: string) {
    this.idbookdelete = idbook;
    this.isDeleteModalVisible = true;
  }
  onPageChange(newPage: number): void {
    this.page = newPage;
    this.LoadBookPage(this.page);
  }
  // Đóng modal xác nhận xóa
  closeDeleteModal() {
    this.isDeleteModalVisible = false;
    if (!this.isDeleteModalVisible) {
      this.LoadBookPage(this.page);
    }
  }
}
