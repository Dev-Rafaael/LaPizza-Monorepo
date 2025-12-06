
import { FaWhatsapp } from 'react-icons/fa'
import classes from '../styles/WhatsappIcon.module.css'
function WhatsappIcon() {
  return (
    <>
    <div className={classes.zap}>
          <div className={classes.bolaZap}></div>
            <a
        href="https://wa.me/5511998765432?text=Olá!"
        target="_blank"
        className={classes.whatsappIcon}
        rel="noopener noreferrer"
      >
        <FaWhatsapp className={classes.playIcon} />
      </a>   
          </div>
    </>
  )
}

export default WhatsappIcon