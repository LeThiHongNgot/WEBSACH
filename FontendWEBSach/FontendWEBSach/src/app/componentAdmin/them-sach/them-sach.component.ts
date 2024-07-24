import { Component } from '@angular/core';
import { Author } from 'src/interfaces/Author';
import { Category } from 'src/interfaces/Category';
import { Supplier } from 'src/interfaces/Supplier';
import { AuthorsService } from 'src/services/Authors/authors.service';
import { CategoriesService } from 'src/services/Categories/categories.service';
import { SupliersService } from 'src/services/Supliers/supliers.service';
import { BooksService } from 'src/services/Books/books.service';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-them-sach',
  templateUrl: './them-sach.component.html',
  styleUrls: ['./them-sach.component.css'],
})
export class ThemSachComponent {
  constructor(private authors: AuthorsService,
    private categories: CategoriesService,
    private suppliers: SupliersService,
    private booksservice: BooksService,
    public dialog: MatDialog,
    private route: ActivatedRoute

  ) { }
  Authors: Author[] = [];
  Categories: Category[] = [];
  Suppliers: Supplier[] = [];
  Books: any = {}
  selectedAuthor: any = {};
  selectedCategory: any = {};
  selectedSupplier: any = {};
  BookDataForm: any = {};
  BookCount: any;
  checkdetail: boolean = false;
  checkimge: boolean = false;
  userImageSrc!: string;
  selectedFiles: File[] = [];
  productId: string | null = null;
  idAuthorDelete: string = "";
  idCategoryDelete: string = "";
  idSupplierDelete: string = "";

  ngOnInit() {
    this.loadCategories();
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('bookId');
      if (this.productId) {
        this.booksservice.getBookDetailsWithImagesid(this.productId).subscribe({
          next: (res) => {
            this.Books = res;
            this.selectedAuthor = res.authorId
            this.selectedSupplier = res.supplierid
            this.selectedCategory = res.catergoryID
          },
          error: (err) => {
            console.error('Error fetching data', err);
          }
        });
      }
    });


    this.authors.Authors().subscribe({
      next: (res) => {
        this.Authors = res
        console.log(res)
      },
      error: (err) => {
        console.error('Lỗi lấy dữ liệu ', err)
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
        this.BookCount = 'B' + (res * 1 + 1 * 1);
      },
      error: err => {
        console.log('Lỗi lấy dữ liệu: ', err);
      }
    });

  }
  loadCategories(){
    this.categories.Categories().subscribe({
      next: (res: any) => {
        this.Categories = res; 
      },
      error: (err) => {
        console.error('Lỗi lấy dữ liệu', err);
      }
    });
  }
  //chọn sách
  onFileSelect(event: any, index: number): void {
    this.selectedFiles[index] = event.target.files[0];
  }

  onSave() {
    const formData = new FormData();
      formData.append('id', "");
      formData.append('title', this.Books.title || "");
      formData.append('authorId', this.selectedAuthor || "");
      formData.append('supplierId', this.selectedSupplier || "");
      formData.append('unitPrice', this.Books.unitPrice || 0);
      formData.append('pricePercent', this.Books.pricepercent || 0);
      formData.append('publishYear', this.Books.yearSX || 0);
      formData.append('available', 'true');
      formData.append('quantity', this.Books.quantity || 0);
      formData.append('catergoryID', this.selectedCategory || "");
      formData.append('dimensions', this.Books.dimensions || "");
      formData.append('pages', this.Books.pages || 0);
      formData.append('description', this.Books.description || "");
    // Append images if selectedFiles contains file objects
      if (this.selectedFiles && this.selectedFiles.length > 0) {
        for (let i = 1; i <= 4; i++) {
          if (this.selectedFiles[i]) {
            formData.append(`image${i - 1}`, this.selectedFiles[i]);
          }
        }
      }
    if (this.productId) {
      formData.append('id', this.productId);
      this.booksservice.updateBook(formData).subscribe({
        next: (res) => {
          alert("Thêm thành công");
        },
        error: (err) => {
          console.error('Lỗi thêm vào', err);
        },
      });
      console.log(formData);
    } else {

      this.booksservice.postBook(formData).subscribe({
        next: (res) => {
          alert("Thêm thành công");
        },
        error: (err) => {
          console.error('Lỗi thêm vào', err);
        },
      });
    }
    
  }

  isDeleteModal = false;
  isEditModal = false;
  isAddCategoryModal = false;
  idDelete: any;
  isAddAuthorModal = false;
  isAddSuplierModal = false;
  isDeleteModalVisible = false;
  // Hiển thị modal add
  openAddCategoryModal() {
    this.isAddCategoryModal = true;
  }

  // Đóng modal add
  closeAddtCategoryModal() {
    this.isAddCategoryModal = false;
  }

  // Hiển thị modal add
  openAddAuthorModal() {
    this.isAddAuthorModal = true;
  }

  // Đóng modal add author
  closeAddAuthorModal() {
    this.isAddAuthorModal = false;
  }

  openAddSuplierModal() {
    this.isAddSuplierModal = true;
  }

  // Đóng modal add
  closeAddSuplierModal() {
    this.isAddSuplierModal = false;
  }

  // Hiển thị modal xác nhận xóa
  openDeleteModal(event: MouseEvent, id: any, select: MatSelect, entityType: string) {
    event.preventDefault();
    switch (entityType) {
      case 'author':
        this.idAuthorDelete = id;
        break;
      case 'category':
        this.idCategoryDelete = id;
        break;
      case 'supplier':
        this.idSupplierDelete = id;
        break;
      default:
        break;
    }
    this.isDeleteModal = true;
    select.close();
  }
  

  // Đóng modal xác nhận xóa
  closeDeleteModal() {
    this.isDeleteModal = false;
  }
}





