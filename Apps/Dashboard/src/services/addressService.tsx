import { useEffect, useState } from "react";
import { api } from "../../../../Packages/api/api";
import type { Address } from "@packages/types/types";
import { toast } from "react-toastify";

function useAddressService() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cep, setCEP] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [rua, setRua] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [complemento, setComplemento] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<Address[]>([]);
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

  // Listar todos os endereços
  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<Address[]>("/address");
      setAddresses(data);
      setError(null);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Buscar endereço por ID
  const fetchAddressById = async (id: number) => {
    setLoading(true);
    try {
      const { data } = await api.get<Address>(`/address/${id}`);
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Buscar endereços de um usuário específico
  const fetchAddressesByUserId = async (userId: number) => {
    setLoading(true);
    try {
      const { data } = await api.get<Address[]>(`/address/user/${userId}`);
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Criar endereço
  const createAddress = async (newAddress: Partial<Address>) => {
    setLoading(true);
    try {
      const { data } = await api.post<Address>("/address", newAddress);
      setAddresses((prev) => [...prev, data]);
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Atualizar endereço
  const updateAddress = async (
    id: number,
    updatedAddress: Partial<Address>
  ) => {
    setLoading(true);
    try {
      const { data } = await api.put<Address>(`/address/${id}`, updatedAddress);
      setAddresses((prev) => prev.map((a) => (a.id === id ? data : a)));
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Deletar endereço
  const deleteAddress = async (id: number) => {
    setLoading(true);
    try {
      await api.delete(`/address/${id}`);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      setError(null);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };
  const edit = (address: Address) => {
    setCEP(address.cep);
    setEstado(address.estado);
    setCidade(address.cidade);
    setBairro(address.bairro);
    setRua(address.rua);
    setNumero(address.numero);
    setComplemento(address.complemento!);
    setEditId(address.id);
  };
  const deleteAddressConfirm = (id: number) => {
    const confirm = window.confirm("Deseja Deletar?");
    if (confirm) {
      deleteAddress(id);
      toast.error("Usuario Deletado Com Sucesso!");
    } else {
      return null;
    }
  };
  const limparFormulario = () => {
    setCEP("");
    setEstado("");
    setCidade("");
    setBairro("");
    setRua("");
    setNumero("");
    setComplemento("");
  };
  const normalizar = (txt: string) =>
    txt
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const searchButton = () => {
    const texto = normalizar(dadosSearch);

    if (!texto.trim()) {
      setSearchTerm(addresses);
      return;
    }

    const search = addresses.filter((i) =>
      normalizar(i.bairro).includes(texto)
    );

    setSearchTerm(search);
  };

  useEffect(() => {
    searchButton();
  }, [dadosSearch,addresses]);
  return {
    addresses,
    setAddresses,
    loading,
    error,
    cep,
    setCEP,
    estado,
    setEstado,
    cidade,
    setCidade,
    bairro,
    setBairro,
    rua,
    setRua,
    numero,
    setNumero,
    complemento,
    setComplemento,
    searchTerm,
    dadosSearch,
    setDadosSearch,
    setSearchTerm,
    editId,
    setEditId,
    fetchAddresses,
    fetchAddressById,
    fetchAddressesByUserId,
    createAddress,
    updateAddress,
    deleteAddress,
    edit,
    deleteAddressConfirm,
    isCreating,
    setIsCreating,
    limparFormulario,
    searchButton,
  } as const;
}
export default useAddressService;
