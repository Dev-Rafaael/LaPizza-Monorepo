import type { Adicional } from "@packages/types/types";
import { useUserCart } from "../../store/useCartStore";
import styles from "../../styles/OrderSummary.module.css";


function OrderSummary() {
 const { items, getTotal } = useUserCart();

  return (
    <aside className={styles.summaryContainer}>
      <h2 className={styles.title}>Resumo do Pedido</h2>

      <div className={styles.itemsList}>
        {items.map((item) => (
          <div className={styles.item} key={item.cartId}>
            <img src={item.imagem} alt={item.sabor} />
            <div className={styles.info}>
              <h4>{item.sabor}</h4>
              <p>{item.descricao}</p>
              <p>
                <strong>Unidades:</strong> {item.unidades}
              </p>
              {item.adicionais?.length > 0 && (
                <ul className={styles.adicionais}>
                  {item.adicionais.map((ad:Adicional) => (
                    <li key={ad.id}>
                      {ad.nome} +R${ad.preco.toFixed(2)}
                    </li>
                  ))}
                </ul>
              )}
              <p className={styles.preco}>
                <strong>R$ {item.precoTotal.toFixed(2)}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.total}>
        <h3>Total Geral:</h3>
        <span>R$ {getTotal().toFixed(2)}</span>
      </div>
    </aside>
  );
}

export default OrderSummary;
