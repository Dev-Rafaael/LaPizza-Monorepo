import { fireEvent, render, screen } from "@testing-library/react";
import useOrcamento from "../hooks/useOrderItem";
import { api } from "@packages/api/api";
import { toast } from "react-toastify";
import { describe, expect, test, vi, type Mock } from "vitest";


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
const MockUseOrcamento = ()=>{
 const {
    unidades,
    setUnidades,
      handleSubmit,
    precoTotal,
  } = useOrcamento();
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
describe('Orcamento Hook', () => {
    
    test('should add Orcamento',async () => {
        
        (api.post as unknown as Mock).mockResolvedValue({
          data: {unidades: 2}
        })  

        render(<MockUseOrcamento/>)

        fireEvent.change(screen.getByLabelText('Unidades'), {target: {value:'1'}})

        const checkbox = screen.getByText('Adicionais')
        fireEvent.click(checkbox)
        fireEvent.click(screen.getByText('Prosseguir'))

        expect(api.post).toHaveBeenCalledTimes(1)
        expect(api.post).toHaveBeenCalledWith(
            expect.stringContaining('orcamento'),
            expect.any(Object)
        )
        expect(api.delete).not.toHaveBeenCalled()
        expect(api.put).toHaveBeenCalledWith(expect.stringContaining('Parmesao'))

        expect(toast.success).toHaveBeenCalledWith('Enviado ao Carrinho')
    });
});

