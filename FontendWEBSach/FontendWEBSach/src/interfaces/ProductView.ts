export interface ProductView {
  id: string;
  customerId: string;
  bookId: string;
  rating: number;
  comment: string;
  ngayCommemt: string;
  book: any; // You might want to replace 'any' with the actual Book interface
  customer: any; // You might want to replace 'any' with the actual Customer interface
}
export interface ProductReviewBookid {
  id: string;
  rating: number;
  comment: string;
  ngayCommemt: string; // Assuming this is a date string
  customerId: string;
  customerName: string;
  bookId: string;
}
export interface ProductReviewDTO
{
     id:string
     customerName:string
     bookTitle:string
     rating:string
     comment:string
     ngayComment:Date
    // Add other properties as needed
}
