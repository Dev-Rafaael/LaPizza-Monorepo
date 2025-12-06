
import useAddress from "../../hooks/useAddress";
import styles from "../../styles/Address.module.css";

interface AddressFormProps {
  userId: number;
  onContinue: (addressId: number) => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}
function AddressForm({ userId, onContinue, setShowForm }: AddressFormProps) {
  const {
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
    handleAddress,
  } = useAddress(onContinue, userId);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1>Endereço de Entrega</h1>
      </div>

      <form onSubmit={handleAddress} className={styles.form}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="CEP">CEP</label>
            <input
              type="text"
              id="CEP"
              placeholder="Digite seu CEP"
              value={cep}
              onChange={(e) => setCEP(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="Estado">Estado</label>
            <select
              id="Estado"
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
            <label htmlFor="Cidade">Cidade</label>
            <input
              type="text"
              id="Cidade"
              placeholder="Digite sua cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="Bairro">Bairro</label>
            <input
              type="text"
              id="Bairro"
              placeholder="Digite seu bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="Rua">Rua</label>
            <input
              type="text"
              id="Rua"
              placeholder="Digite sua rua"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="Numero">Número</label>
            <input
              type="text"
              id="Numero"
              placeholder="Digite seu número"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="Complemento">Complemento</label>
            <input
              type="text"
              id="Complemento"
              placeholder="Digite o complemento (opcional)"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
          </div>
        </div>
    <div className={styles.btn}>
        <button type="submit" className={styles.btnSave}>
          Salvar Endereço
        </button>
         <button
          type="button"
          className={styles.btnFechar}
          onClick={() => setShowForm(false)}
        >
          Cancelar
        </button>
</div>
      </form>
    </section>
  );
}

export default AddressForm;
