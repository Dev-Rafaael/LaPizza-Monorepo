export interface Notification {
  id: number;
  titulo: string;
  mensagem: string;
  lida: boolean;
  criadoEm: Date;
  userId: number;
}

