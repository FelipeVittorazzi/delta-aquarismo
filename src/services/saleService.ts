import { httpClient } from './httpClient';
import type {
  Sale,
  CreateSaleRequest
} from '@/types/api';

export class SaleService {
  private basePath = '/api/sales';

  /**
   * Cria uma venda com pagamentos divididos
   */
  async createSaleWithSplitPayments(data: CreateSaleRequest): Promise<Sale> {
    return httpClient.post<Sale>(`${this.basePath}/split-payments`, data);
  }

  /**
   * Confirma uma venda
   */
  async confirmSale(saleId: number): Promise<{ message: string }> {
    return httpClient.post<{ message: string }>(`${this.basePath}/${saleId}/confirm`);
  }
}

export const saleService = new SaleService();
