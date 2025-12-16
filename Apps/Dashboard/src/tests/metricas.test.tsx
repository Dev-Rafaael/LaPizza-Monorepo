import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import * as useMetricsModule from "../app/pages/admin/useMetricas"; // caminho do seu hook
import Metricas from "src/app/pages/Metricas/metricas";
import type { Metrics } from "@packages/types/metricas";

const mockMetrics: Metrics = {
  vendasMes: [{ mes: "Jan", total: 10 }],
  pizzasMaisVendidas: [
    { pizzaId: 1, sabor: "Mussarela", quantidade: 5 },
    { pizzaId: 2, sabor: "Calabresa", quantidade: 3 }
  ],
  pedidosPorStatus: { pendente: 1, em_preparacao: 2, entregue: 3, saiu_para_entrega: 4,paid: 5, cancelado: 6 },
  vendasPorHora: [{ hora: "10:00", total: 2 }],
  clientesNovos: [
    { dia: "Rafael", total: 3333 },
    { dia: "Maria", total: 555 },
  ], 
  clientesRecorrentes: 7, // apenas número
  categorias: [{ categoria: "Doces", total: 4 }],
  vendasHoje: 100,
  ticketMedio: 50,
  totalClientes: 3,
  novosClientesMes: 2,
};


vi.mock("@packages/api/api", () => ({
  api: { post: vi.fn(), get: vi.fn() }
}));

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() }
}));

describe("Metricas Component", () => {

  test("should show loading initially", () => {
    vi.spyOn(useMetricsModule, "useMetrics").mockReturnValue({
      metrics: null,
      loading: true
    });

    render(<Metricas />);

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  test("should render error when metrics is null", () => {
    vi.spyOn(useMetricsModule, "useMetrics").mockReturnValue({
      metrics: null,
      loading: false
    });

    render(<Metricas />);

    expect(screen.getByText("Erro ao carregar métricas")).toBeInTheDocument();
  });

  test("should render cards and charts with data", () => {
    vi.spyOn(useMetricsModule, "useMetrics").mockReturnValue({
      metrics: mockMetrics,
      loading: false
    });

    render(<Metricas />);

    // Verifica os cards
    expect(screen.getByText("R$ 100.00")).toBeInTheDocument();
    expect(screen.getByText("R$ 50.00")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument(); // Total Clientes
    expect(screen.getByText("2")).toBeInTheDocument();  // Novos Clientes

    // Verifica títulos dos gráficos
    expect(screen.getByText("Vendas por Dia")).toBeInTheDocument();
    expect(screen.getByText("Pizzas Mais Vendidas")).toBeInTheDocument();
    expect(screen.getByText("Pedidos por Status")).toBeInTheDocument();
    expect(screen.getByText("Vendas por Hora")).toBeInTheDocument();
    expect(screen.getByText("Novos vs Recorrentes")).toBeInTheDocument();
    expect(screen.getByText("Vendas por Categoria")).toBeInTheDocument();
  });

});
