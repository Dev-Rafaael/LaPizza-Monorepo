export interface User {
  id: number;
  nome: string;
  sobreNome: string;
  email: string;
  cpf: string;
  sexo: string;
  nascimento: string;
  telefone: string;
  role: string;
}

export interface UserRegister {
    id: number;
  nome: string;
  sobreNome: string;
  email: string;
  senha: string;
  cpf: string;
  sexo: string;
  nascimento: string;
  telefone: string;
  role?: string; 
}
export interface UserUpdate {
  nome?: string;
  sobreNome?: string;
  email?: string;
  senha?: string;
  cpf?: string;
  sexo?: string;
  nascimento?: string;
  telefone?: string;
  role?: string;
}

export interface Contato {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  assunto: string;
  mensagem: string;
}
export interface CreateOrderPayload {
  userId: number;
  addressId: number;
  precoTotal: number;

  items: {
    pizzaId?: number | null;
    sabor: string;
    descricao?: string | null;
    imagem?: string | null;

    precoUnitario: number;
    quantidade: number;
    precoTotal: number;
    adicionais?: any;
  }[];
}

export interface OrderItem {
  id: number;
  orderId: number;

  pizzaId?: number | null;
  sabor: string;
  descricao?: string | null;
  imagem?: string | null;

  precoUnitario: number;
  quantidade: number;
  precoTotal: number;

  adicionais?: any;
}


export interface Order {
  id: number;
  status: string;
  criadoEm: string;
  atualizadoEm: string;
  precoTotal: number;

  userId: number;
  addressId: number;

  user: User;
  address: Address;

  items: OrderItem[];
}


export interface Cart {
  id: number;
  cartId: number;
  sabor: string;
  descricao: string;
  preco: number;
  precoTotal: number;
  unidades: number;
  adicionais: Adicional[];
  imagem?: string;
}

export interface Adicional {
  id: number;
  nome: string;
  preco: number;
  pizzaId: number;
}
export interface Pizzas {
  id: number;
  sabor: string;
  descricao: string;
  preco: number;
  imagem: string;
  adicionais: Adicional[];
}

export interface Address {
  id: number;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento?: string;
  userId: number;
}
export interface Avaliacao {
    id:number;
  nome:string;
  texto:string;
  estrelas:number;
  
}
export interface Destaque {
  id: number;
  descricao: string;
}
export interface LocalOrder {
  id: number;
  nome: string;
  sobreNome: string;
  cpf: string;
  sexo: string;
  nascimento: string;
  email: string;
  telefone: string;
  cep: string;
  estado: string;
  cidade: string;
  numero: string;
  complemento?: string;
  items: OrderItem[];
    status: "PENDENTE" | "PAID" | "EM_PREPARACAO" | "CANCELADO"| "SAIU_PARA_ENTREGA" | "ENTREGUE";
  createdAt: string;
}export interface OrderView {
  id: number;
  status: string;
  precoTotal: number;
  items: OrderItem[];
}