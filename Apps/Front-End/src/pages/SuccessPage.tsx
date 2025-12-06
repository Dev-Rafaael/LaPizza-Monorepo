import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/SuccessPage.module.css";
import type { OrderItem } from "@packages/types/types";
import { api } from "@packages/api/api";

function SuccessPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderId = params.get("order");

  const [items, setItems] = useState<OrderItem | null>(null);
  useEffect(() => {
    async function loadOrder() {
      try {
        const itemsRes = (await api.get(`/ordersItems/${orderId}`)).data;
        setItems(itemsRes);
      } catch (err) {
        console.log("Erro ao buscar pedido:", err);
      }
    }

    if (orderId) loadOrder();
  }, [orderId]);

  console.log(items);

  if (!orderId) return <p className={styles.message}>Pedido não encontrado.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.navSuccess}>
        <h1>🍕 Pedido Confirmado!</h1>{" "}
      </div>
      <p className={styles.orderId}>
        ID do Pedido: <strong>{orderId}</strong>
      </p>

      {items ? (
        <div className={styles.orderBox}>
          <h2>Resumo</h2>

          <div key={items.id} className={styles.itemBox}>
            <p>
              <strong>Pizza:</strong> {items.sabor}
            </p>
            <p>
              <strong>Quantidade:</strong> {items.quantidade}
            </p>
            <p>
              <strong>Total item:</strong> R$ {items.precoUnitario.toFixed(2)}
            </p>
          </div>

          <p>
            <strong>Total do Pedido:</strong> R$ {items.precoTotal.toFixed(2)}
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

        <a href="/" className={styles.backBtn}>
          Voltar ao início
        </a>
      </div>
    </div>
  );
}

export default SuccessPage;
