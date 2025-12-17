import { toast } from "react-toastify";
import { api } from "@packages/api/api";
import { useUserCart } from "../store/useCartStore";
import { useOrderStore } from "../store/useOrderStore";
import type { Order } from "@packages/types/types";
import type { User } from "@packages/types/types";

export function useOrder() {
  const { items, clearCart, getTotal } = useUserCart();
  const { addOrder } = useOrderStore();

  const handleSubmitOrder = async (
    user: User,
    addressId: number
  ) => {
    try {
      const precoTotal = getTotal();

      const itemsMapped = items.map((item) => ({
        pizzaId: item.id ?? null,
        sabor: item.sabor,
        descricao: item.descricao || null,
        imagem: item.imagem || null,
        precoUnitario: item.preco,
        quantidade: item.unidades,
        precoTotal: item.precoTotal,
        adicionais: item.adicionais ?? [],
      }));

      const payload = {
        userId: user.id,
        addressId,
        precoTotal,
        items: itemsMapped,
        status: "PENDENTE",
      };

      let orderId: number;

  if (user.role === "admin") {
        const { data } = await api.post("/orders/", payload);
        orderId = data.id;
      } 
      else {
        orderId = Date.now();

      addOrder(payload as any);
      }

      /** Stripe funciona para os dois */
      const stripeRes = await api.post("/pagamentos/checkout", {
        items: itemsMapped.map((item) => ({
          name: item.sabor,
          quantity: item.quantidade,
          price: item.precoUnitario,
        })),
        orderId,
      });

      window.location.href = stripeRes.data.url;

      toast.success("Pedido criado. Redirecionando para pagamento...");
      clearCart();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao criar pedido");
    }
  };

  const pagarPedido = async (pedido: Order) => {
    try {
      const itemsMapped = pedido.items.map((item) => ({
        name: item.sabor,
        quantity: item.quantidade,
        price: item.precoUnitario,
      }));

      const stripeRes = await api.post("/pagamentos/checkout", {
        items: itemsMapped,
        orderId: pedido.id,
      });

      window.location.href = stripeRes.data.url;
    } catch (err) {
      console.error(err);
      toast.error("Erro ao iniciar pagamento.");
    }
  };

  return { handleSubmitOrder, pagarPedido };
}
