import { useEffect, type FormEvent } from "react";
import { toast } from "react-toastify";
import { useOrderItemsService } from "../../../services/orderItemService";
import styles from "../../../styles/OrderItems.module.css";
import { useUserStore } from "@packages/store/useUserStore";
function OrderItemManage() {
  const {
    orderItems,
    sabor,
    setSabor,
    descricao,
    setDescricao,
    imagem,
    setImagem,
    precoUnitario,
    setPrecoUnitario,
    quantidade,
    setQuantidade,
    precoTotal,
    setPrecoTotal,
    searchTerm,
    dadosSearch,
    setDadosSearch,
    fetchOrderItems,
    createOrderItem,
    updateOrderItem,
    edit,
    editId,
    setEditId,
    deleteOrderItemConfirm,
    isCreating,
    setIsCreating,
    limparFormulario,
       searchButton
  } = useOrderItemsService();
  useEffect(() => {
    fetchOrderItems();
  }, []);
   const user = useUserStore((e)=> e.user)
  const handleOrderItem = async (e: FormEvent) => {
    e.preventDefault();
    const orderItemData = {
      sabor,
      descricao,
      imagem,
      precoUnitario,
      quantidade,
      precoTotal,
    };
    try {
      if (editId === null) {
        await createOrderItem(orderItemData);
        toast.success("Order Item Criado Com Sucesso");
      } else {
        await updateOrderItem(editId, orderItemData);
        toast.success("Order Item Atualizado Com Sucesso");
      }
    } catch (error) {
      console.log(error);
      toast.error("Não Foi Possivel Criar OrderItem");
    } finally {
      setEditId(null);
    }
  };
  console.log(orderItems);

  return (
    <section className={styles.container}>
      <header className={styles.searchBarWrapper}>
        <input
          type="text"
          placeholder="Pesquisar informações da Pizza..."
          className={styles.searchInput}
          value={dadosSearch}
          onChange={(e) => setDadosSearch(e.target.value)}
        />
        <button className={styles.searchButton} onClick={searchButton}>🔍</button>
      </header>
      {orderItems.length === 0 || (!isCreating && editId === null) ? (
        <>
          <div className={styles.orderItemFunction}>
            <h2 className={styles.title}>🛒Order Items</h2>
           {user?.role === 'admin'&&  <button
              className={styles.btnNew}
              onClick={() => {
                setIsCreating(true);
                setEditId(null);
                limparFormulario();
              }}
            >
              🛒Novo Order Item
            </button>
}
          </div>
          <article className={styles.list}>
            {searchTerm.length === 0 ?
             <p className={styles.searchFail}>Order Item Não Encontrado</p>
            :searchTerm.map((orderItem, i) => (
              <div className={styles.card} key={i}>
                <p className={styles.nome}>{orderItem.sabor}</p>
                <p className={styles.descricao}>{orderItem.descricao}</p>
                <p className={styles.info}>Qtd: {orderItem.quantidade}</p>
                <p className={styles.info}>
                  Unitário: R$ {orderItem.precoUnitario.toFixed(2)}
                </p>
                <p className={styles.preco}>
                  Total: R$ {orderItem.precoTotal.toFixed(2)}
                </p>
 {user?.role === 'admin'&&
                <div className={styles.actions}>
                  <button
                    className={styles.btnEdit}
                    onClick={() => edit(orderItem)}
                  >
                    Editar
                  </button>

                  <button
                    className={styles.btnDelete}
                    onClick={() => deleteOrderItemConfirm(orderItem.id)}
                  >
                    Deletar
                  </button>
                </div>
}
              </div>
            ))}
          </article>
        </>
      ) : (
        <article className={styles.formWrapper}>
          <h1 className={styles.titleForm}>
            {editId ? "Editar  Produto" : "Adicionar Produto"}
          </h1>

          <form className={styles.form} onSubmit={handleOrderItem}>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label>Nome</label>
                <input
                  type="text"
                  value={sabor}
                  placeholder="Sabor"
                  onChange={(e) => setSabor(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label>Descrição</label>
                <input
                  type="text"
                  value={descricao}
                  placeholder="Descrição"
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label>Imagem</label>
                <input
                  type="text"
                  value={imagem}
                  placeholder="URL da imagem"
                  onChange={(e) => setImagem(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label>Quantidade</label>
                <input
                  type="number"
                  value={quantidade}
                  placeholder="Quantidade"
                  onChange={(e) => setQuantidade(parseFloat(e.target.value))}
                />
              </div>

              <div className={styles.field}>
                <label>Preço Unitário</label>
                <input
                  type="number"
                  value={precoUnitario}
                  placeholder="Preço unitário"
                  onChange={(e) => setPrecoUnitario(parseFloat(e.target.value))}
                />
              </div>

              <div className={styles.field}>
                <label>Preço Total</label>
                <input
                  type="number"
                  value={precoTotal}
                  placeholder="Preço total"
                  onChange={(e) => setPrecoTotal(parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className={styles.btnGroup}>
              <button type="submit" className={styles.btnSave}>
                {" "}
                {editId ? "Salvar" : "Criar"}
              </button>
              <button
                type="button"
                className={styles.btnClose}
                onClick={() => {
                  setIsCreating(false);
                  setEditId(null);
                  limparFormulario();
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </article>
      )}
    </section>
  );
}

export default OrderItemManage;
