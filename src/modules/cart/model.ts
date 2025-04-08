import { IProduct } from "../product/model";

export interface ICart {
  _id: string;
  userId?: string;
  product: ICartProduct;
  quantity?: number;
}

export interface ICartProduct {
  product: IProduct;
  quantity: number;
}
