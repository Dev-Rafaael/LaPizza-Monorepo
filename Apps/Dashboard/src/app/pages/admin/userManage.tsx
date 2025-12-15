import { useEffect, type FormEvent } from "react";
import { toast } from "react-toastify";
import useUserService from "../../../services/userService";
import styles from "../../../styles/UserManage.module.css";
import { useUserStore } from "@packages/store/useUserStore";

function UserManage() {
  const {
    users,
    nome,
    setNome,
    sobreNome,
    setSobreNome,
    role,
    setRole,
    telefone,
    setTelefone,
    nascimento,
    setNascimento,
    sexo,
    setSexo,
    cpf,
    setCpf,
    email,
    setEmail,
    senha,
    setSenha,
    searchTerm,
    dadosSearch,
    setDadosSearch,
    editId,
    createUser,
    fetchUsers,
    edit,
    setEditId,
    deleteUserConfirm,
    updateUser,
    isCreating,
    setIsCreating,
    limparFormulario,
    searchButton,
  } = useUserService();
  useEffect(() => {
    fetchUsers();
  }, []);
  const user = useUserStore((e) => e.user);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const userData = {
      nome,
      sobreNome,
      email,
      cpf,
      sexo,
      senha,
      nascimento,
      telefone,
      role,
    };
    try {
      if (editId === null) {
        await createUser(userData);
        toast.success("Usuario Criado Com Sucesso!");
      } else {
        await updateUser(editId, userData);
        toast.success("Usuario Atualizado Com Sucesso!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Usuario Não criado");
    } finally {
      setEditId(null);
    }
  };

  return (
    <section className={styles.userSection}>
      <header className={styles.searchBarWrapper}>
        <input
          type="text"
          placeholder="Pesquisar informações da Pizza..."
          className={styles.searchInput}
          value={dadosSearch}
          onChange={(e) => setDadosSearch(e.target.value)}
        />
        <button className={styles.searchButton} onClick={searchButton}>
          🔍
        </button>
      </header>
      {users.length === 0 || (!isCreating && editId === null) ? (
        <>
          <div className={styles.userFunction}>
            <h2 className={styles.title}>🧑‍🦱Usuarios</h2>
            {user?.role === "admin" && (
              <button
                className={styles.btnNew}
                onClick={() => {
                  setIsCreating(true);
                  setEditId(null);
                  limparFormulario();
                }}
              >
                🧑‍🦱Novo Usuario
              </button>
            )}
          </div>
          <article className={styles.userList}>
            {searchTerm.length === 0 ? (
              <p className={styles.searchFail}>Usuario Não Encontrado</p>
            ) : (
              searchTerm.map((user) => (
                <div key={user.id} className={styles.userCard}>
                  <h3>
                    {user.nome} {user.sobreNome}
                  </h3>

                  <div className={styles.infoUser}>
                    <p>
                      <strong>Sexo:</strong> {user.sexo}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>CPF:</strong> {user.cpf}
                    </p>
                    <p>
                      <strong>Nascimento:</strong>{new Date(user.nascimento).toLocaleDateString("pt-BR")}

                    </p>
                    <p>
                      <strong>Telefone:</strong> {user.telefone}
                    </p>
                    <p>
                      <strong>Função:</strong> {user.role}
                    </p>
                  </div>
                  {user?.role === "admin" && (
                    <div>
                      <button onClick={() => edit(user)}>Editar</button>
                      <button onClick={() => deleteUserConfirm(user.id)}>
                        Deletar
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </article>
        </>
      ) : (
        <>
          <article className={styles.userForm}>
            <h1 className={styles.titleForm}>
              {editId ? "Editar Usuario " : "Criar Usuario "}
            </h1>

            <form onSubmit={handleSubmit} className={styles.formUser}>
              <article className={styles.fileOne}>
                <div className={styles.formGroup}>
                  <label htmlFor="nome">*Nome</label>
                  <input
                    id="nome"
                    type="text"
                    value={nome}
                    placeholder="Nome"
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="sobrenome">*Sobrenome</label>
                  <input
                    id="sobrenome"
                    type="text"
                    value={sobreNome}
                    placeholder="Sobrenome"
                    onChange={(e) => setSobreNome(e.target.value)}
                    required
                  />
                </div>
              </article>

              <article className={styles.fileOne}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">*E-Mail</label>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="senha">*Senha</label>
                  <input
                    id="senha"
                    type="password"
                    value={senha}
                    placeholder="Senha"
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="nascimento">*Data Nascimento</label>
                  <input
                    id="nascimento"
                    type="date"
                    value={nascimento}
                    onChange={(e) => setNascimento(e.target.value)}
                    required
                  />
                </div>
              </article>

              <article className={styles.fileOne}>
                <div className={styles.formGroup}>
                  <label htmlFor="cpf">*CPF</label>
                  <input
                    id="cpf"
                    type="text"
                    value={cpf}
                    placeholder="CPF"
                    onChange={(e) => setCpf(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="Telefone">*Telefone</label>
                  <input
                    id="Telefone"
                    type="text"
                    value={telefone}
                    placeholder="Telefone"
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                  />
                </div>
              </article>

              <article className={styles.fileOne}>
                <div className={styles.formGroup}>
                  <label htmlFor="Role">*Role</label>
                  <select
                    id="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    {" "}
                    <option value="" disabled>
                      Selecione o Role
                    </option>
                    <option value="Admin">Admin</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="User">User</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="sexo">*Sexo</label>
                  <select
                    id="sexo"
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Selecione o Sexo
                    </option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>
                </div>
              </article>

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
        </>
      )}
    </section>
  );
}

export default UserManage;
