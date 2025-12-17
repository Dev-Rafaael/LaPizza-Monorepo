
import { Request, Response } from "express";
import { stripe } from "../services/stripeService";

export const criarCheckout = async (req: Request, res: Response) => {
  try {
      const { items, orderId } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "https://la-pizza-monorepo-front-end.vercel.app/success?order=" + orderId,
    cancel_url: "https://la-pizza-monorepo-front-end.vercel.app/cancel",
    line_items: items.map((i: { name: any; price: number; quantity: any; }) => ({
      price_data: {
        currency: "BRL",
        product_data: { name: i.name },
        unit_amount: Math.round(i.price * 100),
      },
      quantity: i.quantity,
    })),metadata: {
    orderId: String(orderId),
  },
  });

  res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao criar checkout" });
  }
};
