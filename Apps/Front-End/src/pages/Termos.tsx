import styles from "../styles/Termos.module.css";
function Termos() {
  return (
<section className={styles.termosSection}>
  <div className={styles.navTermos}>
          <h1>TERMOS</h1>
         <p>A cada compra, reforçamos nosso compromisso com a segurança, a transparência e a satisfação do cliente.</p>
        </div>
  <article className={styles.termosContent}> 
  <header className={styles.termosHeader}>
     
    <h2>Bem-vindo ao site da La Pizza!</h2>
    <p>
      Ao acessar e utilizar nosso e-commerce, você concorda com os presentes
      Termos de Uso. Recomendamos a leitura atenta deste documento antes de
      realizar qualquer pedido.
    </p>
  </header>

  <section >
    <h2>Aceitação dos Termos</h2>
    <p className={styles.termosParagraph}>
      O uso do site da La Pizza implica na aceitação integral e irrestrita
      destes Termos de Uso e da nossa{" "}
      <strong>Política de Privacidade</strong>. Caso não concorde com algum
      ponto, solicitamos que não utilize nosso e-commerce.
    </p>
  </section>

  <section >
    <h2>Cadastro do Usuário</h2>
    <ul className={styles.termosList}>
      <li>
        Para efetuar compras, o cliente deve fornecer informações verdadeiras e
        completas (nome, telefone, endereço, etc.).
      </li>
      <li>O usuário é responsável pela veracidade dos dados informados.</li>
      <li>É proibido utilizar dados falsos ou de terceiros sem autorização.</li>
    </ul>
  </section>

  <section >
    <h2>Pedidos e Entregas</h2>
    <ul className={styles.termosList}>
      <li>
        O pedido somente será processado após a confirmação de pagamento.
      </li>
      <li>
        Os prazos de entrega variam de acordo com a localidade e disponibilidade
        dos nossos entregadores/parceiros.
      </li>
      <li>
        Caso haja atraso por motivos de força maior (clima, trânsito,
        indisponibilidade de insumos), o cliente será informado.
      </li>
    </ul>
  </section>

  <section >
    <h2>Pagamentos</h2>
    <ul className={styles.termosList}>
      <li>
        Os pagamentos podem ser realizados por Pix, cartões de crédito/débito ou
        outros meios disponibilizados na plataforma.
      </li>
      <li>
        As transações são processadas por parceiros de pagamento, garantindo a
        segurança dos dados financeiros.
      </li>
      <li>
        A La Pizza <strong>não armazena dados de cartão de crédito.</strong>
      </li>
    </ul>
  </section>

  <section >
    <h2>Trocas e Cancelamentos</h2>
    <ul className={styles.termosList}>
      <li>
        Como trabalhamos com alimentos,
        <strong>
          {" "}
          não é possível realizar devoluções após a entrega.
        </strong>
      </li>
      <li>
        Em caso de pedido incorreto, produto com defeito ou problema na entrega,
        o cliente deve entrar em contato imediatamente pelo nosso canal de
        atendimento.
      </li>
      <li>
        Cancelamentos só serão aceitos se o pedido ainda{" "}
        <strong>não tiver sido preparado.</strong>
      </li>
    </ul>
  </section>

  <section >
    <h2>Direitos e Responsabilidades</h2>
    <ul className={styles.termosList}>
      <li>
        O cliente se compromete a utilizar o site apenas para fins legais e
        pessoais.
      </li>
      <li>
        A La Pizza se reserva o direito de recusar ou cancelar pedidos em casos
        de suspeita de fraude ou descumprimento destes Termos.
      </li>
      <li>
        Todo o conteúdo do site (logos, imagens, textos, receitas) é de
        propriedade da La Pizza e protegido por direitos autorais.
      </li>
    </ul>
  </section>

  <section >
    <h2>Alterações nos Termos</h2>
    <p className={styles.termosParagraph}>
      A La Pizza pode atualizar estes Termos de Uso a qualquer momento. As
      alterações entram em vigor assim que publicadas no site.
    </p>
  </section>

  <section>
    <h2>Contato</h2>
    <p className={styles.termosParagraph}>📧 pizzaria@lapizza.com</p>
    <p className={styles.termosParagraph}>📞 (11)98147-4757</p>
  </section>
</article>
</section>

  );
}

export default Termos;
