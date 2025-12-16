import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import styles from "../../../styles/Metricas.module.css";
import { useMetrics } from "../admin/useMetricas";
import Card from "./components/CardsResumo";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Metricas() {
  const { metrics, loading } = useMetrics();

  if (loading) return <p className={styles.loading}>Carregando...</p>;
  if (!metrics) return <p>Erro ao carregar métricas</p>;

  /* ================================
      OPTIONS PROFISSIONAIS
  =================================*/

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#eee" },
        ticks: { color: "#555" },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#555" },
      },
    },
  };

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const, 
      labels: {
        color: "#fff",
      },
    },
  },
};

  /* ================================
      GRÁFICOS
  =================================*/

  const vendasMesData = {
    labels: metrics.vendasMes.map((v) => v.mes),
    datasets: [
      {
        label: "Vendas do Mês",
        data: metrics.vendasMes.map((v) => v.total),
        borderWidth: 3,
        tension: 0.4,
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.15)",
      },
    ],
  };

  const pizzasMaisVendidasData = {
    labels: metrics.pizzasMaisVendidas.map((p) => p.sabor),
    datasets: [
      {
        label: "Mais Vendidas",
        data: metrics.pizzasMaisVendidas.map((p) => p.quantidade),
        backgroundColor: [
          "#4f46e5",
          "#06b6d4",
          "#10b981",
          "#f59e0b",
          "#ef4444",
        ],
      },
    ],
  };

  const pedidosPorStatusData = {
    labels: [
    "Pendente",
    "Pago",
    "Em preparação",
    "Saiu para entrega",
    "Entregue",
    "Cancelado",
  ],
    datasets: [
      {
        data: [
          metrics.pedidosPorStatus.cancelado,
          metrics.pedidosPorStatus.em_preparacao,
          metrics.pedidosPorStatus.entregue,
          metrics.pedidosPorStatus.pendente,
          metrics.pedidosPorStatus.paid,
          metrics.pedidosPorStatus.saiu_pra_entrega,
          
        ],
        backgroundColor: [ "#4f46e5",
          "#06b6d4",
          "#10b981",
          "#f59e0b",
          "#ef4444",],
      },
    ],
  };

  const vendasHoraData = {
    labels: metrics.vendasPorHora.map((h) => h.hora),
    datasets: [
      {
        label: "Vendas por Hora",
        data: metrics.vendasPorHora.map((h) => h.total),
        borderWidth: 2,
        tension: 0.3,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.15)",
      },
    ],
  };

  const clientesData = {
    labels: ["Novos", "Recorrentes"],
    datasets: [
      {
        data: [metrics.clientesNovos, metrics.clientesRecorrentes],
        backgroundColor: ["#4f46e5", "#10b981"],
      },
    ],
  };

  const categoriasData = {
    labels: metrics.categorias.map((c) => c.categoria),
    datasets: [
      {
        label: "Categorias",
        data: metrics.categorias.map((c) => c.total),
        backgroundColor: [
          "#4f46e5",
          "#06b6d4",
          "#10b981",
          "#f59e0b",
          "#ef4444",
        ],
      },
    ],
  };

  /* ================================
      JSX
  =================================*/

  return (
    <div className={styles.dashboard}>

      {/* CARDS SUPERIORES */}
      <div className={styles.cardsGrid}>
        <Card title="Vendas Hoje">R$ {metrics.vendasHoje.toFixed(2)}</Card>
        <Card title="Ticket Médio">R$ {metrics.ticketMedio.toFixed(2)}</Card>
        <Card title="Total Clientes">{metrics.totalClientes}</Card>
        <Card title="Novos Clientes">{metrics.novosClientesMes}</Card>
      </div>

      {/* GRÁFICOS PRINCIPAIS */}
      <div className={styles.chartsGrid}>

        <div className={styles.chartBox}>
          <h3>Vendas por Dia</h3>
          <Line data={vendasMesData} options={baseOptions} />
        </div>

        <div className={styles.chartBox}>
          <h3>Pizzas Mais Vendidas</h3>
          <Bar data={pizzasMaisVendidasData} options={baseOptions} />
        </div>

        <div className={styles.chartBox}>
          <h3>Pedidos por Status</h3>
          <Doughnut data={pedidosPorStatusData} options={doughnutOptions} />
        </div>

      </div>

      {/* NOVA LINHA DE GRÁFICOS */}
      <div className={styles.chartsGrid}>

        <div className={styles.chartBox}>
          <h3>Vendas por Hora</h3>
          <Line data={vendasHoraData} options={baseOptions} />
        </div>

        <div className={styles.chartBox}>
          <h3>Novos vs Recorrentes</h3>
          <Doughnut data={clientesData} options={doughnutOptions} />
        </div>

        <div className={styles.chartBox}>
          <h3>Vendas por Categoria</h3>
          <Bar data={categoriasData} options={baseOptions} />
        </div>

      </div>

    </div>
  );
}
