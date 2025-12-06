/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import UserManage from "../app/pages/admin/userManage";
import useUserService from "../services/userService";

vi.mock("../../../services/userService");

describe("UserManage Component", () => {
  it("should show list of users", () => {
    (useUserService as any).mockReturnValue({
      users: [{ id: 1, nome: "Rafael", sobreNome: "Moraes", email: "rafael@", cpf: "123", sexo: "Masculino", nascimento: "2000-01-01", telefone: "9999", role: "Admin" }],
      searchTerm: [],
      dadosSearch: "",
      setDadosSearch: vi.fn(),
      editId: null,
      isCreating: false,
      setIsCreating: vi.fn(),
      setEditId: vi.fn(),
      limparFormulario: vi.fn(),
      searchButton: vi.fn(),
      createUser: vi.fn(),
      fetchUsers: vi.fn(),
      updateUser: vi.fn(),
      deleteUserConfirm: vi.fn(),
      nome: "", setNome: vi.fn(),
      sobreNome: "", setSobreNome: vi.fn(),
      role: "", setRole: vi.fn(),
      telefone: "", setTelefone: vi.fn(),
      nascimento: "", setNascimento: vi.fn(),
      sexo: "", setSexo: vi.fn(),
      cpf: "", setCpf: vi.fn(),
      email: "", setEmail: vi.fn(),
    });

    render(<UserManage />);

    expect(screen.getByText("🧑‍🦱Usuarios")).toBeInTheDocument();
    expect(screen.getByText("Rafael Moraes")).toBeInTheDocument();
  });

  it("should open create form on button click", () => {
    const setIsCreating = vi.fn();
    (useUserService as any).mockReturnValue({
      users: [],
      searchTerm: [],
      dadosSearch: "",
      setDadosSearch: vi.fn(),
      editId: null,
      isCreating: false,
      setIsCreating,
      setEditId: vi.fn(),
      limparFormulario: vi.fn(),
      searchButton: vi.fn(),
      createUser: vi.fn(),
      fetchUsers: vi.fn(),
      updateUser: vi.fn(),
      deleteUserConfirm: vi.fn(),
      nome: "", setNome: vi.fn(),
      sobreNome: "", setSobreNome: vi.fn(),
      role: "", setRole: vi.fn(),
      telefone: "", setTelefone: vi.fn(),
      nascimento: "", setNascimento: vi.fn(),
      sexo: "", setSexo: vi.fn(),
      cpf: "", setCpf: vi.fn(),
      email: "", setEmail: vi.fn(),
    });

    render(<UserManage />);

    fireEvent.click(screen.getByText("🧑‍🦱Novo Usuario"));

    expect(setIsCreating).toHaveBeenCalledWith(true);
  });
});
