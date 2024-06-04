export interface BookDetailsViewModel {
  bookId: string;
  title: string;
  authorName: string;
  authorId: string;
  supplierName: string;
  supplierId: string;
  unitPrice: number; // Using optional property
  pricePercent: number;
  publishYear: number;
  available?: boolean;
  quantity?: number;
  catergoryID:string;
  categoryName: string;
  dimensions: string;
  avage:number;
  pages?: number; // Using optional property
  description: string;
  averageRating:number;
  image0: string;
  image1: string;
  image2: string;
  image3: string;
}
