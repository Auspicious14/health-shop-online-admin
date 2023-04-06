export interface IProduct {
  id: string;
  name: string;
  description: string;
  images?: IProductImage[];
  price: number;
  size: { label: string; value: string };
  categories: ICategory[];
  color: string;
  quantity: string;
  brand: string;
  rating: number;
}

export interface IProductImage {
  uri: string;
  type: string;
  name: string;
}

export interface ICategory {
  name: string;
}
