
import styles from "../../../styles/Perfil.module.css";

import UseAccount from "@packages/hooks/useUser";

function PerfilManage() {
    const {
    user,
    nome,
    setNome,
    sobreNome,
    setSobreNome,
    nascimento,
    setNascimento,
    sexo,
    setSexo,
    telefone,
    setTelefone,
    deletarAccount,
    edit,
    handleCloseModal,
    isModalOpen,
    handleEdit} = UseAccount()
  
    if(!user) return 'Nescessario Login'
  return (
   <section className={styles.accountContent}>
    {user !== null  ? 
   
        <>
          <header className={styles.navAccount}>
            <h1>MINHA CONTA</h1>
          </header>
          <main className={styles.mainAccount}>
            <section className={styles.accountSection}>
             
                <article  className={styles.userCard}>
                  <aside className={styles.accountAside}>
                    <figure>
                      <img
                        src={
                          user.sexo === "feminino"
                            ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                            : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                        }
                        alt="avatar"
                      />

                      <figcaption>
                        <h2>Olá {user.nome}</h2>
                        <p> {  user.sexo === "feminino" ? 'Seja Bem Vinda!': 'Seja Bem Vindo!'}</p>
                      </figcaption>

                      <div className={styles.userActions}>
                        <button onClick={() => deletarAccount()} className={styles.deleteIcon}>Logout</button>
                        <button onClick={() => edit()} className={styles.editIcon}>Editar</button>
                      
                      </div>
                    </figure>
                  </aside>

                  <section className={styles.infoSection}>
                    <article className={styles.infoArticle}>
                      <h3>Informações Pessoais</h3>
                      <dl>
                        <div className={styles.flexRow}>
                          <dt>Nome Completo</dt>
                          <dd>
                            {user.nome} {user.sobreNome}
                          </dd>
                        </div>

                        <div className={styles.flexRow}>
                          <dt>Sexo</dt>
                          <dd>{user.sexo}</dd>
                        </div>

                        <div className={styles.flexRow}>
                          <dt>Email</dt>
                          <dd>{user.email}</dd>
                        </div>

                        <div className={styles.flexRow}>
                          <dt>Telefone</dt>
                          <dd>{user.telefone}</dd>
                        </div>

                        <div className={styles.flexRow}>
                          <dt>Data de Nascimento</dt>
                          <dd>{user.nascimento}</dd>
                        </div>
                      </dl>
                    </article>
                  </section>
                </article>
            
            </section>
          </main>
   
      </>  : ''}
    
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Editar Conta</h2>

            <form onSubmit={handleEdit} className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="sobreNome">Sobrenome:</label>
                <input
                  type="text"
                  id="sobreNome"
                  name="sobreNome"
                  value={sobreNome}
                  onChange={(e) => setSobreNome(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="sexo">Sexo:</label>
                <select
                  id="sexo"
                  name="sexo"
                  value={sexo}
                  onChange={(e) => setSexo(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="data">Data de Nascimento:</label>
                <input
                  type="date"
                  id="data"
                  name="data"
                  value={nascimento}
                  onChange={(e) => setNascimento(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroupFull}>
                <label htmlFor="telefone">DDD + Celular:</label>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />
              </div>

              <div className={styles.modalButtons}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className={styles.closeButton}
                >
                  Voltar
                </button>
                <button type="submit" className={styles.saveButton}>
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default PerfilManage;
