import { renderHook, act } from "@testing-library/react";
import { resetZustand } from "./resetZustand";
import useUserStore from "@packages/store/useUserStore";

describe("could verify the services from login", () => {

  beforeEach(() => {
    resetZustand(useUserStore);
  });

  it("should signIn", () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.createUser({
        id: 1,
        email: "rafael@",
        senha: "123",
        nome: "Rafael",
        role: "admin",
        sobreNome: "string",
        cpf: "12342",
        sexo: "M",
        nascimento: "2028",
        telefone: "113211",
      });
    });

    expect(result.current.user?.email).toBe("rafael@");

    expect(result.current.user).toMatchObject({
      id: 1,
      email: "rafael@",
      senha: "123",
      nome: "Rafael",
      nivel: "admin",
    });
  });

  it("should throw an error when invalid params", () => {
    const { result } = renderHook(() => useUserStore());

    expect(() => {
      result.current.createUser(null as never);
    }).toThrow("Error");
  });

  it("should signOut", () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.createUser({
        id: 1,
        email: "rafael@",
        senha: "123",
        nome: "Rafael",
        role: "admin",
        sobreNome: "string",
        cpf: "12342",
        sexo: "M",
        nascimento: "2028",
        telefone: "113211",
      });
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
  });
});
