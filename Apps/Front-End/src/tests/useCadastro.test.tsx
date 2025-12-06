import { toast } from "react-toastify";
import { api } from "@packages/api/api";
import useCadastrar from "../hooks/useUserForm"
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";

  vi.mock("@packages/api/api", () => ({
  api: {
    post: vi.fn(() => Promise.resolve({ data: { id: 1 } })), 
  },
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));
const MockUseCadastro = ()=>{
    const  {
    nome,
    setNome,
    sobreNome,
    setSobreNome,
    cpf,
    email,
    setEmail,
    senha,
    setSenha,
    setCPF,
    sexo,
    setSexo,
    nascimento,
    setNascimento,
    telefone,
    setTelefone,
    loading,
    handleAccount,
  } = useCadastrar()

 return(
  <form onSubmit={handleAccount} >
          <fieldset>
            <legend>Informações Pessoais</legend>

            <div>
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
          <div >
            <button
              type="submit"
              disabled={loading}
            >
              {loading ? "CADASTRANDO..." : "CADASTRAR-SE"}
            </button>
          </div>
        </form>
 )
 
}
test('should create a new Account', async() => {
      render(<MockUseCadastro/>)

      fireEvent.change(screen.getByPlaceholderText('Digite Seu CPF'),{target:{value: '123456'}})
      fireEvent.change(screen.getByPlaceholderText('Digite Seu Nome'),{target:{value: 'Rafael'}})
      
      fireEvent.click(screen.getByText('CADASTRAR-SE'))

      expect(await screen.findByText('Digite Seu CPF')).toBeInTheDocument()
      expect(api.post).toHaveBeenCalledWith('account/',expect.any(Object))
      expect(toast.success).toHaveBeenCalledWith('🍕 Pedido realizado com sucesso!')
  });