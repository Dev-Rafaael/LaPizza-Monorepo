import { useNavigate } from "react-router-dom";

import { useState, type FormEvent } from "react";
import  {useUserStore}  from "../store/useUserStore";
import { toast } from "react-toastify";
import { api } from "../api/api";

function useUser() {
 const navigate = useNavigate();
  // Zustand store
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);
  const update = useUserStore((s) => s.updatedUser);

  // Estados locais (apenas pro modal de edição)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [sobreNome, setSobreNome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [sexo, setSexo] = useState("");
  const [telefone, setTelefone] = useState("");

  // Se não tiver usuário logado, manda pro login


  // Função para logout
  const deletarAccount = () => {
    logout();
    toast.info("Você saiu da conta");
    navigate("/login");
  };

  // Fecha o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Abre modal e carrega dados atuais
  const edit = () => {
    if (!user) return;
    setIsModalOpen(true);
    setNome(user.nome);
    setSobreNome(user.sobreNome);
    setNascimento(user.nascimento);
    setSexo(user.sexo);
    setTelefone(user.telefone);
  };

  // Atualiza dados no backend e Zustand
  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error("Usuário não encontrado!");
      return;
    }

    const dados = {
      nome,
      sobreNome,
      nascimento,
      sexo,
      telefone,
    };

    try {
      const { data } = await api.put(`/users/${user.id}`, dados);
      update(data);
      toast.success("✅ Conta atualizada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar conta");
    } finally {
      setIsModalOpen(false);
    }
  };

  return {
    user,
    nome,
    setNome,
    sobreNome,
    setSobreNome,
    nascimento,
    setNascimento,
    sexo,
    setSexo,
    telefone,
    setTelefone,
    deletarAccount,
    edit,
    handleCloseModal,
    isModalOpen,
    handleEdit,
  } as const;
}

export default useUser;
