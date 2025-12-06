import { Request, Response } from "express";
import {
  getVendasHoje,
  getVendasPorMes,
  getPizzasMaisVendidas,
  getTicketMedio,
  getTotalClientes,
  getNovosClientesMes,
  getPedidosPorStatus,
  getVendasPorHora,
  getClientesNovos,
  getClientesRecorrentes,
  getCategorias
} from "../services/metricasService";

export const getMetrics = async (req: Request, res: Response) => {
  const vendasHoje = await getVendasHoje();
  const vendasMes = await getVendasPorMes();
  const ticketMedio = await getTicketMedio();
  const pizzasMaisVendidas = await getPizzasMaisVendidas();
  const totalClientes = await getTotalClientes();
  const novosClientesMes = await getNovosClientesMes();
  const pedidosPorStatus = await getPedidosPorStatus();
  const vendasPorHora = await getVendasPorHora();
  const clientesNovos = await getClientesNovos();
  const clientesRecorrentes = await getClientesRecorrentes();
  const categorias = await getCategorias();

  return res.json({
   vendasHoje,
    vendasMes,
    vendasPorHora,
    ticketMedio,
    pizzasMaisVendidas,
    totalClientes,
    novosClientesMes,
    clientesNovos,
    clientesRecorrentes,
    categorias,
    pedidosPorStatus,
  });
};
