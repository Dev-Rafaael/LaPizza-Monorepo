import { api } from "@packages/api/api";
import type { Metrics } from "@packages/types/metricas";

export async function getMetrics(): Promise<Metrics> {
  const { data } = await api.get("/metricas/");
  return data;
}
