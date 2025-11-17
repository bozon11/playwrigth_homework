import { MANUFACTURERS } from "../salesPortal/products/manufactures";

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}

export interface IProductInTable extends Pick<IProduct, "name" | "manufacturer" | "price"> {
  createdOn: string;
}
