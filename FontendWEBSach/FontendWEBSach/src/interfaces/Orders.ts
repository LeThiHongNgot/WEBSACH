export interface Order {
  id: string;
  customerId: string;
  orderDate: Date;
  address: string;
  description: string | null;
  unitPrice: number;
  quantity: number;
  bookId: string;
  billId:string;
}
export interface ShoppingCartItem {
  status:number,
  description: string;
  image0: string[];
  title: string[];
  price: number[];
  quantity: number[];
  bookIds: string[];
}
export interface BillWithCustomer {
  id: string;
  userId: string | null;
  voucherId: string | null;
  customerName: string;
  orderDate: Date | null;
  totalAmount: number;
  paymentStatus: number;
  status:string|null
}
