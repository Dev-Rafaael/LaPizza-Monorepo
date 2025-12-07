import React, { useEffect } from "react";
import usePizzasService from "../../../services/pizzasService";
import { toast } from "react-toastify";
import styles from "../../../styles/PizzasManage.module.css";

function PizzasManage() {
  const {
    pizzas,
    createPizza,
    fetchPizzas,
    sabor,
    setSabor,
    descricao,
    setDescricao,
    editId,
    setEditId,
    preco,
    setPreco,
    imagem,
    setImagem,
    searchTerm,
    dadosSearch,
    setDadosSearch,
    deletePizzaConfirm,
    updatePizza,
    edit,
    isCreating,
    setIsCreating,
    limparFormulario,
    searchButton
  } = usePizzasService();

  useEffect(() => {
    fetchPizzas();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pizzaData = { sabor, descricao, preco, imagem };

    try {
      if (editId === null) {
        await createPizza(pizzaData);
        toast.success("Pizza Criada com Sucesso");
      } else {
        await updatePizza(editId, pizzaData);
        toast.success("Pizza atualizada!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEditId(null);
    }
  };

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
      {pizzas.length === 0 || (!isCreating && editId === null) ? (
        <>
          <div className={styles.pizzasFunction}>
            <h2 className={styles.title}>🍕Pizzas</h2>
            <button
              className={styles.btnNew}
              onClick={() => {
                setIsCreating(true);
                setEditId(null);
                limparFormulario();
              }}
            >
              🍕Nova Pizza
            </button>
          </div>
          <article className={styles.list}>
            {searchTerm.length === 0 ?
             <p className={styles.searchFail}>Pizza Não Encontrado</p>
            :searchTerm.map((pizza) => (
              <div className={styles.card} key={pizza.id}>
                <img src={pizza.imagem} />
                <h3>{pizza.sabor}</h3>
                <h4>{pizza.descricao}</h4>
                <h5>R${pizza.preco.toFixed(2)}</h5>

                <div className={styles.actions}>
                  <button
                    className={styles.actionBtn}
                    onClick={() => edit(pizza)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.actionBtn}
                    onClick={() => deletePizzaConfirm(pizza.id)}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </article>
        </>
      ) : (
        <article className={styles.formCard}>
          <h1 className={styles.titleForm}>
            {editId ? "Editar Pizza" : "Criar Pizza"}
          </h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              value={sabor}
              placeholder="Sabor"
              onChange={(e) => setSabor(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              value={descricao}
              placeholder="Descrição"
              onChange={(e) => setDescricao(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              value={preco.toFixed(2)}
              placeholder="Preço"
              onChange={(e) => setPreco(parseFloat(e.target.value))}
              className={styles.input}
            />
            <input
              type="text"
              value={imagem}
              placeholder="URL da Imagem"
              onChange={(e) => setImagem(e.target.value)}
              className={styles.input}
            />
            <div className={styles.btnGroup}>
              <button type="submit" className={styles.btnSave}>
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

export default PizzasManage;
