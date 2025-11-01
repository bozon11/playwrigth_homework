import { MANUFACTURERS } from "../salesPortal/products/manufactures";

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}
