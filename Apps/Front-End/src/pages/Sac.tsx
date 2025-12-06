
import styles from "../styles/Sac.module.css";
function sac() {
  return (
    <section className={styles.formService}>
      <form>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default sac;
