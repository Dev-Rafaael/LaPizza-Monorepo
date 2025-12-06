import Stripe from "stripe";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const stripeWebhook = async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // no Railway pode ser req.rawBody dependendo do parser
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Evento de pagamento concluído
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const orderId = Number(session.metadata.orderId);

    await prisma.order.update({
      where: { id: orderId },
      data: { status: "PAID" },
    });

    console.log(`✔ Pedido ${orderId} atualizado para PAID`);
  }

  res.status(200).json({ received: true });
};
