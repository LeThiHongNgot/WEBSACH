import { Component } from '@angular/core';
import { BillWithCustomer } from 'src/interfaces/Orders';
import { SharedataService } from 'src/services/sharedata/sharedata.service';
import { Router } from '@angular/router';
import { BillsService } from 'src/services/Bills/bills.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-order-not-complete',
  templateUrl: './order-not-complete.component.html',
  styleUrls: ['./order-not-complete.component.css']
})
export class OrderNotCompleteComponent {
  orderData:BillWithCustomer[]=[];
  id:string='';
  Doanhthu:number=0;
  quantity:number=0;
  totalproduct:number=0;
  constructor(private router:Router,
    private billservice:BillsService)
  {
    this.getbillsuccess()
  }
  getbillsuccess()
  {
    this.billservice.getbillSuccess().subscribe({
      next: res => {
        this.orderData=res
      },
      error: err => {
        console.log("Lỗi lấy dữ liệu: ", err)
      }
    });
  }
  isModalApceptVisible = false;
  status?:string;
  statusPayment?:string;

  handlestatusChange(event: any,id:string) {
    const selectedValue = event.target.value;
    this.id=id
    this.status=selectedValue
    if (selectedValue) {
        this.openModalApcept();
    } else {
        this.isModalApceptVisible = false;
    }
 }
 handlepaymentstatusChange(id:string,event: any) {
   const selectElement = event.target as HTMLSelectElement;
   const statusPayment = selectElement.value;
   this.id=id
   this.statusPayment=statusPayment
   if (statusPayment!=null) {
       this.openModalApcept();
   } else {
       this.isModalApceptVisible = false;
   }
 }
 onUpdateSuccess()
 {
  this.status=undefined
  this.statusPayment=undefined
  this.getbillsuccess()
 }
  // Hiển thị modal
  openModalApcept() {
    this.isModalApceptVisible = true;
  }
  // Đóng modal
  closeModalApcept() {
    this.isModalApceptVisible = false;
  }

  sendId(id: string): void {
   this.router.navigate(['OrderDetail-admin', id]);
 }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.orderData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'ThongkeSachDaBan');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(data);
    downloadLink.href = url;
    downloadLink.download = fileName + '.xlsx';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
