import { Component, Output, EventEmitter } from '@angular/core';
import { SupliersService } from 'src/services/Supliers/supliers.service';

@Component({
  selector: 'app-add-suplier',
  templateUrl: './add-suplier.component.html',
  styleUrls: ['../add-author/add-author.component.css']
})
export class AddSuplierComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  isModalVisible = false;
  supplierData: any = {};
  phoneInputInvalid = false;
  formSubmitted = false; 
  constructor(private supplier: SupliersService) 
  {
    this.generateRandomId();
  }

  generateRandomId(): void {
    this.supplierData.id = 'S' + Math.random().toString().substr(2, 8);
  }
  

  addSuplier(): void {
    this.formSubmitted = true;
    if (!this.supplierData.name || this.phoneInputInvalid) {
      return;
    } 
    const formData =
    {
      id: this.supplierData.id,
      name: this.supplierData.name,
      phone: this.supplierData.phone,
      email: this.supplierData.email,
      description: this.supplierData.description
    }
    this.supplier.addSupplier(formData).subscribe({
      next: (res) => {
        alert("Thêm thành công");
        this.closeModal();
        this.supplier.Suppliers();
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Lỗi lấy dữ liệu');
      }
    });
  }
  onPhoneInput(event: any): void {
    const phoneNumber = event.target.value.trim();
    this.phoneInputInvalid = phoneNumber.length !== 10 || isNaN(Number(phoneNumber));
  }
  get formInvalid(): boolean {
    return !this.supplierData.name || this.phoneInputInvalid;
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
