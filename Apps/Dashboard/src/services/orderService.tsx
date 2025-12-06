import { useEffect, useState } from "react";
import { api } from "@packages/api/api";
import type { Order } from "@packages/types/types";
import { toast } from "react-toastify";

function useOrderService() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nome, setNome] = useState<string>("");
  const [sobreNome, setSobreNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [nascimento, setNascimento] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<Order[]>([]);
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

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = (await api.get(`/orders/`)).data;

      setOrders(data);
      setError(null);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderById = async (id: number) => {
    setLoading(true);
    try {
      const { data } = await api.get<Order>(`/orders/${id}`);
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (newOrder: Partial<Order>) => {
    setLoading(true);
    try {
      const { data } = await api.post<Order>("/orders/", newOrder);
      setOrders((prev) => [...prev, data]);
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (id: number, updatedData: Partial<Order>) => {
    setLoading(true);
    try {
      const { data } = await api.put<Order>(`/orders/${id}`, updatedData);
      setOrders((prev) => prev.map((o) => (o.id === id ? data : o)));
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id: number) => {
    setLoading(true);
    try {
      await api.delete(`/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o.id !== id));
      setError(null);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };
  const edit = (order: Order) => {
    setStatus(order.status);
    setEditId(order.id);
  };
  const deleteOrderConfirm = (id: number) => {
    const confirm = window.confirm("Deseja Deletar?");
    if (confirm) {
      deleteOrder(id);
      toast.error("Usuario Deletado Com Sucesso!");
    } else {
      return null;
    }
  };
  const limparFormulario = () => {
    setNome("");
    setSobreNome("");
    setEmail("");
    setCep("");
    setNascimento("");
    setTelefone("");
  };

    const normalizar = (txt: string) =>
      txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    const searchButton = () => {
      const texto = normalizar(dadosSearch);
    
      if (!texto.trim()) {
        setSearchTerm(orders);
        return;
      }
    
      const search = orders.filter((i) =>
        normalizar(i.status).includes(texto)
      );
    
      setSearchTerm(search);
    };
    
    useEffect(() => {
      searchButton();
    }, [dadosSearch,orders]);
  return {
    orders,
    loading,
    error,
    nome,
    setNome,
    sobreNome,
    setSobreNome,
    email,
    setEmail,
    cep,
    setCep,
    telefone,
    setTelefone,
    nascimento,
    setNascimento,
    status,
    setStatus,
    searchTerm,
    dadosSearch,
    setDadosSearch,
    setSearchTerm,
    editId,
    setEditId,
    fetchOrders,
    fetchOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    edit,
    deleteOrderConfirm,
    isCreating,
    setIsCreating,
    limparFormulario,
     searchButton
  } as const;
}
export default useOrderService;
