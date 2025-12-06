import { z } from "zod";
import { orderItemSchema } from "./orderItemSchema";

export const orderSchema = z.object({
  userId: z.number(),
  addressId: z.number(),
  items: z.array(orderItemSchema).min(1, "Pedido deve ter pelo menos 1 item"),
});
