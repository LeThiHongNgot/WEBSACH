import { Component, Output, EventEmitter } from '@angular/core';
import { AuthorsService } from 'src/services/Authors/authors.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  isAddAuthorModal= false;
  Data: any = {};
  selectedFile: File | null = null;
  constructor(private Author: AuthorsService) {}
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  addAuthor(): void {
    const formData = new FormData();
    formData.append('id', "");
    formData.append('name', this.Data.name || "");
    formData.append('description', this.Data.description || "");

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    this.Author.AddAuthor(formData)
      .subscribe({
        next: (res) => {
          alert("Thành công");
          this.closeModal();
          setTimeout(() => {
            window.location.reload();
          }, 100); 
          
        },
        error: (err) => {
          alert('Lỗi thay đổi dữ liệu');
        },
      });
  }
  convertToUppercase(value: string): string {
    return value.toUpperCase();
  }
  closeModal(): void {
    this.closeModalEvent.emit();
    
  }
}
