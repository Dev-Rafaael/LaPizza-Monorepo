export interface Payment {
  id: string;
  status: string;
  userId?: number;
  createdAt: Date;
}
