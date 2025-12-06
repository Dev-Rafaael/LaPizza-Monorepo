import { fireEvent, render, screen } from "@testing-library/react";
import { api } from "@packages/api/api";
import { toast } from "react-toastify";

import { describe, expect, test, vi, type Mock } from "vitest";


vi.mock("@packages/api/api", () => ({
  api: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));


export const MockUseCheckout = () => {
  return (
    <form>
      <input
        placeholder="Digite Seu Numero"
        defaultValue=""
      />
      <input
        placeholder="Digite O Complemeto"
        defaultValue=""
      />
      <input
        placeholder="Digite Seu Sobrenome"
        defaultValue=""
      />

      <button type="button">COMPRAR</button>
    </form>
  );
};


describe("Irei verificar Checkout", () => {
  test("should get Identifier", async () => {
    (api.post as unknown as Mock).mockResolvedValue({
      data: { nome: "Rafael" },
    });

    render(<MockUseCheckout />);

    fireEvent.change(screen.getByPlaceholderText("Digite Seu Numero"), {
      target: { value: 123 },
    });
    fireEvent.change(screen.getByPlaceholderText("Digite O Complemeto"), {
      target: { value: "Centro" },
    });
    fireEvent.change(screen.getByPlaceholderText("Digite Seu Sobrenome"), {
      target: { value: "Moraes" },
    });

    fireEvent.click(screen.getByText("COMPRAR"));

    expect(
      await screen.findByPlaceholderText("Digite Seu Numero")
    ).toBeInTheDocument();

    expect(api.post).toHaveBeenCalledTimes(1);

    expect(api.post).toHaveBeenCalledWith(
      expect.stringContaining("checkout"),
      expect.any(Object)
    );

    expect(toast.success).toHaveBeenCalledWith(
      "🍕 Pedido realizado com sucesso!"
    );
  });
});
