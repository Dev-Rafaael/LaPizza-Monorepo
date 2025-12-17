import { useEffect, useState } from "react";
import type { Destaque } from "@packages/types/types";
import { api } from "@packages/api/api";

function useDestaque() {
  const [destaques, setDestaques] = useState<Destaque[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const handleDestaques = async () => {
      try {
        setLoading(true);
        const response = await api.get("/destaques");
        setDestaques(response.data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    handleDestaques();
  }, []);

  return {
    destaques,
    loading,
    error,
  } as const;
}

export default useDestaque;
