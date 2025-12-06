import styles from "../styles/CancelPage.module.css";
function CancelPage() {
  return (
        <div className={styles.container}>
        <div className={styles.navCancel}>
        <h1>❌ Pagamento Cancelado</h1>
      </div>
      <p className={styles.message}>
        Parece que o pagamento foi interrompido.
      </p>

      <a href="/Cardapio" className={styles.backBtn}>Voltar para o cardápio</a>
    </div>
  )
}

export default CancelPage

