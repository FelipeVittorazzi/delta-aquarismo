import { ref } from 'vue';
import { meService } from '@/services';
import type { Cashback, PaginatedResponse, PurchaseOrder } from '@/types/api';
import type { ApiError } from '@/services/httpClient';

export function useMe() {
  const loading = ref(false);
  const error = ref<ApiError | null>(null);

  const cashbackBalance = ref<number | null>(null);
  const cashbacks = ref<Cashback[]>([]);
  const purchases = ref<PurchaseOrder[]>([]);

  async function loadCashbackBalance() {
    try {
      loading.value = true;
      error.value = null;
      const res = await meService.getCashbackBalance();
      // Converte centavos para reais
      cashbackBalance.value = res.balance_cents / 100;
      return res;
    } catch (err: any) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function loadCashbacks(params?: { page?: number; per_page?: number }) {
    try {
      loading.value = true;
      error.value = null;
      const res = await meService.listCashbacks(params);
      cashbacks.value = res.data;
      return res as PaginatedResponse<Cashback>;
    } catch (err: any) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function loadPurchases(params?: { page?: number; per_page?: number }) {
    try {
      loading.value = true;
      error.value = null;
      const res = await meService.listPurchases(params);
      purchases.value = res.data;
      return res as PaginatedResponse<PurchaseOrder>;
    } catch (err: any) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    error,
    cashbackBalance,
    cashbacks,
    purchases,
    loadCashbackBalance,
    loadCashbacks,
    loadPurchases,
  };
}



