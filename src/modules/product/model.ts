export interface IProduct {
  _id: string;
  name: string;
  description: string;
  images: IProductImage[];
  price: string;
  size: { label: string; value: string };
  categories: [string];
  color: string;
  quantity: string;
  brand: string;
  rating: number;
  createdAt: string;
  status: string;
  availability: IAvailability;
}

export interface IProductImage {
  _id?: string;
  uri: string;
  type: string;
  name: string;
}

enum IAvailability {
  soldout = "soldout",
  soon = "soon",
  instock = "instock",
}
