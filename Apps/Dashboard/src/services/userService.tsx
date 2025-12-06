import { useEffect, useState } from "react";
import { api } from "../../../../Packages/api/api";
import type { User, UserRegister } from "@packages/types/types";
import { toast } from "react-toastify";

function useUserService() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nome, setNome] = useState<string>("");
  const [sobreNome, setSobreNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");
  const [nascimento, setNascimento] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<User[]>([]);
  const [dadosSearch, setDadosSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Erro desconhecido");
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<User[]>("/users/");
      setUsers(data);
      setError(null);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async (id: number) => {
    setLoading(true);
    try {
      const { data } = await api.get<User>(`/users/${id}`);
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (newUser: Partial<User>) => {
    setLoading(true);
    try {
      const { data } = await api.post<User>("/users/", newUser);
      setUsers((prev) => [...prev, data]);
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: number, updatedUser: Partial<UserRegister>) => {
    setLoading(true);
    try {
      const { data } = await api.put<User>(`/users/${id}`, updatedUser);
      setUsers((prev) => prev.map((u) => (u.id === id ? data : u)));
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    setLoading(true);
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setError(null);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };
  const edit = (user: User) => {
    setNome(user.nome);
    setSobreNome(user.sobreNome);
    setEmail(user.email);
    setCpf(user.cpf);
    setNascimento(user.nascimento);
    setSexo(user.sexo);
    setTelefone(user.telefone);
    setRole(user.role);
    setEditId(user.id);
  };
  const deleteUserConfirm = (id: number) => {
    const confirm = window.confirm("Deseja Deletar?");
    if (confirm) {
      deleteUser(id);
      toast.error("Usuario Deletado Com Sucesso!");
    } else {
      return null;
    }
  };
  const limparFormulario = () => {
    setNome("");
    setSobreNome("");
    setEmail("");
    setCpf("");
    setNascimento("");
    setSexo("");
    setTelefone("");
    setRole("");
  };

  const normalizar = (txt: string) =>
    txt
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const searchButton = () => {
    const texto = normalizar(dadosSearch);

    if (!texto.trim()) {
      setSearchTerm(users);
      return;
    }

    const search = users.filter((i) => normalizar(i.nome).includes(texto));

    setSearchTerm(search);
  };

  useEffect(() => {
    searchButton();
  }, [dadosSearch,users]);
  return {
    users,
    setUsers,
    loading,
    error,
    nome,
    setNome,
    sobreNome,
    setSobreNome,
    role,
    setRole,
    telefone,
    setTelefone,
    nascimento,
    setNascimento,
    sexo,
    setSexo,
    cpf,
    setCpf,
    senha,
    setSenha,
    email,
    setEmail,
   searchTerm,
    dadosSearch,
    setDadosSearch,
    setSearchTerm,
    editId,
    setEditId,
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
    edit,
    deleteUserConfirm,
    isCreating,
    setIsCreating,
    limparFormulario,
     searchButton
  } as const;
}
export default useUserService;
