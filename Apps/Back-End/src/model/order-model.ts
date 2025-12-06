import { OrderItem } from "@prisma/client";


export interface Order {
  id?: number;
  status: string;
  userId: number;
  addressId: number;
  precoTotal: number;
  items: OrderItem[];
}


