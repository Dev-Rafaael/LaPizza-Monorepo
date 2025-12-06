import { useNavigate } from "react-router-dom";
import useUserForm from "../../hooks/useUserForm";
import styles from "../../styles/Cadastrar.module.css";

function UserForm() {
  const {
    nome,
    setNome,
    sobreNome,
    setSobreNome,
    cpf,
    setCPF,
    sexo,
    setSexo,
    nascimento,
    setNascimento,
    telefone,
    setTelefone,
    email,
    setEmail,
    senha,
    setSenha,
    loading,
    handleAccount,
  } = useUserForm();
const navigate = useNavigate(); 
  return (
    <main className={styles.mainCadastro}>
      <div className={styles.navCadastro}>
        <h1>IDENTIFICAÇÃO</h1>
      </div>
      <article className={styles.cadastroSection}>
        <form onSubmit={handleAccount} className={styles.formIdentificacao}>
          <fieldset>
            <legend>Informações Pessoais</legend>

            <div className={styles.grid2}>
              <div>
                <label htmlFor="cpf">CPF</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  placeholder="Digite Seu CPF"
                  value={cpf}
                  onChange={(e) => setCPF(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Digite Seu Nome Completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="SobreNome">Sobrenome</label>
                <input
                  type="text"
                  id="SobreNome"
                  name="SobreNome"
                  placeholder="Digite Seu Sobrenome"
                  value={sobreNome}
                  onChange={(e) => setSobreNome(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite Seu E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="senha">Senha</label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Crie uma senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="sexo">Sexo</label>
                <select
                  id="sexo"
                  name="sexo"
                  value={sexo}
                  onChange={(e) => setSexo(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Selecione uma Opção
                  </option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </div>

              <div>
                <label htmlFor="telefone">DDD + Celular</label>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  placeholder="(11) 91092-8922"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="data">Data de Nascimento</label>
                <input
                  type="date"
                  id="data"
                  name="data"
                  value={nascimento}
                  onChange={(e) => setNascimento(e.target.value)}
                  required
                />
              </div>
            </div>
          </fieldset>
          <div className={styles.btn}>
            <button
              type="submit"
              className={styles.btnEntrar}
              disabled={loading}
            >
              {loading ? "CADASTRANDO..." : "CADASTRAR-SE"}
            </button>
                <button type="button"  className={styles.btnFechar} onClick={() => navigate(-1)}>Cancelar</button>
          </div>
        </form>
      </article>
    </main>
  );
}

export default UserForm;
