import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/SuccessPage.module.css";
import type { OrderItem, Order, LocalOrder, OrderView } from "@packages/types/types";
import { api } from "@packages/api/api";
import { useUserStore } from "@packages/store/useUserStore";
import { useOrderStore } from "../store/useOrderStore";



function SuccessPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderId = params.get("order");

  const { user } = useUserStore();
  const { orders: localOrders } = useOrderStore();

  const [order, setOrder] = useState<Partial<OrderView> | null>(null);

  useEffect(() => {
    async function loadOrder() {
      try {
        if (!orderId) return;

        /* 🔹 ADMIN → API */
        if (user?.role === "admin") {
          const { data } = await api.get<Order>(`/orders/${orderId}`);

          setOrder({
            id: data.id,
            items: data.items,
            precoTotal: data.precoTotal,
          });
          return;
        }

        /* 🔹 USER → ZUSTAND */
        const localOrder = localOrders.find(
          (o: LocalOrder) => o.id === Number(orderId)
        );

        if (!localOrder) return;

        setOrder({
          id: localOrder.id,
          items: localOrder.items,
          precoTotal: localOrder.items.reduce(
            (total, item) => total + item.precoTotal,
            0
          ),
        });
      } catch (err) {
        console.error("Erro ao buscar pedido:", err);
      }
    }

    loadOrder();
  }, [orderId, user, localOrders]);

  if (!orderId)
    return <p className={styles.message}>Pedido não encontrado.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.navSuccess}>
        <h1>🍕 Pedido Confirmado!</h1>
      </div>

      <p className={styles.orderId}>
        ID do Pedido: <strong>{orderId}</strong>
      </p>

      {order ? (
        <div className={styles.orderBox}>
          <h2>Resumo</h2>

          {order.items!.map((item) => (
            <div key={item.id} className={styles.itemBox}>
              <p>
                <strong>Pizzas:</strong> {item.sabor}
              </p>
              <p>
                <strong>Quantidade:</strong> {item.quantidade}
              </p>
              <p>
                <strong>Preço unitário:</strong> R${" "}
                {item.precoUnitario.toFixed(2)}
              </p>
            </div>
          ))}

          <p className={styles.total}>
            <strong>Total do Pedido:</strong> R${" "}
            {order.precoTotal!.toFixed(2)}
          </p>
        </div>
      ) : (
        <p className={styles.loading}>Carregando informações...</p>
      )}

      <div className={styles.buttons}>
        <button
          onClick={() => navigate(`/order-status/${orderId}`)}
          className={styles.statusBtn}
        >
          Ver Status do Pedido
        </button>

        <button onClick={() => navigate("/")} className={styles.backBtn}>
          Voltar ao início
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
