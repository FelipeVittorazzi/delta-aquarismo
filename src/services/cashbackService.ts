import { httpClient } from './httpClient';
import type {
  Cashback,
  Promotion,
  CreatePromotionRequest,
  PaginatedResponse
} from '@/types/api';

export class CashbackService {
  /**
   * Cria ou recalcula cashback para uma venda
   */
  async createOrRecalcCashback(saleId: number): Promise<Cashback> {
    return httpClient.post<Cashback>(`/api/sales/${saleId}/cashback`, {});
  }

  /**
   * Aprova um cashback
   */
  async approveCashback(cashbackId: number): Promise<{ message: string }> {
    return httpClient.post<{ message: string }>(`/api/cashbacks/${cashbackId}/approve`);
  }

  /**
   * Marca cashback como pago
   */
  async markCashbackPaid(cashbackId: number): Promise<{ message: string }> {
    return httpClient.post<{ message: string }>(`/api/cashbacks/${cashbackId}/pay`);
  }
}

export class PromotionService {
  private basePath = '/api/promotions';

  /**
   * Lista promoções
   */
  async listPromotions(params?: {
    page?: number;
    per_page?: number;
    is_active?: boolean;
  }): Promise<PaginatedResponse<Promotion>> {
    return httpClient.get<PaginatedResponse<Promotion>>(this.basePath, params);
  }

  /**
   * Cria uma nova promoção
   */
  async createPromotion(data: CreatePromotionRequest): Promise<Promotion> {
    return httpClient.post<Promotion>(this.basePath, data);
  }

  /**
   * Anexa produtos a uma promoção
   */
  async attachProductsToPromotion(
    promotionId: number,
    productIds: number[]
  ): Promise<{ message: string }> {
    return httpClient.post<{ message: string }>(
      `${this.basePath}/${promotionId}/attach-products`,
      { product_ids: productIds }
    );
  }
}

export const cashbackService = new CashbackService();
export const promotionService = new PromotionService();
