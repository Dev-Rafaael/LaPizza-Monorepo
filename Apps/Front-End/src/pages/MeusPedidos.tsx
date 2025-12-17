import ModalCancelar from "../components/modais/ModalCancelar";
import { useUserStore, type UserStore } from "@packages/store/useUserStore";
import styles from "../styles/MeusPedidos.module.css";
import { useEffect, useState } from "react";
import { api } from "@packages/api/api";
import type { LocalOrder, Order, OrderView } from "@packages/types/types";
import getStatusClass from "../utils/getStatusClass";
import { toast } from "react-toastify";
import { useOrder } from "../hooks/useOrder";
import { useOrderStore } from "../store/useOrderStore";
import { Link } from "react-router-dom";



function MeusPedidos() {
  const user = useUserStore((s: UserStore) => s.user);
  const { orders: localOrders } = useOrderStore();
  const { pagarPedido } = useOrder();

  const [ordersView, setOrdersView] = useState<OrderView[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderView[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<number | null>(null);
  const [dadosSearch, setDadosSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const mapApiOrder = (order: Order): OrderView => ({
    id: order.id,
    status: order.status,
    items: order.items,
    precoTotal: order.precoTotal,
  });

  const mapLocalOrder = (order: LocalOrder): OrderView => ({
    id: order.id,
    status: order.status,
    items: order.items,
    precoTotal: order.items.reduce(
      (total, item) => total + item.precoTotal,
      0
    ),
  });

  useEffect(() => {
    const loadOrders = async () => {
      try {
        if (user?.role === "admin") {
          const { data } = await api.get<Order[]>("/orders");
          setOrdersView(data.map(mapApiOrder));
        } else {
          setOrdersView(localOrders.map(mapLocalOrder));
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadOrders();
  }, [user, localOrders]);

  /* 🔹 FILTROS */
  const normalizar = (txt: string) =>
    txt
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  useEffect(() => {
    let filtrados = [...ordersView];

    if (statusFilter) {
      filtrados = filtrados.filter(
        (p) => normalizar(p.status) === normalizar(statusFilter)
      );
    }

    if (dadosSearch.trim()) {
      const texto = normalizar(dadosSearch);
      filtrados = filtrados.filter((p) =>
        normalizar(p.items.map((i) => i.sabor).join(" ")).includes(texto)
      );
    }

    setFilteredOrders(filtrados);
  }, [ordersView, statusFilter, dadosSearch]);

  /* 🔹 AÇÕES */
  const cancelarPedido = async (id: number) => {
    try {
      await api.put(`/orders/${id}`, { status: "CANCELADO" });
      toast.success("Pedido cancelado com sucesso");

      if (user?.role === "admin") {
        const { data } = await api.get<Order[]>("/orders");
        setOrdersView(data.map(mapApiOrder));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const abrirModal = (id: number) => {
    setPedidoSelecionado(id);
    setModalOpen(true);
  };

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
              <option value="SAIU_PARA_ENTREGA">Saiu Para Entrega</option>
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

        {filteredOrders.length === 0 ? (
          <p className={styles.semPedidos}>Nenhum pedido encontrado.</p>
        ) : (
          filteredOrders.map((pedido) => (
            <div key={pedido.id} className={styles.cardPedido}>
              <header className={styles.pedidoHeader}>
                <h2>Pedido #{pedido.id}</h2>
                <div className={styles.infoPedido}>
                <span
                  className={`${styles.status} ${getStatusClass(
                    pedido.status,
                    styles
                  )}`}
                >
                  {  pedido.status === "PAID"
                  ? "PAGO"
                  : pedido.status === "EM_PREPARACAO"
                  ? "EM PREPARAÇÃO"
                  : pedido.status === "SAIU_PARA_ENTREGA"
                  ? "SAIU PARA ENTREGA"
                  : pedido.status}
                </span>
                <Link to={`/order-status/${pedido.id}`}>👁️Ver Status</Link>
                </div>
              </header>
  {pedido.items.map((item) => (
              <div className={styles.itensList}>
              
                  <div key={item.id} className={styles.item}>
                    <img src={item.imagem!} alt={item.sabor} />
                    <div className={styles.itemInfo}>
                      <h3>{item.sabor}</h3>
                      <h4>{item.descricao}</h4>
                      <h4>Quantidade: {item.quantidade}</h4>
                      <p>
                        <strong>R$ {item.precoUnitario.toFixed(2)}</strong>
                      </p>
                    </div>
                   
                  </div>
                <footer className={styles.pedidoFooter}>
                <h3>Total: R$ {item.precoTotal.toFixed(2)}</h3>
              </footer>
              </div>
  ))}
             

              <div className={styles.btnOption}>
                {pedido.status === "PENDENTE" && user?.role === 'admin' &&(
                  <button
                    className={styles.btnPagar}
                    onClick={() => pagarPedido(pedido as Order)}
                  >
                    Pagar Agora
                  </button>
                )}

                {["PENDENTE", "PAID", "EM_PREPARAÇÃO"].includes(
                  pedido.status
                ) && user?.role === 'admin' && (
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
