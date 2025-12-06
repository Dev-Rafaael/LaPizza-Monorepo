import { useUserNotification } from "../store/useNotificationStore";
import styles from "../styles/NotificationDropdown.module.css";

export function NotificationDropdown() {
  const notifications = useUserNotification((s) => s.notifications);

  if (notifications.length === 0) {
    return (
      <div className={styles.dropdown}>
        <p>Sem notificações</p>
      </div>
    );
  }

  return (
    <div className={styles.dropdown}>
      {notifications.map((n) => (
        <div key={n.id} className={styles.item}>
          <strong>{n.titulo}</strong>
          <p>{n.mensagem}</p>
          <small>{new Date(n.criadoEm).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
