export interface bookhome {
  id: string;
  title: string;
  authorId: string;
  supplierId: string;
  unitPrice: number;
  pricePercent: number;
  publishYear: number;
  available: boolean;
  quantity: number;
  author: any | null;
  supplier: any | null;
  bookdetail: any | null;
  bookimg: any | null;
  carts: any[];
  orders: any[];
  productReviews: any[];
}
