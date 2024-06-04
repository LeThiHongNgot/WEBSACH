import { Component, Renderer2, ElementRef } from '@angular/core';
import { ProductReviewDTO } from 'src/interfaces/ProductView';
import { ProductViewService } from 'src/services/ProductView/product-view.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  page=1
  sizepage=5
  View: any = {}
  constructor(private el: ElementRef,
    private renderer: Renderer2,private Comment:ProductViewService)
  {
    this.LoadComment(1)
    this.LoadCommentful()
  }
  datacommentfull:any[] = [];
  datacomment:any[] = [];
  loadpageReviewCount:number=0;

  assets: any;

  isDeleteModalVisible = false;
  LoadComment( page:number) {
    this.Comment. getProductReviews(page, this.sizepage).subscribe({
      next: (res: any) => {
        this.loadpageReviewCount = res.totalCount
        this.datacomment = res.data;
        console.log(res);
      },
      error: (err) => {
        // Handle error
      },
    });
  }
  LoadCommentful() {
    this.Comment.getAllProductReviews().subscribe({
      next: (res: any) => {
        this. datacommentfull = res.data;
        console.log( res);
      },
      error: (err) => {
        // Handle error
      },
    });
  }
  searchResults: any[] = [];
  loadpro(title: string) {
    this.LoadCommentful()
    const search = this.el.nativeElement.querySelector('#searchview');
    const begin = this.el.nativeElement.querySelector('#Viewfirst');
    this.renderer.setStyle(begin, 'display', 'none');
    this.renderer.setStyle(search, 'display', 'block');
    if (!title) {
      this.searchResults = this.datacommentfull;
      this.renderer.setStyle(begin, 'display', 'block');
      this.renderer.setStyle(search, 'display', 'none');
      return;
    }
    // Convert the search query to lowercase for case-insensitive search
    const searchTerm = title.toLowerCase();
    // Filter books based on the search query
    this.searchResults = this.datacommentfull.filter(View =>
      View.title.toLowerCase().includes(searchTerm)
    );
  }
  onPageChange(newPage: number): void {
    this.page = newPage;
    this.LoadComment(this.page)
  }
  // selectAll(event: any) {
  //   this.datacomment.forEach(cmt => cmt.selected = event.target.checked);
  // }

  // Hiển thị modal xác nhận xóa
  openDeleteModal() {
    this.isDeleteModalVisible = true;
  }

  // Đóng modal xác nhận xóa
  closeDeleteModal() {
    this.isDeleteModalVisible = false;
      this.LoadComment(this.page);

  }
}
