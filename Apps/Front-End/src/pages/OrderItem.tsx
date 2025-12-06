import { useNavigate } from "react-router-dom";
import Modal from "../components/modais/Modal";
import useOrderItem from "../hooks/useOrderItem";
import { usePizzaStore } from "../store/usePizzaStore";
import styles from "../styles/OrderItem.module.css";
import { useUserCart } from "../store/useCartStore";
import { toast } from "react-toastify";
import type { Adicional } from "@packages/types/types";

function OrderItem() {
  const navigate = useNavigate();
  const addItem = useUserCart((s) => s.addItem);
  const {
    unidades,
    setUnidades,
    adicionaisSelecionados,
    handleSubmit,
    precoTotal,
    toggleAdicional,
    modal,
    setModal,
  } = useOrderItem();
  const { pizzaSelecionada } = usePizzaStore();
  if (!pizzaSelecionada) return <p className={styles.loadingOrcamento}>Carregando...</p>;




  return (
    <main className={styles.orcamento}>
      <div className={styles.navOrcamento}>
        <h1>ORÇAMENTO Pizza {pizzaSelecionada.sabor}</h1>
      </div>

      <section className={styles.orcamentoSection}>
        <article className={styles.productImage}>
          <img src={pizzaSelecionada.imagem} alt="Imagem Pizza" />
        </article>
        <article className={styles.orcamentoContent}>
          <h1>{pizzaSelecionada.sabor}</h1>
          <p>Pacote {pizzaSelecionada.descricao}</p>
          <h2>Preço: R${pizzaSelecionada.preco.toFixed(2)}</h2>
          <div className={styles.form}>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputForm}>
                <label htmlFor="Unidades">Unidades:</label>
                <select
                  name="Unidades"
                  value={unidades}
                  onChange={(e) => setUnidades(Number(e.target.value))}
                  required
                >
                  <option value="" defaultChecked>
                    Selecione
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className={styles.inputForm}> <label htmlFor="Adicionais">Adicionais:</label>
              {pizzaSelecionada &&
                pizzaSelecionada.adicionais.map((pizza:Adicional) => (
                  <label key={pizza.id} className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={adicionaisSelecionados.some(
                        (a) => a.id === pizza.id
                      )}
                      onChange={() => toggleAdicional(pizza)}
                    />
                    <span className={styles.customCheckbox}></span>
                     {pizza.nome} <p>(+R${pizza.preco.toFixed(2)})</p>
                  </label>
                ))}
          </div>
              {
                <h3 className={styles.valor}>
                  {" "}
                  Total a Pagar: R$
                  {precoTotal
                    ? precoTotal.toFixed(2)
                    : pizzaSelecionada.preco.toFixed(2)}
                </h3>
              }

              <button type="submit">Prosseguir</button>
            </form>
          </div>
        </article>
      </section>
      {modal && (
        <Modal
          title="Tem certeza?"
          sabor={pizzaSelecionada.sabor}
          imagem={pizzaSelecionada.imagem}
          precoTotal={precoTotal}
          onContinue={() => {
            addItem({
               cartId: Date.now(),
              ...pizzaSelecionada,
              unidades,
              adicionais:adicionaisSelecionados,
              precoTotal,
            });
            toast.success("Enviado ao Carrinho!");
            setModal(false);
            navigate("/Cardapio");
          }}
          onConfirm={() => {
            addItem({
               cartId: Date.now(),
              ...pizzaSelecionada,
              unidades,
              adicionais:adicionaisSelecionados,
              precoTotal,
            });
            toast.success("Enviado ao Carrinho!");
            setModal(false);
            navigate("/Carrinho");
          }}
        >
          <p>Deseja adicionar essa pizza ao carrinho?</p>
        </Modal>
      )}
    </main>
  );
}

export default OrderItem;
