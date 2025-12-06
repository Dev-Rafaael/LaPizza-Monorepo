
import styles from '../styles/Home.module.css'


import Pizza from '../assets/IMG/pizza.jpg'
import Pizza1 from '../assets/IMG/pizza1.jpeg'
import Pizza2 from '../assets/IMG/pizza2.jpg'
import Pizza3 from '../assets/IMG/pizza3.jpg'
import { Link } from 'react-router-dom'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider, { type CustomArrowProps } from 'react-slick';
import { FaPlay } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import AOS from 'aos';
import Modal from 'react-modal';
const CustomPrevArrow: React.FC<CustomArrowProps> =(props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.customArrow}`}
      style={{ ...style, display: "block", left: "10px", zIndex: '997',opacity:'0.3' }}
      onClick={onClick}
    />
  );
};

const CustomNextArrow: React.FC<CustomArrowProps> =(props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.customArrow}`}
      style={{ ...style, display: "block", right: "10px", zIndex: '997',opacity:'0.3'}}
      onClick={onClick}
    />
  );
};
function Home() {
   const [modalIsOpen, setModalIsOpen] = useState(false);


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    prevArrow: <CustomPrevArrow/>,
    nextArrow: <CustomNextArrow />,
    draggable: true,
  };

  const openModal = () => {
    console.log("Modal aberto");
    setModalIsOpen(true);
  };
  
  const closeModal = () => setModalIsOpen(false);

  // EFFEITO DE APARECER 
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out', 
    });
  }, []);
  return (
    <section>
  
      <main className={styles.home}>
        <div className={styles.homeContent}>
  {/* Slider Section */}
  <Slider {...settings} className={styles.imgHome}>
    <div className={styles.slide}>
      <div className={styles.imgContainer}>

          <img src={Pizza1} alt="Pizza 1" className={styles.img} />
      </div>
    </div>
    <div className={styles.slide}>
      <div className={styles.imgContainer}>
          <img src={Pizza2} alt="Pizza 2" className={styles.img} />
  
      </div>
    </div>
    <div className={styles.slide}>
      <div className={styles.imgContainer}>

          <img src={Pizza3} alt="Pizza 3" className={styles.img} />
      </div>
    </div>
  </Slider>

  {/* Content Section */}
  <div className={styles.contentHome}>
    <h1>
      Bem-vindo à <span>La Pizza</span>
    </h1>
    <h3>As melhores pizzas da cidade 🍕</h3>
    <div className={styles.options}>
      <Link to="/Cardapio/">Ver Cardápio</Link>
      <Link to="/Pedidos/">Faça Seu Pedido</Link>
    </div>
  </div>

  {/* Video Section */}
  <div className={styles.video}>
    <div className={styles.videoContainer}>
      <div className={styles.iconContainer}>
        <div className={styles.bola}></div>
        <FaPlay className={styles.playIcon} onClick={openModal} />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        className={styles.videoModal}
        overlayClassName={styles.videoModalOverlay}
        contentLabel="Video Modal"
      >
        <button onClick={closeModal} className={styles.closeButton}>
          X
        </button>
        <iframe
            src="https://www.youtube.com/embed/STa_UtZP3tg?autoplay=1"
          title="La Pizza - Vídeo Promocional"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal>
    </div>
  </div>
</div>

      </main>
      {/* APRESENTACAO  */}
      <section className={styles.pizzaSection}>
  <article className={styles.pizzaContainer}>
    <div className={styles.content}>
    <h3>Experimente nossas pizzas com</h3>
    <h4>Sabor e Qualidade Incomparáveis</h4>
    <p>
      Na <span>La Pizza</span> , preparamos pizzas deliciosas para qualquer ocasião: almoço em família, encontro com amigos ou aquela noite especial.  
      <span>Ingredientes frescos, massa artesanal</span> e <span> combinações únicas</span> que vão conquistar todos os paladares!
    </p>
    <div className={styles.contentBtn}>
      <Link to="/Cardapio/">VEJA NOSSO CARDÁPIO</Link>
    </div>
 </div>
  <div className={styles.contentVideo}>
  <iframe
        src="https://www.youtube.com/embed/STa_UtZP3tg?autoplay=1&mute=1"
        title="Vídeo La Pizza"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        
      ></iframe>
    
  </div>
  </article>
</section>

{/* CARDÁPIO */}
      {/* <section className={styles.cardapio}>
        <h1 className={styles.titleCardapio}>CARDÁPIO</h1>
        <article className={styles.cardapioItens}>
          {pizzas.slice(0,3).map((pizza, index) => (
            <div key={index} className={styles.pizzaItem}>
              <img src={pizza.imagem} alt={`Pizza sabor ${index + 1}`} />
                <h1 className={styles.price}>{pizza.sabor}</h1>
                 <p>{pizza.descricao}</p>
                <h4>R${pizza.preco.toFixed(2)}</h4>
             
            </div>
          ))}
             </article>
          <article className={styles.cardapioOption}>
          <Link to={'/Cardapio'}>Ver Mais</Link>
        </article>
      </section> */}
      {/* SOBRE */}
      <section className={styles.sobreSection} >
        <div className={styles.sobre}>
       <div className={styles.sobreInfo}>
          <p className={styles.sobreNos}>Buscando Pizzas Saborosas?</p>
        <h3>MUITO PRAZER, SOMOS A <span>LA PIZZA</span></h3>
            <h5>Fundada em 2003, a <span>vincci</span> tem como missão oferecer o melhor ambiente e 
            estrutura para que você possa se divertir. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestias esse! Accusamus quibusdam quam suscipit reprehenderit consequuntur? Commodi id hic ipsam ducimus neque quasi</h5>
          <div className={styles.sobreBtn}>
            <Link to="/sobre/">SAIBA MAIS</Link>
          </div>
        </div>
        <div className={styles.sobrefotos}>
              <img src={Pizza} alt="Pizza" />
           
        </div>
     </div>
      </section>

      

      {/* BENEFICIOS E DIFERENCIAS  */}
      {/* <section className={styles.beneficiosContent}>
  <h2 className={styles.title}>
    ⭐ Nossos Diferenciais
  </h2>

  <ul className={styles.lista}>
    {lista.map((beneficio, index) => (
      <li key={index} className={styles.item}>
        <span className={styles.icone}>✅</span> 
        {beneficio}
      </li>
    ))}
  </ul>
</section> */}


      {/* AVALIACOES  */}
 <section className={styles.avaliacoesContent}>
  <h2 className={styles.title}>⭐ Avaliações</h2>

  {/* <div className={styles.grid}>
    {avaliacoes.map((avaliacao, index) => (
      <div key={index} className={styles.card}>
        <p className={styles.estrelas}>
          {"⭐".repeat(avaliacao.estrelas)}
          {"☆".repeat(5 - avaliacao.estrelas)}
        </p>
        <p className={styles.texto}>{avaliacao.texto}</p>
        <p className={styles.nome}>
          <strong>— {avaliacao.nome}</strong>
        </p>
      </div>
    ))}
  </div> */}
</section>

    </section>  
  )
}

export default Home
