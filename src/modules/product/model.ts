export interface IProduct {
  _id: string;
  name: string;
  description: string;
  images?: IProductImage[];
  price: number;
  size: string;
  categories: string[];
  color: string;
  quantity: string;
  brand: string;
  rating: number;
  createdAt: string;
  status: string;
  soldout: boolean;
  instock: boolean;
}

export interface IProductImage {
  _id?: string;
  uri: string;
  type: string;
  name: string;
}

export interface ICategory {
  name: string;
}
