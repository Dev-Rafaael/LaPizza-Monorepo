import { useEffect, useState } from "react";
import type { Avaliacao } from "@packages/types/types";
import { api } from "@packages/api/api";

function useAvaliacao() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const handleAvaliacoes = async () => {
      try {
        setLoading(true);
        const response = await api.get("/avaliacoes");
        setAvaliacoes(response.data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    handleAvaliacoes();
  }, []);

  return {
    avaliacoes,
    loading,
    error,
  } as const;
}

export default useAvaliacao;
