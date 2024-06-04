export interface Order {
  id: string;
  customerId: string;
  orderDate: Date;
  status: number;
  address: string;
  description: string | null;
  unitPrice: number;
  quantity: number;
  bookId: string;
  book: null; // You might want to create a Book interface
  customer: null; // You might want to create a Customer interface
  bills: []; // You might want to create a Bill interface
}
export interface ShoppingCartItem {
  status:number,
  description: string;
  image0: string[];
  title: string[];
  price: number[]; // Nếu giá có thể có, nếu không, bạn có thể sử dụng number[] | undefined
  quantity: number[];
  bookIds: string[];
}
export interface OrderWithDetails
{
    id : string;
    phone:string;
    customerId:string;
    customerName : string;
    orderDate :Date;
    status:number;
    address :string
    description :string;
    unitPrice:number;
    quantity:number;
    bookName :string
}
