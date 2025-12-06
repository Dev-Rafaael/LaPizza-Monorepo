import { api } from "@packages/api/api";
import { render, screen, fireEvent } from "@testing-library/react";
import { toast } from "react-toastify";
import useAddress from "../hooks/useAddress";
import { vi, describe, it, expect } from "vitest";

vi.mock("@packages/api/api", () => ({
  api: {
    post: vi.fn(() => Promise.resolve({ data: { id: 1 } }))
  }
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

vi.mock("../hooks/useAddress", () => ({
  __esModule: true,
  default: vi.fn()
}));

const onContinue = vi.fn();

const MockUseAddress = () => {
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
  } = useAddress(onContinue, 1);

  return (
    <form onSubmit={handleAddress}>
      <div>
        <div>
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

        <div>
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

        <div>
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

        <div>
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

        <div>
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

        <div>
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

        <div>
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

      <div>
        <button type="submit">Salvar Endereço</button>
        <button type="button">Cancelar</button>
      </div>
    </form>
  );
};

describe("Address Test", () => {
  it("should create a new Address", async () => {
    render(<MockUseAddress />);

    fireEvent.change(screen.getByPlaceholderText("Digite seu número"), {
      target: { value: "90" },
    });

    fireEvent.change(screen.getByPlaceholderText("Digite sua rua"), {
      target: { value: "Pedro Christie" },
    });

    fireEvent.click(screen.getByText("Salvar Endereço"));

    expect(screen.getByPlaceholderText("Digite seu CEP")).toBeInTheDocument();
    expect(api.post).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith("Address realizado com sucesso!");
  });
});
