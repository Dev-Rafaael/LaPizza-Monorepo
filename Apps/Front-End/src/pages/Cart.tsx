import styles from "../styles/Cart.module.css";
import { Link } from "react-router-dom";
import visa from "../assets/IMG/visa.png";
import mastercard from "../assets/IMG/mastercard.png";
import pix from "../assets/IMG/pix.png";
import useCart from "../hooks/useCart";

function Cart() {
  const {
    items,
    newQuantidade,
    setNewQuantidade,
    editId,
    animatePrices,
    deletarItem,
    edit,
    editItem,
    valorTotal,
    triggerAnimation,
     handleCheckout,
       AuthModal,
    showAuthModal, setShowAuthModal,handleQuantityChange  
  } = useCart();

  return (  
    <> 
      <AuthModal visible={showAuthModal} onClose={() => setShowAuthModal(false)} />
    <section className={styles.cartSection}>
      <div className={styles.navCart}>
        <h1>CARRINHO</h1>
      </div>
      {items.length > 0 ? (
        <article className={styles.cartContent}>
          <div className={styles.itensList}>
            {items.map((pizza) => (
              <article key={pizza.cartId} className={styles.item}>
                <img src={pizza.imagem} alt={`Pizza sabor ${pizza.sabor}`} />
                <article className={styles.detailsList}>
                  <div className={styles.infoItem}>
                    <h2>
                      <span>Sabor</span> {pizza.sabor}
                    </h2>
                    <h2>
                      <span>Preço Unitario</span> R${pizza.preco.toFixed(2)}
                    </h2>
                    <h2>
                      <span>Quantidade</span>
                      {editId === pizza.cartId ? (
                        <form
                          onSubmit={(e) => editItem(e, pizza.cartId)}
                          className={styles.quantityForm}
                        >
                          <div className="">
                            <button
                              type="button"
                              className={styles.qtyBtn}
                              onClick={() => {
                                handleQuantityChange(-1, pizza.id);
                                triggerAnimation(pizza.id);
                              }}
                            >
                              −
                            </button>

                            <input
                              type="number"
                              min="1"
                              value={newQuantidade}
                              onChange={(e) => {
                                setNewQuantidade(Number(e.target.value));
                                triggerAnimation(pizza.id);
                              }}
                              className={styles.qtyInput}
                            />

                            <button
                              type="button"
                              className={styles.qtyBtn}
                              onClick={() => {
                              handleQuantityChange(+1, pizza.id);
                                triggerAnimation(pizza.id);
                              }}
                            >
                              +
                            </button>
                          </div>
                          <div className="">
                            <button type="submit" className={styles.saveButton}>
                              Salvar
                            </button>
                          </div>
                        </form>
                      ) : (
                        <p>{pizza.unidades}</p>
                      )}
                    </h2>

                    <h2>
                      <span>Preço Total</span>
                      <p
                        className={`${styles.totalPrice} ${
                          animatePrices[pizza.id] ? styles.animate : ""
                        }`}
                      >
                        R$
                        {editId === pizza.cartId
                          ? (pizza.preco * newQuantidade).toFixed(2)
                          : pizza.precoTotal.toFixed(2)}
                      </p>
                    </h2>
                  </div>
                  <div className={styles.infoAdicionais}>
                    <h2>
                      <span>Descrição</span> {pizza.descricao}
                    </h2>
                    <h2>
                      <span>Adicionais</span>{" "}
                      {pizza.adicionais.map((i) => i.nome).join(", ")}
                    </h2>
                  </div>
                </article>
                <div className={styles.actions}>
                  <div className={styles.actionBtn}>
                    <button onClick={() => deletarItem(pizza.cartId)}>
                      🗑️
                    </button>
                    <button
                      className={styles.editBtn}
                      onClick={() => edit(pizza)}
                    >
                      ✏️
                    </button>
                  </div>{" "}
                </div>
              </article>
            ))}
          </div>

          <div className={styles.valoresContent}>
            <h2>
              Total Do Carrinho: <strong>R${valorTotal.toFixed(2)}</strong>
            </h2>

            <div className={styles.payment}>
              <h2>Formas Pagamentos:</h2>
              <div className={styles.bandeiras}>
                <img src={visa} alt="Visa" />
                <img src={mastercard} alt="Mastercard" />
                <img src={pix} alt="Pix" />
              </div>
            </div>
            <div className={styles.actionPay}>
              <button onClick={handleCheckout}>Finalizar Pedido</button>
         
            </div>
           
          </div> <div className={styles.pedidos}>
              <Link to="Meus-Pedidos">Meus Pedidos</Link>
         
            </div>
        </article>
      ) : (
        <div className={styles.notFoundItem}>
          <h1>Ops! Carrinho Vazio</h1>
          <Link to={"/Cardapio"}>Ver Cardapio</Link>
        </div>
      )}
    </section>
    </>
  );
}

export default Cart;
