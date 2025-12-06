import { useNavigate } from "react-router-dom";
import styles from "../styles/AuthModal.module.css";

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AuthModal({ visible, onClose }: AuthModalProps) {
  const navigate = useNavigate();

  if (!visible) return null;

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>🍕 Entre ou crie uma conta</h2>
        <p>Para continuar com seu pedido, é necessário estar logado.</p>
        <div className={styles.actions}>
          <button
            className={styles.login}
            onClick={() => handleNavigate("/login")}
          >
            Fazer login
          </button>
          <button
            className={styles.register}
            onClick={() => handleNavigate("/cadastro")}
          >
            Criar conta
          </button>
        </div>
        <button className={styles.close} onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
