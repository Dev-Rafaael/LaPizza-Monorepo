
import styles from "../styles/Pizza.module.css";
import usePizza from "../hooks/usePizza";
import type { Pizzas } from "@packages/types/types";


function Pizza() {
  const {pizzas,selectedPizza} = usePizza()
  
  if (!pizzas.length) return <p className={styles.loadingPizza}>Carregando pizzas...</p>;


  

  
  return (
 <section className={styles.cardapio}>
      <div className={styles.navCardapio}>
        <h1>CARDAPIO</h1>
      </div>
      <div className={styles.cardapioItens}>
        <h2>
          ENCONTRE AQUI A <span>PIZZA</span> IDEAL PARA <span>VOCÊ</span>
        </h2>
        <div className={styles.cardapioContainer}>
        
          {pizzas.map((pizza:Pizzas) => (
            <div key={pizza.id} className={styles.pizzaItem}>
              <img src={pizza.imagem} alt={`Pizza sabor ${pizza.sabor}`} />
              <div className={styles.infoItens}>
                <h1 className={styles.name}>{pizza.sabor}</h1>

                <p>{pizza.descricao}</p>
                <h4>R${pizza.preco.toFixed(2)}</h4>
                <article className={styles.cardapioOption}>
                  <button  onClick={()=> selectedPizza(pizza)} className={styles.btn}>
                    Comprar
                  </button>
                </article>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pizza;

