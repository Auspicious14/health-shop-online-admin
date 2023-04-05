export interface IProduct {
  id: string;
  name: string;
  description: string;
  images?: IProductImage[];
  price: number;
  size: string;
  categories: [string];
  color: string;
  quantity: string;
}

export interface IProductImage {
  uri: string;
  type: string;
  name: string;
}
