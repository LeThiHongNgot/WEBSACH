import { Component, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from 'src/services/Categories/categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['../add-author/add-author.component.css']
})
export class AddCategoryComponent {

  @Output() closeModalEvent = new EventEmitter<void>();
  isModalVisible = false;
  categoryData: any = {};
  constructor(private categories: CategoriesService) 
  {
    this.generateRandomId();
  }
  generateRandomId(): void {
    this.categoryData.id = 'C_' + Math.random().toString(36).substr(2, 8).toUpperCase();;
  }
  
  addCategory(): void {
    const formData =
    {
      id: this.categoryData.id,
      name: this.categoryData.name,
    }
    this.categories.createCategory(formData).subscribe({
      next: (res) => {
        alert("Thêm thành công");
        this.closeModal();
        this.categories.Categories();
        setTimeout(() => {
          window.location.reload();
        }, 100); 
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Lỗi thay đổi dữ liệu');
      },
    });
  }
 
  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
