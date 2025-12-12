import { useEffect, useState } from "react";
import { api } from "@packages/api/api";
import type { Pizzas } from "@packages/types/types";
import { toast } from "react-toastify";

function usePizzasService() {
  const [pizzas, setPizzas] = useState<Pizzas[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sabor, setSabor] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [preco, setPreco] = useState<number>(0.0);
  const [imagem, setImagem] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<Pizzas[]>([]);
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

  const fetchPizzas = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<Pizzas[]>("/pizzas");
      setPizzas(data);
      setError(null);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };


  const fetchPizzaBySabor = async (sabor: string) => {
    setLoading(true);
    try {
      const { data } = await api.get<Pizzas>(`/pizzas/${sabor}`);
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const createPizza = async (newPizza: Partial<Pizzas>) => {
    setLoading(true);
    try {
      const { data } = await api.post<Pizzas>("/pizzas", newPizza);
      setPizzas((prev) => [...prev, data]);
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const updatePizza = async (id: number, updatedPizza: Partial<Pizzas>) => {
    setLoading(true);
    try {
      const { data } = await api.put<Pizzas>(`/pizzas/${id}`, updatedPizza);
      setPizzas((prev) => prev.map((p) => (p.id === id ? data : p)));
      setError(null);
      return data;
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const deletePizza = async (id: number) => {
    setLoading(true);
    try {
      await api.delete(`/pizzas/${id}`);
      setPizzas((prev) => prev.filter((p) => p.id !== id));
      setError(null);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };
  const edit = (item: Pizzas) => {
    setSabor(item.sabor);
    setDescricao(item.descricao);
    setPreco(item.preco);
    setImagem(item.imagem);
    setEditId(item.id);
  };
  const deletePizzaConfirm = (id: number) => {
    const confirm = window.confirm("Deseja Deletar?");
    if (confirm) {
      deletePizza(id);
      toast.error("Pizza Deletada Com Sucesso!");
    } else {
      return null;
    }
  };
  const limparFormulario = () => {
    setSabor("");
    setDescricao("");
    setImagem("");
    setPreco(0);
  };


  
  

const normalizar = (txt: string) =>
  txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const searchButton = () => {
  const texto = normalizar(dadosSearch);

  // quando o input estiver vazio → mostra todas as pizzas
  if (!texto.trim()) {
    setSearchTerm(pizzas);
    return;
  }

  // quando tiver texto → filtra
  const search = pizzas.filter((i) =>
    normalizar(i.sabor).includes(texto)
  );

  setSearchTerm(search);
};

useEffect(() => {
  searchButton();
}, [dadosSearch, pizzas]);

    
  return {
    pizzas,
    setPizzas,
    loading,
    error,
    sabor,
    setSabor,
    descricao,
    setDescricao,
    preco,
    setPreco,
    imagem,
    editId,
    setEditId,
    setImagem,
    searchTerm,
    dadosSearch,
    setDadosSearch,
    setSearchTerm,
    fetchPizzas,
    fetchPizzaBySabor,
    createPizza,
    updatePizza,
    deletePizzaConfirm,
    edit,
    isCreating,
    setIsCreating,
    limparFormulario,
    searchButton
  } as const;
}
export default usePizzasService;
