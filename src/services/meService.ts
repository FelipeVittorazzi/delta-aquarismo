import { httpClient } from './httpClient';
import type { PaginatedResponse, Cashback, PurchaseOrder } from '@/types/api';

export interface CashbackBalanceResponse {
  balance_cents: number;
}

export class MeService {
  /**
   * Saldo de cashback do usuário autenticado
   */
  async getCashbackBalance(): Promise<CashbackBalanceResponse> {
    return httpClient.get<CashbackBalanceResponse>('/api/me/cashback-balance');
  }

  /**
   * Histórico de cashbacks do usuário autenticado
   */
  async listCashbacks(params?: { page?: number; per_page?: number }): Promise<PaginatedResponse<Cashback>> {
    return httpClient.get<PaginatedResponse<Cashback>>('/api/me/cashbacks', params);
  }

  /**
   * Histórico de compras do usuário autenticado
   */
  async listPurchases(params?: { page?: number; per_page?: number }): Promise<PaginatedResponse<PurchaseOrder>> {
    return httpClient.get<PaginatedResponse<PurchaseOrder>>('/api/me/purchases', params);
  }
}

export const meService = new MeService();



