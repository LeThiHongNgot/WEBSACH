import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { bookhome } from 'src/interfaces/bookhome';
import { bookimg } from 'src/interfaces/bookimg';
import { Router } from '@angular/router';
import { Author } from 'src/interfaces/Author';
import { Category } from 'src/interfaces/Category';
import { SharedataService } from 'src/services/sharedata/sharedata.service';
import { CustomerService } from 'src/services/customer/customer.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  idcustomer:string |null=null;
  product: any = {}
  constructor(private http: HttpClient, private router: Router, private sharedata:SharedataService,private customer:CustomerService) {}
  data: bookhome[] = [];
  bookImage: bookimg[]=[];
  author:Author |null=null;
  filteredProducts: bookhome[] = [];
  categories: Category[] = [];

  ngOnInit() {
    // Make a GET request to fetch book data
    this.http.get<bookhome[]>('https://localhost:7009/api/Books').subscribe({
      next: response => {
        if(response) {
          this.data = response;
        }
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

  statusLogin()
  {
    this.idcustomer=this.customer.getClaimValue();
    // Lấy token từ Local Storage
    const token = localStorage.getItem('access_token');
// Kiểm tra xem token có tồn tại không
  if (token) {
  // Bạn có thể sử dụng giá trị token ở đây
  console.log('Token:', token);
  this.router.navigate(['user']);
} else {
  this.isModalVisible = true;
  console.log(this.idcustomer);
}
  }
Cart()
{
  this.idcustomer=this.customer.getClaimValue();
    // Lấy token từ Local Storage
    const token = localStorage.getItem('access_token');
    if(token)
    {
      this.router.navigate(['cart']);
    }else
    {
      alert('Vui lòng đăng nhập để xem giỏ hàng')
    }
}
loadpro(name: string): void {
  if(name)
  {
    (document.querySelector(".dropdown") as HTMLElement).style.display = 'flex';
    this.filteredProducts = this.data.filter((product) =>
    product.title.toLowerCase().includes(name.toLowerCase())
    ).slice(0, 6);
  }
  else
  (document.querySelector(".dropdown") as HTMLElement).style.display = 'none';
}
  isModalVisible = false;

  showLogin: boolean = false;

  isMapModalVisible = false;

   openMapModal() {
    this.isMapModalVisible = true;
  }

  closeMapModal() {
    this.isMapModalVisible = false;
  }

  getBookImage(bookId: string): string {
    const matchingImage = this.bookImage.find((bookImage) => bookImage.bookId === bookId);
    return matchingImage ? matchingImage.image0 : ''; // Return the image URL if found, otherwise an empty string
  }
  navigateToProduct(productId: string) {
    (document.querySelector(".dropdown") as HTMLElement).style.display = 'none'
    const sanitizedProductId = productId.replace(/\s+/g, '');
    this.router.navigate(['product', sanitizedProductId]).then(() => {
      location.reload();
    });

  }
  navigateToCategory(categoryId: string) {

    this.router.navigate(['category', categoryId]).then(() => {
      location.reload();
    });
  }
  percent1(price: number, per: number): number {
    return price *(1- per) ;}

}
