export interface VendasMes {
  mes: string;
  total: number;
}

export interface PizzaMaisVendida {
  pizzaId: number | null;
  quantidade: number;
  sabor: string;
}

export interface PedidosStatus {
  pendente: number;
  paid: number;
  em_preparacao: number;
  entregue: number;
  cancelado: number;
  saiu_pra_entrega: number;
}

export interface VendasPorHora {
  hora: string;
  total: number;
}

export interface ClientesNovos {
  dia: string;
  total: number;
}

export interface CategoriasVendas {
  categoria: string;
  total: number;
}

export interface Metrics {
  vendasHoje: number;
  vendasMes: VendasMes[];
  vendasPorHora: VendasPorHora[];
  ticketMedio: number;
  pizzasMaisVendidas: PizzaMaisVendida[];
  totalClientes: number;
  novosClientesMes: number;
  clientesNovos: ClientesNovos[];
  clientesRecorrentes: number;
  categorias: CategoriasVendas[];
  pedidosPorStatus: PedidosStatus;
}

