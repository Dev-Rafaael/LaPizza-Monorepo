import { useEffect, useState } from "react";
import { api } from "../../../../Packages/api/api";
import type { OrderItem } from "@packages/types/types";
import { toast } from "react-toastify";

export function useOrderItemsService() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sabor, setSabor] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [imagem, setImagem] = useState<string>("");
  const [precoUnitario, setPrecoUnitario] = useState<number>(0.0);
  const [quantidade, setQuantidade] = useState<number>(0);
  const [precoTotal, setPrecoTotal] = useState<number>(0.0);
 const [searchTerm, setSearchTerm] = useState<OrderItem[]>([]);
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

  // Listar todos os itens do pedido
  const fetchOrderItems = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<OrderItem[]>("/ordersItems");
      setOrderItems(data);
      setError(null);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Buscar item por ID
  const fetchOrderItemById = async (id: number) => {
    setLoading(true);
    try {
      const { data } = await api.get<OrderItem>(`/ordersItems/${id}`);
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Criar item do pedido
  const createOrderItem = async (newItem: Partial<OrderItem>) => {
    setLoading(true);
    try {
      const { data } = await api.post<OrderItem>("/ordersItems", newItem);
      setOrderItems((prev) => [...prev, data]);
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Atualizar item do pedido
  const updateOrderItem = async (
    id: number,
    updatedItem: Partial<OrderItem>
  ) => {
    setLoading(true);
    try {
      const { data } = await api.put<OrderItem>(
        `/orderItems/${id}`,
        updatedItem
      );
      setOrderItems((prev) => prev.map((i) => (i.id === id ? data : i)));
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Deletar item do pedido
  const deleteOrderItem = async (id: number) => {
    setLoading(true);
    try {
      await api.delete(`/ordersItems/${id}`);
      setOrderItems((prev) => prev.filter((i) => i.id !== id));
      setError(null);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };
  const edit = (orderItem: OrderItem) => {
    setSabor(orderItem.sabor);
    setDescricao(orderItem.descricao!);
    setImagem(orderItem.imagem!);
    setQuantidade(orderItem.quantidade);
    setPrecoUnitario(orderItem.precoUnitario);
    setPrecoTotal(orderItem.precoTotal);
    setEditId(orderItem.id);
  };

  const deleteOrderItemConfirm = (id: number) => {
    const confirm = window.confirm("Deseja Deletar?");
    if (confirm) {
      deleteOrderItem(id);
      toast.error("Usuario Deletado Com Sucesso!");
    } else {
      return null;
    }
  };
  const limparFormulario = () => {
    setSabor("");
    setDescricao("");
    setImagem("");
    setQuantidade(0);
    setPrecoUnitario(0);
    setPrecoTotal(0);
  };

     const normalizar = (txt: string) =>
        txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      const searchButton = () => {
        const texto = normalizar(dadosSearch);
      
        if (!texto.trim()) {
          setSearchTerm(orderItems);
          return;
        }
      
        const search = orderItems.filter((i) =>
          normalizar(i.sabor).includes(texto)
        );
      
        setSearchTerm(search);
      };
      
      useEffect(() => {
        searchButton();
      }, [dadosSearch,orderItems]);
  return {
    orderItems,
    setOrderItems,
    loading,
    error,
    sabor,
    setSabor,
    descricao,
    setDescricao,
    imagem,
    setImagem,
    precoUnitario,
    setPrecoUnitario,
    quantidade,
    setQuantidade,
    precoTotal,
    setPrecoTotal,
    searchTerm,
    dadosSearch,
    setDadosSearch,
    setSearchTerm,
    editId,
    setEditId,
    fetchOrderItems,
    fetchOrderItemById,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
    edit,
    deleteOrderItemConfirm,
    isCreating,
    setIsCreating,
    limparFormulario,
     searchButton
  } as const;
}
