import { ToastContainer } from "react-toastify";
import useLogin from "@packages/hooks/useLogin"
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, test } from "vitest";


const MockFunctionLogin = ()=>{
    const {email,setEmail,senha,setSenha,handleSubmit} = useLogin();


    return(
         <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button type="submit">Entrar</button>
      <ToastContainer />
    </form>
    )  
}

test('should do login',async () => {
    render(<MockFunctionLogin/>)
    const button = screen.getByText('button')

    fireEvent.click(button)
    expect(await screen.findByText('Email deve ter')).toBeInTheDocument()
});