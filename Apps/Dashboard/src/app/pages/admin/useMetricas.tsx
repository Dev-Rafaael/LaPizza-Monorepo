import { useEffect, useState } from "react";
import { getMetrics } from "../../../services/metricasService";
import type { Metrics } from "@packages/types/metricas";

export function useMetrics() {
  
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [metrics, setMetrics] = useState<Metrics | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getMetrics();
      setMetrics(data);
      setLoading(false);
    }
    load();
  }, []);

  return { metrics, loading };
}
