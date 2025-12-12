import { useEffect, type FormEvent } from "react";
import { toast } from "react-toastify";
import useAdicionaisService from "../../../services/adicionaisService";
import styles from "../../../styles/Adicionais.module.css";
import { useUserStore } from "@packages/store/useUserStore";

function AdicionaisManage() {
  const {
    adicionais,
    createAdicionais,
    fetchAdicionais,
    nome,
    setNome,
    preco,
    setPreco,
    searchTerm,
    dadosSearch,
    setDadosSearch,
    edit,
    editId,
    setEditId,
    updateAdicionais,
    deleteAdicionaisConfirm,
    isCreating,
    setIsCreating,
    limparFormulario,
       searchButton
  } = useAdicionaisService();

  useEffect(() => {
    fetchAdicionais();
  }, []);
  const user = useUserStore((e)=> e.user)
  const handleAdicionais = async (e: FormEvent) => {
    e.preventDefault();

    const adicionalData = {
      nome,
      preco,
    };

    try {
      if (editId === null) {
        await createAdicionais(adicionalData);
        toast.success("Adicional Criado Com Sucesso!");
      } else {
        await updateAdicionais(editId, adicionalData);
        toast.success("Adicional Criado Com Sucesso!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Não Foi Possivel Criar Adicional");
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
      {adicionais.length === 0 || (!isCreating && editId === null) ? (
        <>
          <div className={styles.adicionaisFunction}>
            <h2 className={styles.title}>➕Adicionais</h2>
          {user?.role === 'admin'&& <button
              className={styles.btnNew}
              onClick={() => {
                setIsCreating(true);
                setEditId(null);
                limparFormulario();
              }}
            >
              ➕ Novo Adicional
            </button>
}
          </div>

          <article className={styles.list}>
            {searchTerm.length === 0 ?
             <p className={styles.searchFail}>Adicionais Não Encontrado</p>
            :searchTerm.map((adicional, i) => (
              <div className={styles.card} key={i}>
                <p className={styles.nome}>{adicional.nome}</p>
                <p className={styles.preco}>R$ {adicional.preco.toFixed(2)}</p>
    {user?.role === 'admin'&&
                <div className={styles.actions}>
                  <button
                    className={styles.btnEdit}
                    onClick={() => edit(adicional)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.btnDelete}
                    onClick={() => deleteAdicionaisConfirm(adicional.id)}
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
            {editId ? "Editar Adicional" : "Criar Adicional"}
          </h1>

          <form className={styles.form} onSubmit={handleAdicionais}>
            <label>Nome</label>
            <input
              type="text"
              value={nome}
              placeholder="nome"
              onChange={(e) => setNome(e.target.value)}
            />

            <label>Preço</label>
            <input
              type="text"
              value={preco.toFixed(2)}
              placeholder="Preço"
              onChange={(e) => setPreco(parseFloat(e.target.value))}
            />

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

export default AdicionaisManage;
