import { useEffect, type FormEvent } from "react";
import styles from "../../../styles/Address.module.css";
import { toast } from "react-toastify";
import useAddressService from "../../../services/addressService";

function AddressManage() {
  const {
    addresses,
    createAddress,
    cep,
    setCEP,
    estado,
    setEstado,
    cidade,
    setCidade,
    bairro,
    setBairro,
    rua,
    setRua,
    numero,
    setNumero,
    complemento,
    setComplemento,
    searchTerm,
    dadosSearch,
    setDadosSearch,
    fetchAddresses,
    edit,
    editId,
    setEditId,
    deleteAddressConfirm,
    updateAddress,
    isCreating,
    setIsCreating,
    limparFormulario,
       searchButton
  } = useAddressService();
  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddress = async (e: FormEvent) => {
    e.preventDefault();

    const addressData = {
      cep,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      complemento,
    };
    try {
      if (editId === null) {
        await createAddress(addressData);
        toast.success("Endereço Criado Com Sucesso!");
         setEditId(null);
      } else {
        await updateAddress(editId, addressData);
        toast.success("Endereço Atualizado Com Sucesso!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Não foi possivel criar Endereço");

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
      {addresses.length === 0 || (!isCreating && editId === null) ? (
        <>
        <div className={styles.addressFunction}>
          <h2 className={styles.title}>🏠Endereços</h2>
          <button
            className={styles.btnNew}
            onClick={() => {
              setIsCreating(true);
              setEditId(null);
              limparFormulario();
            }}
          >
            🏠 Novo Endereço
          </button>
          </div>
          <article className={styles.addressList}>
            {searchTerm.length === 0 ?
             <p className={styles.searchFail}>Endereço Não Encontrado</p>
            :searchTerm.map((address, i) => (
              <div key={i} className={styles.card}>
                <p>
                  <strong>CEP:</strong> {address.cep}
                </p>
                <p>
                  <strong>Rua:</strong> {address.rua}
                </p>
                <p>
                  <strong>Bairro:</strong> {address.bairro}
                </p>
                <p>
                  <strong>Cidade:</strong> {address.cidade}
                </p>
                <p>
                  <strong>Número:</strong> {address.numero}
                </p>
                <p>
                  <strong>Complemento:</strong> {address.complemento}
                </p>

                <div className={styles.actions}>
                  <button
                    className={styles.btnEdit}
                    onClick={() => edit(address)}
                  >
                    Editar
                  </button>

                  <button
                    className={styles.btnDelete}
                    onClick={() => deleteAddressConfirm(address.id)}
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
            {editId
              ? "Editar  Endereço de Entrega "
              : "Adicionar Endereço de Entrega "}
          </h1>
          <form onSubmit={handleAddress} className={styles.form}>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>CEP</label>
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCEP(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Estado</label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                >
                  <option value="">Selecione o estado</option>
                  <option value="São Paulo">São Paulo</option>
                  <option value="Rio de Janeiro">Rio de Janeiro</option>
                  <option value="Minas Gerais">Minas Gerais</option>
                </select>
              </div>

              <div className={styles.field}>
                <label>Cidade</label>
                <input
                  type="text"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Bairro</label>
                <input
                  type="text"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Rua</label>
                <input
                  type="text"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Número</label>
                <input
                  type="text"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Complemento</label>
                <input
                  type="text"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
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

export default AddressManage;
