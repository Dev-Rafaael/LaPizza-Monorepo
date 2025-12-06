import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/OrderStatus.module.css";
import { api } from "@packages/api/api";


type StatusType =
  | "pendente"
  | "pago"
  | "em_preparacao"
  | "saiu_para_entrega"
  | "entregue";

function OrderStatus() {
  const { orderId } = useParams();
  const [status, setStatus] = useState<StatusType>("pendente");

  const steps = [
    { id: "PAGO", label: "Pagamento aprovado" },
    { id: "EM_PREPARAÇÃO", label: "Em preparo" },
    { id: "SAIU_PARA_ENTREGA", label: "Saiu para entrega" },
    { id: "ENTREGUE", label: "Entregue" },
  ];
  useEffect(() => {
  async function loadOrderStatus() {
        try {
          const response = (await api.get(`/orders/${orderId}`)).data;
          setStatus(response.status);
        } catch (err) {
          console.log("Erro ao buscar pedido:", err);
        }
      }
   
       if (orderId) loadOrderStatus();
  }, [orderId]);
console.log(status );

  return (
    <section className={styles.container}>
      <div className={styles.navOrderStatus}>
        <h1>🍕 Acompanhe seu pedido #{orderId}</h1>
      </div>
      <article className={styles.contentStatus}>
        <article className={styles.timeline}>
          {steps.map((step) => {
            const isActive =
              steps.findIndex((s) => s.id === status) >=
              steps.findIndex((s) => s.id === step.id);

            return (
              <div
                key={step.id}
                className={`${styles.step} ${isActive ? styles.active : ""}`}
              >
                <div className={styles.circle}>{isActive ? "✔" : ""}</div>
                <p>{step.label}</p>

                    {step.label === "Entregue" && isActive && (
          <div className={styles.successMessage}>
            <h1 className={styles.successTitle}>Obrigado pela compra! 🎉</h1>
            <p className={styles.successText}>Seu pedido foi entregue com sucesso.</p>
          </div>
        )}

              </div>
              
             
            );
            
          })}
        </article>
          
        <p className={styles.obs}>
          A página atualiza automaticamente a cada 5 segundos.
        </p>
        <div className={styles.buttons}>
          <button
            onClick={() => window.location.reload()}
            className={styles.reloadBtn}
          >
            Atualizar agora
          </button>
          <a href="/" className={styles.backBtn}>
            Voltar ao início
          </a>
        </div>
      </article>
    </section>
  );
}

export default OrderStatus;
