import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe,  test, vi, type Mock } from "vitest";
import { api } from "@packages/api/api";
import { toast } from "react-toastify";

vi.mock("@packages/api/api",()=>({
    api:{
        post: vi.fn(),
        get:vi.fn(),
        put:vi.fn(),
        }
}))

vi.mock("react-toastify",()=>({
    toast:{
        success: vi.fn(),
        error:vi.fn()
    }
}))
export const MockPedidos = () => {
  const [numero, setNumero] = React.useState("");

  const enviar = async () => {
    await api.post("/pedidos", { numero });
    toast.success("Pedido Criado Com Sucesso");
  };

  return (
    <form>
      <input
        placeholder="Digite Seu Numero"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />

      <input placeholder="Digite O Complemeto" defaultValue="" />
      <input placeholder="Digite Seu Sobrenome" defaultValue="" />

      <button type="button" onClick={enviar}>
        COMPRAR
      </button>
    </form>
  );
};


describe("Irei testar Pedidos", () => {
  test("should create a pedido", async () => {
    (api.post as unknown as Mock).mockResolvedValue({
      data: { nome: "Rafael" },
    });

    render(<MockPedidos />);

    fireEvent.change(
      screen.getByPlaceholderText("Digite Seu Numero"),
      { target: { value: "123" } }
    );
    fireEvent.change(
      screen.getByPlaceholderText("Digite O Complemeto"),
      { target: { value: "Perto Centro" } }
    );
    fireEvent.change(
      screen.getByPlaceholderText("Digite Seu Sobrenome"),
      { target: { value: "Moraes" } }
    );

    fireEvent.click(screen.getByText("COMPRAR"));

    expect(
      await screen.findByPlaceholderText("Digite Seu Numero")
    ).toBeInTheDocument();

    expect(api.post).toHaveBeenCalledTimes(1);
    expect(api.post).toHaveBeenCalledWith(
      "/orders",
      expect.objectContaining({ id: "1" })
    );

    expect(toast.success).toHaveBeenCalledWith(
      "Pedido Criado Com Sucesso"
    );
  });
});
