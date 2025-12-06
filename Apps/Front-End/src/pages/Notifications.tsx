import { useEffect } from "react";
import { socket } from "../socket/socket";
import { toast } from "react-toastify";

export function Notifications() {
  useEffect(() => {
    socket.on("orderStatusUpdated", (data) => {
      toast.success(`Pedido ${data.orderId} mudou para ${data.newStatus}`);
    });

    return () => {
      socket.off("orderStatusUpdated");
    };
  }, []);

  return null;
}
