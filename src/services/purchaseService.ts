import { httpClient } from './httpClient';
import type {
  PurchaseOrder,
  CreatePurchaseOrderRequest,
  ReceivePurchaseOrderRequest
} from '@/types/api';

export class PurchaseService {
  private basePath = '/api/purchases';

  /**
   * Cria uma ordem de compra
   */
  async createPurchaseOrder(data: CreatePurchaseOrderRequest): Promise<PurchaseOrder> {
    return httpClient.post<PurchaseOrder>(this.basePath, data);
  }

  /**
   * Recebe uma ordem de compra
   */
  async receivePurchaseOrder(
    purchaseOrderId: number,
    data: ReceivePurchaseOrderRequest
  ): Promise<{ message: string }> {
    return httpClient.post<{ message: string }>(
      `${this.basePath}/${purchaseOrderId}/receive`,
      data
    );
  }
}

export const purchaseService = new PurchaseService();
