import UseAccount from "@packages/hooks/useUser";
import { render, screen, fireEvent } from "@testing-library/react";
import { api } from "@packages/api/api";
import { toast } from 'react-toastify'
import { describe, expect, it, vi } from "vitest";


const mockLogout = vi.fn()
const mockUser = {id:1,nome:'Rafael',sobrenome:'Moraes'}

vi.mock('@packages/store/useOrderStore',()=>({
   useUserStore: vi.fn(()=>({
    user:mockUser,
    logout:mockLogout,
   }))
}))

vi.mock('@packages/api/api',()=>({
  api:{
    put:vi.fn(()=> Promise.resolve({data:{...mockUser,nome:'Rafael'}}))
  }
}))
const mockNavigate = vi.fn()
vi.mock('react-router-dom',()=>({
    useNavigate: ()=> mockNavigate
}))

vi.mock('react-toastify',()=>({
    toast:{
        success: vi.fn(),
        error: vi.fn()
    }
}))

const MockUseAccount = () => {
  const {
    nome,
    setNome,
    deletarAccount,
    edit,
    handleCloseModal,
    handleEdit,
  } = UseAccount();

  return (
    <div>
      <span data-testid="nome">{nome}</span>
      <button onClick={edit}>Editar</button>
      <button onClick={handleCloseModal}>Fechar</button>
      <button onClick={deletarAccount}>Deletar</button>
      <form onSubmit={handleEdit}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

   describe('Test Account Function', () => {
        it('deve carregar os dados do usuário    ', () => {
            render(<MockUseAccount/>)

        expect(screen.getByTestId('nome').textContent).toBe('Rafael')
        });
        it('deve abrir o modal e preencher os dados no editar ', () => {
            render(<MockUseAccount/>)

            fireEvent.click(screen.getByText('Editar'))

            expect(screen.getByPlaceholderText('Nome').getAttribute("value")).toBe('Rafael')
        });
        it('deve atualizar os dados do usuário ', () => {
              render(<MockUseAccount/>)

              fireEvent.click(screen.getByText('Editar'))
              fireEvent.click(screen.getByPlaceholderText('Nome'), {target:{value:'NovoNome'}})
              expect(api.put).toHaveBeenCalledWith('acccount/1',expect.objectContaining({nome:'NovoNome'}))
              expect(toast.success).toHaveBeenCalledWith('Atualizado Com Sucesso')
        });
        it('deve deletar a conta ', () => {
            render(<MockUseAccount/>)

            fireEvent.click(screen.getByText('Deletar'))

            expect(mockLogout).toHaveBeenCalled()
        });
    });