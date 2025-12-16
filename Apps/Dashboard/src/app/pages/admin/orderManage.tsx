import { toast } from "react-toastify";
import useOrderService from "../../../services/orderService";
import { useEffect, type FormEvent } from "react";
import styles from "../../../styles/Order.module.css";
import { useUserStore } from "@packages/store/useUserStore";
function PedidosManage() {
  const {
    orders,
    fetchOrders,
    nome,
    setNome,
    sobreNome,
    setSobreNome,
    email,
    setEmail,
    cep,
    setCep,
    telefone,
    setTelefone,
    nascimento,
    editId,
    setEditId,
    updateOrder,
    setNascimento,
    status,
    setStatus,
    searchTerm,
    dadosSearch,
    setDadosSearch,
    createOrder,
    edit,
    deleteOrderConfirm,
    isCreating,
    setIsCreating,
    limparFormulario,
    searchButton,
  } = useOrderService();
  useEffect(() => {
    fetchOrders();
  }, []);
  const user = useUserStore((e) => e.user);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const orderData = {
      nome,
      sobreNome,
      email,
      cep,
      telefone,
      nascimento,
      status,
    };
    try {
      if (editId === null) {
        await createOrder(orderData);
        toast.success(" Order Criado Com Sucesso!");
      } else {
        await updateOrder(editId, orderData);
        toast.success(" Order Atualizado Com Sucesso!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Não Foi Possivel Criar Order");
    } finally {
      setEditId(null);
    }
  };
  return (
    <section className={styles.container}>
      <header className={styles.searchBarWrapper}>
        <input
          type="text"
          placeholder="Pesquisar informações dos Orders..."
          className={styles.searchInput}
          value={dadosSearch}
          onChange={(e) => setDadosSearch(e.target.value)}
        />
        <button className={styles.searchButton} onClick={searchButton}>
          🔍
        </button>
      </header>
      {orders.length === 0 || (!isCreating && editId === null) ? (
        <>
          <div className={styles.orderItemFunction}>
            <h2 className={styles.title}>📦 Orders</h2>
            {user?.role === "admin" && (
              <button
                className={styles.btnNew}
                onClick={() => {
                  setIsCreating(true);
                  setEditId(null);
                  limparFormulario();
                }}
              >
                ➕ Novo Order
              </button>
            )}
          </div>

          <article className={styles.list}>
            {searchTerm.length === 0 ? (
              <p className={styles.searchFail}>Order Não Encontrado</p>
            ) : (
              searchTerm.map((pedido, i) =>
                pedido.items.map((item) => (
                  <div className={styles.card} key={i}>
                    <header className={styles.cardHeader}>
                      <h3 className={styles.nome}>
                        {pedido.user?.nome ?? "—"}
                      </h3>
                      <span className={styles.email}>
                        {pedido.user?.email ?? "—"}
                      </span>
                    </header>

                    <section className={styles.pedidoInfo}>
                      <p className={styles.info}>
                        <strong>Pizza:</strong> {item.sabor} ({item.quantidade}{" "}
                        un)
                      </p>

                      <p className={styles.info}>
                        <strong>Descrição:</strong> {item.descricao}
                      </p>
                    </section>

                    <section className={styles.endereco}>
                      <p className={styles.info}>
                        <strong>Endereço:</strong> {pedido.address?.rua},{" "}
                        {pedido.address?.numero} — {pedido.address?.bairro},{" "}
                        {pedido.address?.cidade}
                      </p>

                      <p className={styles.subInfo}>
                       <strong> CEP:</strong> {pedido.address?.cep} | {pedido.address?.estado}
                      </p>

                      {pedido.address?.complemento && (
                        <p className={styles.subInfo}>
                           <strong>Complemento:</strong> {pedido.address.complemento}
                        </p>
                      )}
                    </section>

                    <p className={styles.preco}>
                      <strong>Total:</strong> R${" "}
                      {Number(item.precoTotal).toFixed(2)}
                    </p>

                    <p
                      className={`${styles.status} ${
                        styles[pedido.status.toLowerCase()]
                      }`}
                    >
                   Status: {
                      pedido.status === "PAID"
                        ? "PAGO"
                        : pedido.status === "EM_PREPARACAO"
                        ? "EM PREPARAÇÃO"
                        : pedido.status === "SAIU_PARA_ENTREGA"
                        ? "SAIU PARA ENTREGA"
                        : pedido.status
                    }

                    </p>
                    {user?.role === "admin" && (
                      <div className={styles.actions}>
                        <button
                          className={styles.btnEdit}
                          onClick={() => edit(pedido)}
                        >
                          Editar
                        </button>

                        <button
                          className={styles.btnDelete}
                          onClick={() => deleteOrderConfirm(pedido.id)}
                        >
                          Deletar
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )
            )}
          </article>
        </>
      ) : (
        <article className={styles.formWrapper}>
          <h1 className={styles.titleForm}>
            {editId ? "Editar Order" : "Criar Order"}
          </h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <input
                type="text"
                value={nome}
                placeholder="Nome Cliente"
                onChange={(e) => setNome(e.target.value)}
              />

              <input
                type="text"
                value={sobreNome}
                placeholder="Sobrenome Cliente"
                onChange={(e) => setSobreNome(e.target.value)}
              />

              <input
                type="text"
                value={email}
                placeholder="Email Cliente"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="text"
                value={cep}
                placeholder="CEP Cliente"
                onChange={(e) => setCep(e.target.value)}
              />

              <input
                type="text"
                value={telefone}
                placeholder="Telefone Cliente"
                onChange={(e) => setTelefone(e.target.value)}
              />

              <input
                type="text"
                value={nascimento}
                placeholder="Nascimento Cliente"
                onChange={(e) => setNascimento(e.target.value)}
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="PENDENTE">Pendente</option>
                <option value="PAGO">Pago</option>
                <option value="EM_PREPARAÇÃO">Em preparação</option>
                <option value="SAIU_PARA_ENTREGA">Saiu para entrega</option>
                <option value="ENTREGUE">Entregue</option>
                <option value="CANCELADO">Cancelar</option>
              </select>
            </div>

            <button type="submit" className={styles.btnSubmit}>
              Enviar
            </button>
          </form>
        </article>
      )}
    </section>
  );
}

export default PedidosManage;
