import { Component, Input, EventEmitter, Renderer2, ElementRef} from '@angular/core';
import { Author } from 'src/interfaces/Author';
import { BooksService } from 'src/services/Books/books.service';
import { BookDetailsViewModel } from 'src/interfaces/fullbook';

@Component({
  selector: 'app-sach',
  templateUrl: './sach.component.html',
  styleUrls: ['./sach.component.css']
})
export class SachComponent {
  constructor(private BookAll :BooksService,private el: ElementRef,
    private renderer: Renderer2) {}
  sizepage=4
  page=1;
  book: any = {}
  Authors: Author[]=[];
  selectAllChecked = false; // Biến để theo dõi trạng thái chọn tất cả
  selectedBooks: any[] = []; // Mảng để lưu trữ trạng thái chọn của từng sách
  productful: BookDetailsViewModel [] = [];
  Books: BookDetailsViewModel [] = [];
  loadedBooksCount:number=0;
  bookAllNonePage:BookDetailsViewModel [] = [];
  idbookdelete:string=""
  ngOnInit()
  {
    this.LoadBookPage(1)
    this.LoadBook()
  }
  LoadBookPage(page:number)
  {
    this.BookAll.getBookHavePreView(page,this.sizepage).subscribe({
      next: (res) => {
        this.productful=res.data;
        this.loadedBooksCount=res.totalCount
      },
      error: (err) => {

      },
    });
  }

  LoadBook()
  {
    this.BookAll.getBookDetailImages().subscribe({
      next: (res) => {
        this.bookAllNonePage=res;
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
    // Filter books based on the search query
    this.searchResults = this.bookAllNonePage.filter(book =>
      book.title.toLowerCase().includes(searchTerm)
    );
  }
  assets: any;

  isDeleteModalVisible = false;
  // Hiển thị modal xác nhận xóa
  openDeleteModal(idbook:string) {
    this.idbookdelete=idbook;
    this.isDeleteModalVisible = true;
  }
  onPageChange(newPage: number): void {
    this.page = newPage;
     this.LoadBookPage(this.page);
  }
  // Đóng modal xác nhận xóa
  closeDeleteModal() {
    this.isDeleteModalVisible = false;
    if(!this.isDeleteModalVisible)
    {
      this.LoadBookPage(this.page);
    }
  }
}
