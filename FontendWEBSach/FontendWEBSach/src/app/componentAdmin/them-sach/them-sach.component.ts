import { Component } from '@angular/core';
import { Author } from 'src/interfaces/Author';
import { Category } from 'src/interfaces/Category';
import { Supplier } from 'src/interfaces/Supplier';
import { AuthorsService } from 'src/services/Authors/authors.service';
import { CategoriesService } from 'src/services/Categories/categories.service';
import { SupliersService } from 'src/services/Supliers/supliers.service';
import { BooksService } from 'src/services/Books/books.service';
import { bookhome } from 'src/interfaces/bookhome';
import { BookDetailsService } from 'src/services/BookDetails/bookdetails.service';
import { BookImgsService } from 'src/services/BookImgs/bookimgs.service';
import { BookDetail} from  'src/interfaces/bookdetail';
import { bookimg } from 'src/interfaces/bookimg';
// Import the CloudinaryModule.
import {CloudinaryModule} from '@cloudinary/ng';

// Import the Cloudinary classes.
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen'
@Component({
  selector: 'app-them-sach',
  templateUrl: './them-sach.component.html',
  styleUrls: ['./them-sach.component.css'],
})
export class ThemSachComponent {
  constructor(private authors: AuthorsService, private categories: CategoriesService,
     private suppliers: SupliersService, private booksservice:BooksService
     ,private bookimgservice:BookImgsService,private bookDetailservice:BookDetailsService) {}
  Authors: Author[]=[];
  Categories: Category[]=[];
  Suppliers: Supplier[]=[];
  Books:any = {}
  BookDetail:any = {}
  BookImg:any = {}
  selectedAuthor: any = {};
  selectedCategory: any = {};
  selectedSupplier: any = {};
  BookDataForm: any = {};
  BookCount: any;
  checkdetail:boolean=false;
  checkimge:boolean=false;
  img!: CloudinaryImage;
  publicIdPost!: string;
  imgFromUser!: CloudinaryImage;
  cloudName = "dpk9xllkq";
  uploadPreset = "Angular_Products";
  userImageSrc!: string;
  file!: File | null;
  ngOnInit()
  {
    this.authors.Authors().subscribe({
      next: (res) => {
        this.Authors = res
      },
      error: (err) => {
        console.error('Lỗi lấy dữ liệu ', err)
      }
    });
    this.categories.Categories().subscribe({
      next: (res) => {
          this.Categories = res;
      },
      error: (err) => {
          console.error('Lỗi lấy dữ liệu ', err);
      }
    });
    this.suppliers.Suppliers().subscribe({
      next: (res) => {
        this.Suppliers = res
      },
      error: (err) => {
        console.error('Lỗi lấy dữ liệu ', err)
      }
    });
    this.booksservice.countBook().subscribe({
      next: res => {
        this.BookCount = 'B'+(res*1+1*1);
      },
      error: err => {
        console.log('Lỗi lấy dữ liệu: ', err);
      }
    });
    const cld = new Cloudinary({cloud: {cloudName: 'ddlsouigc'}});
  }

  async onSelect(event: any): Promise<void> {
    const inputFile = event.target as HTMLInputElement;
    const bookId = "20003"; // Assuming you have the book ID stored somewhere

    if (inputFile && inputFile.files && inputFile.files.length > 0) {
        const files: FileList = inputFile.files;
        const data = new FormData();
        // Append all selected files to FormData
        for (let i = 0; i < files.length; i++) {
            data.append('files[]', files[i]);
        }
        // Append book ID, upload preset, and cloud name
        data.append('bookId', bookId);
        data.append('upload_preset', 'Angular_Products');
        data.append('cloud_name', 'dpk9xllkq');

        // Upload images and handle response

    }
}



}
