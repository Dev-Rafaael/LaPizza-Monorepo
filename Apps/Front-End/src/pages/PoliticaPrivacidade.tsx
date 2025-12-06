import styles from "../styles/PoliticaPrivacidade.module.css";
function PoliticaPrivacidade() {
  return (
    <section className={styles.PoliticaSection}>
      <div className={styles.navPoliticaPrivacidade}>
        <h1>POLÍTICA DE PRIVACIDADE</h1>
        <p>
          Na La Pizza, sua privacidade é nossa prioridade. Aqui, explicamos como
          cuidamos das suas informações pessoais para garantir sua segurança e
          confiança.
        </p>
      </div>
      <section className={styles.section}>
        <div className={styles.container}>
          <article>
            <h2 className={styles.title}>Política de Privacidade</h2>
            <p className={styles.text}>
              Ao utilizar nosso e-commerce, poderemos coletar os seguintes
              dados:
            </p>
            <ul className={styles.list}>
              <li>
                <strong>Dados pessoais:</strong> nome, e-mail, telefone e
                endereço de entrega.
              </li>
              <li>
                <strong>Dados de pagamento:</strong> processados por meio de
                parceiros (Stripe, PayPal, instituições bancárias), não sendo
                armazenados diretamente por nós.
              </li>
              <li>
                <strong>Dados de navegação:</strong> cookies, endereço IP, tipo
                de dispositivo e páginas acessadas.
              </li>
            </ul>
          </article>

          <article>
            <h2 className={styles.title}>Uso das Informações</h2>
            <p className={styles.text}>
              As informações coletadas são utilizadas para:
            </p>
            <ul className={styles.list}>
              <li>Processar e entregar seus pedidos;</li>
              <li>
                Enviar confirmações, notas fiscais e atualizações do pedido;
              </li>
              <li>
                Melhorar a navegação no site e personalizar a experiência;
              </li>
              <li>Entrar em contato em caso de dúvidas ou suporte;</li>
              <li>Divulgar promoções e novidades, quando autorizado.</li>
            </ul>
          </article>

          <article>
            <h2 className={styles.title}>Compartilhamento de Informações</h2>
            <p className={styles.text}>
              A La Pizza{" "}
              <strong>não vende nem aluga seus dados pessoais.</strong>
            </p>
            <p className={styles.text}>
              Podemos compartilhar informações apenas com:
            </p>
            <ul className={styles.list}>
              <li>Parceiros logísticos (entregadores e transportadoras);</li>
              <li>Processadores de pagamento (transações seguras);</li>
              <li>Autoridades legais, quando exigido por lei.</li>
            </ul>
          </article>

          <article>
            <h2 className={styles.title}>Armazenamento e Segurança</h2>
            <ul className={styles.list}>
              <li>
                Utilizamos medidas de segurança contra acessos não autorizados;
              </li>
              <li>Os dados são armazenados em servidores seguros;</li>
              <li>Você pode solicitar exclusão ou alteração dos seus dados.</li>
            </ul>
          </article>

          <article>
            <h2 className={styles.title}>Cookies</h2>
            <p className={styles.text}>
              Nosso site utiliza <strong>cookies</strong> para:
            </p>
            <ul className={styles.list}>
              <li>Melhorar a usabilidade;</li>
              <li>Memorizar preferências de navegação;</li>
              <li>
                Oferecer recomendações personalizadas. Você pode desativar os
                cookies, mas algumas funções podem ser afetadas.
              </li>
            </ul>
          </article>

          <article>
            <h2 className={styles.title}>Direitos do Usuário</h2>
            <p className={styles.text}>
              Conforme a{" "}
              <strong>
                Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018)
              </strong>
              , você tem direito de:
            </p>
            <ul className={styles.list}>
              <li>Solicitar acesso aos seus dados;</li>
              <li>Corrigir informações incorretas;</li>
              <li>Solicitar a exclusão de dados pessoais;</li>
              <li>Revogar consentimentos dados anteriormente.</li>
            </ul>
          </article>

          <article>
            <h2 className={styles.title}>Alterações desta Política</h2>
            <p className={styles.list}>
              A La Pizza pode atualizar esta Política periodicamente. Sempre que
              houver alterações, a nova versão estará disponível no site.
            </p>
          </article>

          <article>
            <h2 className={styles.title}>Contato</h2>
            <ul className={styles.list}>
              <li>📧 pizzaria@lapizza.com</li>
              <li>📞 (11) 98147-4757</li>
            </ul>
          </article>
        </div>
      </section>
    </section>
  );
}

export default PoliticaPrivacidade;
