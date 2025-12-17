import { fireEvent, render, screen } from "@testing-library/react";

import { api } from "@packages/api/api";
import { toast } from "react-toastify";
import { describe, expect, test, vi, type Mock } from "vitest";
import useOrderItem from "../hooks/useOrderItem";
import { usePizzaStore } from "@packages/store/usePizzaStore";

vi.mock('@packages/store/usePizzaStore', () => ({
  usePizzaStore: () => ({
    pizzas: [
      {
        id: 1,
        sabor: 'Calabresa',
        descricao: 'Pizza de calabresa',
        preco: 50,
        imagem: '',
        adicionais: [],
      },
    ],
  }),
}));
vi.mock('@packages/api/api',()=>({
    api:{
        get: vi.fn(),
        post:vi.fn(),
        put:vi.fn(),
        delete:vi.fn(),
    }
}))

vi.mock('react-toastify',()=>({
    toast:{
        success:vi.fn(),
        error:vi.fn()
    }
}))
const pizzaSelecionada = {
  id: 1,
  sabor: 'Calabresa',
  descricao: 'Pizza de calabresa',
  preco: 50,
  imagem: '',
  adicionais: [],
};
const MockUseOrcamento = ()=>{
 const {
    unidades,
    setUnidades,
      handleSubmit,
    precoTotal,
  } = useOrderItem(pizzaSelecionada);
    return(
        <form onSubmit={handleSubmit}>
              <div >
                <label htmlFor="Unidades">Unidades:</label>
                <select
                  name="Unidades"
                  value={unidades}
                  onChange={(e) => setUnidades(Number(e.target.value))}
                  required
                >
                  <option value="" defaultChecked>
                    Selecione
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            

              {
                <h3 >
                  {" "}
                  Total a Pagar: R$
                  {precoTotal
                    }
                </h3>
              }

              <button type="submit">Prosseguir</button>
            </form>
    )
}
describe('useOrderItem', () => {
  test('should calculate total price correctly', () => {
    render(<MockUseOrcamento />);

    fireEvent.change(screen.getByLabelText('Unidades'), {
      target: { value: '2' },
    });

    expect(
      screen.getByText(/Total a Pagar:/)
    ).toHaveTextContent('100');
  });

  test('should submit form without crashing', () => {
    render(<MockUseOrcamento />);

    fireEvent.change(screen.getByLabelText('Unidades'), {
      target: { value: '1' },
    });

    fireEvent.click(screen.getByText('Prosseguir'));

    // aqui o importante é NÃO quebrar
    expect(true).toBe(true);
  });
});


