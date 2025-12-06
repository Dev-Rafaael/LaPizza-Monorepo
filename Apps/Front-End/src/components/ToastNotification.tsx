import { useEffect } from "react";
import styles from "../styles/Toast.module.css";

export function ToastNotification({ message, onClose }:any) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.toast}>
      <strong>Notificação</strong>
      <p>{message}</p>
    </div>
  );
}
