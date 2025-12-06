import { api } from "@packages/api/api";
import type { Adicional } from "@packages/types/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function useAdicionaisService() {
  const [adicionais, setAdicionais] = useState<Adicional[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nome, setNome] = useState<string>("");
  const [preco, setPreco] = useState<number>(0.0);
 const [searchTerm, setSearchTerm] = useState<Adicional[]>([]);
  const [dadosSearch, setDadosSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Erro Desconhecido");
    }
  };

  const fetchAdicionais = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/adicionais/");
      setAdicionais(data);
      setError(null);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };
  const fetchAdicionaisById = async (id: number) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/adicionais/${id}`);
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };
  const fetchAdicionaisByUserId = async (userId: number) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/adicionais/${userId}`);
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };
  const createAdicionais = async (newAdicional: Partial<Adicional>) => {
    setLoading(true);
    try {
      const { data } = await api.post("/adicionais/", newAdicional);
      setAdicionais((prev) => [...prev, data]);
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };
  const updateAdicionais = async (
    id: number,
    updatedAdicionais: Partial<Adicional>
  ) => {
    setLoading(true);
    try {
      const { data } = await api.put(`/adicionais/${id}`, updatedAdicionais);
      setAdicionais((prev) => prev.map((i) => (i.id === id ? data : i)));
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };
  const deleteAdicionais = async (id: number) => {
    setLoading(true);
    try {
      await api.delete(`/adicionais/${id}`);
      setAdicionais((prev) => prev.filter((i) => i.id !== id));
      setError(null);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };
  const edit = (adicional: Adicional) => {
    setNome(adicional.nome);
    setPreco(adicional.preco);
    setEditId(adicional.id);
  };
  const deleteAdicionaisConfirm = (id: number) => {
    const confirm = window.confirm("Deseja Deletar?");
    if (confirm) {
      deleteAdicionais(id);
      toast.error("Usuario Deletado Com Sucesso!");
    } else {
      return null;
    }
  };
  const limparFormulario = () => {
    setNome("");
    setPreco(0);
  };

     const normalizar = (txt: string) =>
          txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        const searchButton = () => {
          const texto = normalizar(dadosSearch);
        
          if (!texto.trim()) {
            setSearchTerm(adicionais);
            return;
          }
        
          const search = adicionais.filter((i) =>
            normalizar(i.nome).includes(texto)
          );
        
          setSearchTerm(search);
        };
        
        useEffect(() => {
          searchButton();
        }, [dadosSearch,adicionais]);
  return {
    adicionais,
    setAdicionais,
    loading,
    error,
    nome,
    setNome,
    preco,
    setPreco,
   searchTerm,
    dadosSearch,
    setDadosSearch,
    setSearchTerm,
    editId,
    setEditId,
    fetchAdicionais,
    fetchAdicionaisById,
    fetchAdicionaisByUserId,
    createAdicionais,
    updateAdicionais,
    deleteAdicionais,
    edit,
    deleteAdicionaisConfirm,
    isCreating,
    setIsCreating,
    limparFormulario,
     searchButton
  };
}

export default useAdicionaisService;
