import { toast } from "react-toastify";
import { api } from "@packages/api/api";
import { useUserCart } from "../store/useCartStore";
import type { Order } from "@packages/types/types";


export function useOrder() {
  const { items, clearCart, getTotal } = useUserCart();


  const handleSubmitOrder = async (
    userId: number | null | undefined,
    addressId: number
  ) => {
    try {
      const precoTotal = getTotal();

      const itemsMapped = items.map(item => ({
        pizzaId: item.id ?? null, 
        sabor: item.sabor,
        descricao: item.descricao || null,
        imagem: item.imagem || null,
        precoUnitario: item.preco,
        quantidade: item.unidades,
        precoTotal: item.precoTotal,
        adicionais: item.adicionais ? JSON.parse(JSON.stringify(item.adicionais)) : undefined,
      }));

      console.log("Payload enviado:", { userId, addressId, precoTotal, items: itemsMapped });

      // Cria pedido com itens de uma vez
      const { data: orderData } = await api.post("/orders/", {
        userId: userId ?? null,
        addressId,
        precoTotal,
        items: itemsMapped,
        status: 'PENDENTE'
      });


       const stripeRes = await api.post("/pagamentos/checkout", {
        items: itemsMapped.map((item) => ({
          name: item.sabor,
          quantity: item.quantidade,
          price: item.precoUnitario,
        })),
        orderId: orderData.id,
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

  return { handleSubmitOrder,pagarPedido };
}
