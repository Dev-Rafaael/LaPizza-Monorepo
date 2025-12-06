
import React from "react";
import styles from "../../styles/Modal.module.css";

interface ModalProps {
 
  title: string;
   sabor: string,
  imagem:string,
  precoTotal:number,
  children: React.ReactNode;
  onContinue?: () => void;
  continueText?:string;
  onConfirm?: () => void;
  confirmText?: string;
}

export default function Modal({
  title,
 sabor,
  imagem,
  precoTotal,
  children,
  onContinue,
  continueText = "Continuar Comprando",
  onConfirm,
  confirmText = "Confirmar",
}: ModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <img src={imagem} alt={sabor}/>
        <h3>{sabor}</h3>
        <p>R${precoTotal.toFixed(2)}</p>
        <div className={styles.content}>{children}</div>
        <div className={styles.buttons}>
            {onContinue && (
              <button onClick={onContinue} className={styles.cancel}>
            {continueText}
          </button>
            )}
          
          {onConfirm && (
            <button onClick={onConfirm} className={styles.confirm}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
