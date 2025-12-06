import ModalCancelar from "../components/modais/ModalCancelar";
import {useUserStore, type UserStore} from "@packages/store/useUserStore";
import styles from "../styles/MeusPedidos.module.css";
import { useEffect, useState } from "react";
import { api } from "@packages/api/api";
import type { Order } from "@packages/types/types";
import getStatusClass from "../utils/getStatusClass";
import { toast } from "react-toastify";
import { useOrder } from "../hooks/useOrder";

function MeusPedidos() {  
  const user = useUserStore((s:UserStore) => s.user);
const [, setPedidos] = useState<Order[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<Order[]>([]);
  const [dadosSearch, setDadosSearch] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const { pagarPedido } = useOrder();

  const handlePedido = async () => {
    const data = (await api.get(`/orders/`)).data;

    const pedidosUser = data.filter((i:Order) => i.userId === user?.id);
    setPedidos(pedidosUser);
    
  };
  const fetchOrders = async () => {
    try {
      const data = (await api.get(`/orders/`)).data;

      setOrders(data);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
    handlePedido();
  }, []);

  const cancelarPedido = async (id: number) => {
    try {
      await api.put(`/orders/${id}`, { status: "CANCELADO" });
      handlePedido();
      toast.success("Pedido Cancelado Com Sucesso");
    } catch (err) {
      console.error(err);
    }
  };

  const abrirModal = (id: number) => {
    setPedidoSelecionado(id);
    setModalOpen(true);
  };
  const normalizar = (txt: string) =>
    txt
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filtrar = () => {
    const texto = normalizar(dadosSearch);

    let filtrados = orders;

    if (statusFilter) {
      filtrados = filtrados.filter(
        (i) => normalizar(i.status) === normalizar(statusFilter)
      );
    }

    if (texto.trim()) {
      filtrados = filtrados.filter((i) =>
        normalizar(i.items.map((p) => p.sabor).join(" ")).includes(texto)
      );
    }

    setSearchTerm(filtrados);
  };

  useEffect(() => {
    filtrar();
  }, [statusFilter, dadosSearch, orders]);

  return (
    <section className={styles.pedidosContainer}>
      <div className={styles.navPedidos}>
        <h1>MEUS PEDIDOS</h1>
      </div>

      <div className={styles.pedidosList}>
        <header className={styles.filterWrapper}>
          <div className={styles.filterGroup}>
            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="PENDENTE">Pendente</option>
              <option value="PAID">Pago</option>
              <option value="EM_PREPARAÇÃO">Em preparação</option>
              <option value="ENTREGUE">Entregue</option>
              <option value="CANCELADO">Cancelado</option>
            </select>

            <input
              type="text"
              placeholder="Buscar por sabor..."
              className={styles.filterInput}
              value={dadosSearch}
              onChange={(e) => setDadosSearch(e.target.value)}
            />
          </div>
        </header>

        {searchTerm.length === 0 ? (
          <p className={styles.semPedidos}>Nenhum pedido encontrado.</p>
        ) : (
          searchTerm.map((pedido) => (
            <div key={pedido.id} className={styles.cardPedido}>
              <header className={styles.pedidoHeader}>
                <h2>Pedido #{pedido.id}</h2>
                <span
                  className={`${styles.status} ${getStatusClass(
                    pedido.status,
                    styles
                  )}`}
                >
                  {pedido.status}
                </span>
              </header>

              <div className={styles.itensList}>
                {pedido.items.map((item) => (
                  <div key={item.id} className={styles.item}>
                    <img src={item.imagem!} alt={item.sabor} />
                    <div className={styles.itemInfo}>
                      <h3>{item.sabor}</h3>
                      <h4>{item.descricao}</h4>
                      <h4>Quantidade: {item.quantidade}</h4>
                      <p><strong>R$ {item.precoUnitario.toFixed(2)}</strong></p>
                    </div>
                  </div>
                ))}
              </div>

              <footer className={styles.pedidoFooter}>
                <h3>Total: R$ {pedido.precoTotal.toFixed(2)}</h3>
</footer>

<div className={styles.btnOption}>
                {pedido.status === "PENDENTE" && (
                  <button
                    className={styles.btnPagar}
                    onClick={() => pagarPedido(pedido)}
                  >
                    Pagar Agora
                  </button>
                )}

                {["PENDENTE", "PAID", "EM_PREPARAÇÃO"].includes(
                  pedido.status
                ) && (
                  <button
                    className={styles.btnCancelar}
                    onClick={() => abrirModal(pedido.id)}
                  >
                    Cancelar pedido
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <ModalCancelar
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          if (pedidoSelecionado) {
            cancelarPedido(pedidoSelecionado);
          }
          setModalOpen(false);
        }}
      />
    </section>
  );
}

export default MeusPedidos;
