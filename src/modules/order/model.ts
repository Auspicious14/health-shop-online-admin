import { ICart } from "../cart/model";

export interface IOrder {
  _id: string;
  userId: string;
  cart: ICart[];
  amount: string;
  address: IAddress;
  status: IOrderStatus;
  createdAt: string;
  updatedAt: string;
}

export enum IOrderStatus {
  pending = "pending",
  confirmed = "confirmed",
  Delivered = "Delivered",
  cancelled = "cancelled",
  new = "new",
}

export interface IAddress {
  name: string;
  email: string;
  phoneNumber: string;
  postalCode: string;
  city: string;
  address: string;
}
