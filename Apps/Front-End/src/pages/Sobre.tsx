import styles from "../styles/Sobre.module.css";
function Sobre() {
  return (
<section className={styles.sobreSection}>

 <div className={styles.navSobre}>
          <h1>SOBRE NÓS</h1>
          <p>A cada passo que damos em direção à mudança, descobrimos 
        novas oportunidades para crescer e evoluir.</p>
        </div>
  <div className={styles.content}>
    <div className={styles.text}>
      <p>
        Bem-vindo à <strong>La Pizza</strong>, o lugar onde tradição, sabor e qualidade se encontram para
        transformar cada pedaço em uma experiência inesquecível! Desde nossa fundação, temos um único
        propósito: levar até você pizzas preparadas com ingredientes selecionados, massa artesanal e muito
        carinho. Cada receita é pensada para proporcionar momentos especiais em família, entre amigos ou até
        mesmo naquela noite que você merece saborear algo único.
      </p>

      <div className={styles.infoBlocks}>
        <div>
          <h2>Nossa Missão</h2>
          <p>
            Oferecer pizzas de qualidade, com sabor autêntico e atendimento diferenciado, sempre prezando pela
            satisfação de nossos clientes.
          </p>
        </div>

        <div>
          <h2>Nossos Valores</h2>
          <ul>
            <li><strong>Qualidade:</strong> utilizamos ingredientes frescos e de confiança.</li>
            <li><strong>Tradição:</strong> receitas que respeitam o verdadeiro espírito da pizza artesanal.</li>
            <li><strong>Inovação:</strong> além dos clássicos, criamos sabores especiais que surpreendem.</li>
            <li><strong>Respeito:</strong> valorizamos nossos clientes, colaboradores e fornecedores.</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Vídeo */}
    <div className={styles.video}>
      <iframe
        src="https://www.youtube.com/embed/STa_UtZP3tg?autoplay=1&mute=1"
        title="Vídeo La Pizza"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        
      ></iframe>
    </div>
  </div>
</section>

  );
}

export default Sobre;
