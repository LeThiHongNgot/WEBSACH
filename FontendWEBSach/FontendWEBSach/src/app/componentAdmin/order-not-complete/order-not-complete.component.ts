import { Component } from '@angular/core';
import { OrderWithDetails } from 'src/interfaces/Orders';
import { OrdersService } from 'src/services/Orders/orders.service';
import { SharedataService } from 'src/services/sharedata/sharedata.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-order-not-complete',
  templateUrl: './order-not-complete.component.html',
  styleUrls: ['./order-not-complete.component.css']
})
export class OrderNotCompleteComponent {

  orderData:OrderWithDetails[]=[];
  Doanhthu:number=0;
  quantity:number=0;
  totalproduct:number=0;
  constructor(private router:Router,private sharedata:SharedataService,private Order:OrdersService)
  {
   this.Order.getOrders(1).subscribe({
     next: res => {
       this.orderData=res
     },
     error: err => {
       console.log("Lỗi lấy dữ liệu: ", err)
     }
   });
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
  sendIdTime(id:string,time:string)
  {
   this.sharedata.setOrder(id,time);
   this.router.navigate(['OrderDetail-admin']);
  }
}
