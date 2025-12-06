
import styles from "../../styles/ModalCancelar.module.css";

interface ModalCancelarProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ModalCancelar({ isOpen, onClose, onConfirm }: ModalCancelarProps) {
  if (!isOpen) return null;

  return (
    <>
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Tem certeza que deseja cancelar o pedido?</h3>

        <div className={styles.modalButtons}>
          <button className={styles.btnConfirmar} onClick={onConfirm}>
            Sim, cancelar
          </button>

          <button className={styles.btnFechar} onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default ModalCancelar;
