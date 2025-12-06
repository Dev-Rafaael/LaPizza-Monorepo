import styles from '../styles/Footer.module.css'
import visa from '../assets/IMG/visa.png'
import mastercard from '../assets/IMG/mastercard.png'
import pix from '../assets/IMG/pix.png'

function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.footerContent}>
      {/* Contato */}
      <article className={styles.contato} id="id-contato">
        <h2>Contato</h2>
      <ul>
  <li>
    <i className="fi fi-brands-instagram"></i>
    <a href="#" target="_blank" rel="noopener noreferrer">LaPizza</a>
  </li>
  <li>
    <i className="fi fi-rr-phone-call"></i>
    <a href="tel:45557777">4555-7777</a>
  </li>
  <li>
    <i className="fi fi-brands-whatsapp"></i>
    <a href="https://wa.me/5598981474757" target="_blank" rel="noopener noreferrer">98147-4757</a>
  </li>
</ul>

      </article>

      {/* Links rápidos */}
      <article className={styles.links}>
        <h2>Institucional</h2>
        <ul>
          <li><a href="/Sobre">Sobre Nós</a></li>
          <li><a href="/Politica-Privacidade">Política de Privacidade</a></li>
          <li><a href="/Termos-De-Uso">Termos de Uso</a></li>
        </ul>
      </article>

      {/* Pagamentos */}
      <article className={styles.pagamentos}>
        <h2>Pagamentos</h2>
        <div className={styles.bandeiras}>
          <img src={visa} alt="Visa" />
          <img src={mastercard} alt="Mastercard" />
          <img src={pix} alt="Pix" />
        </div>
      </article>
</section>
      {/* Direitos reservados */}
      <div className={styles.copy}>
        <p>© 2025 La Pizza – Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
