import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor() { }

  exportToWord(data: any, fileName: string): void {
    const template = this.generateTemplate(data);
    const blob = new Blob(['\ufeff', template], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    FileSaver.saveAs(blob, fileName);
  }

  private generateTemplate(data: any): string {
    let content = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            /* Add your global styles here */
            /* Add this to your CSS for styling */
            .order-from-to {
              display: flex;
              margin-bottom: 10px;
              position: relative;
            }

            .from, .to {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
            }

            .from {
              border-right: 1px solid #97978d;
              margin-right: 15px;
            }
          </style>
        </head>
        <body>

        <div>MÃ ĐƠN HÀNG : ${data.idOrderCustomer}</div>
          <div>
            <div>
            <div class="order-from-to">
            <div class="from">
              <span class="label">Từ:</span> <span class="value">KANN bookstore</span>
              <span class="label">Địa chỉ:</span> <span class="value">578 Nguyễn Duy</span>
              <span class="label">SĐT:</span> <span class="value">0384753419</span>
            </div>

            <div class="to">
              <span class="label">Đến:</span> <span class="value">${data.name}</span>
              <span class="label">Địa chỉ:</span> <span class="value">${data.address}</span>
              <span class="label">SĐT:</span> <span class="value">${data.phone}</span>
            </div>
          </div>
            <div>
              <h3>Nội dung đơn hàng</h3>
              <table>
                <thead>
                  <tr>
                    <th>Tên sách</th>
                    <th>Số lượng</th>
                  </tr>
                </thead>
                <tbody>
    `;

    for (const item of data.orderData) {
      content += `
                  <tr>
                    <td>${item.bookName}</td>
                    <td>${item.quantity}</td>
                  </tr>
      `;
    }

    content += `
                </tbody>
              </table>
            </div>

            <div>
              <p>Tổng tiền đặt hàng: ${data.total}đ</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return content;
  }

}
