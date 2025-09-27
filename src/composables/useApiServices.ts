import { ref, reactive } from 'vue';
import {
  fichaService,
  productService,
  postService,
  cashbackService,
  promotionService,
  customerService,
  saleService,
  purchaseService,
  expenseService
} from '@/services';
import type { ApiError } from '@/services/httpClient';
import type { Ficha, Product, Post, Customer, Sale, Expense } from '@/types/api';

/**
 * Composable que fornece acesso a todos os serviços da API
 * com estados de loading e error
 */
export function useApiServices() {
  const loading = ref(false);
  const error = ref<ApiError | null>(null);

  const state = reactive({
    fichas: [] as Ficha[],
    products: [] as Product[],
    posts: [] as Post[],
    customers: [] as Customer[],
    sales: [] as Sale[],
    expenses: [] as Expense[]
  });

  /**
   * Wrapper para executar chamadas da API com tratamento de erro
   */
  const execute = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    try {
      loading.value = true;
      error.value = null;
      const result = await apiCall();
      return result;
    } catch (err) {
      error.value = err as ApiError;
      console.error('Erro na API:', err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  // Métodos para Fichas
  const fichas = {
    async list(params?: { buscar?: string; ph_min?: string; ph_max?: string; categoria?: string; familia?: string; litragem_min?: string; litragem_max?: string }) {
      const result = await execute(() => fichaService.listFichas(params));
      if (result) {
        state.fichas = result.data;
      }
      return result;
    },

    async listComments(fichaId: number, params?: { page?: number; per_page?: number }) {
      return execute(() => fichaService.listComments(fichaId, params));
    },

    async createComment(fichaId: number, comment: string, photos?: File[]) {
      return execute(() => fichaService.createComment(fichaId, { comment, photos }));
    },

    async like(fichaId: number) {
      return execute(() => fichaService.likeFicha(fichaId));
    },

    async unlike(fichaId: number) {
      return execute(() => fichaService.unlikeFicha(fichaId));
    }
  };

  // Métodos para Produtos
  const products = {
    async list(filters?: any) {
      const result = await execute(() => productService.listProducts(filters));
      if (result) {
        state.products = result.data;
      }
      return result;
    },

    async create(data: any) {
      return execute(() => productService.createProduct(data));
    },

    async show(productId: number) {
      return execute(() => productService.showProduct(productId));
    },

    async update(productId: number, data: any) {
      return execute(() => productService.updateProduct(productId, data));
    },

    async delete(productId: number) {
      return execute(() => productService.deleteProduct(productId));
    },

    async uploadPhotos(productId: number, photos: File[]) {
      return execute(() => productService.uploadProductPhotos(productId, photos));
    },

    async setCoverPhoto(productId: number, photoId: number) {
      return execute(() => productService.setCoverPhoto(productId, photoId));
    }
  };

  // Métodos para Posts
  const posts = {
    async listFeed(filters?: any) {
      const result = await execute(() => postService.listFeed(filters));
      if (result) {
        state.posts = result.data;
      }
      return result;
    },

    async create(content: string, media?: File[]) {
      return execute(() => postService.createPost({ content, media }));
    },

    async like(postId: number) {
      return execute(() => postService.likePost(postId));
    },

    async unlike(postId: number) {
      return execute(() => postService.unlikePost(postId));
    },

    async listComments(postId: number, params?: { page?: number; per_page?: number }) {
      return execute(() => postService.listComments(postId, params));
    },

    async createComment(postId: number, comment: string, photos?: File[]) {
      return execute(() => postService.createComment(postId, { comment, photos }));
    }
  };

  // Métodos para Clientes
  const customers = {
    async search(params?: any) {
      const result = await execute(() => customerService.searchCustomers(params));
      if (result) {
        state.customers = result.data;
      }
      return result;
    },

    async create(data: any) {
      return execute(() => customerService.createCustomer(data));
    }
  };

  // Métodos para Vendas
  const sales = {
    async create(data: any) {
      return execute(() => saleService.createSaleWithSplitPayments(data));
    },

    async confirm(saleId: number) {
      return execute(() => saleService.confirmSale(saleId));
    }
  };

  // Métodos para Cashback
  const cashback = {
    async createForSale(saleId: number, recalculate?: boolean) {
      return execute(() => cashbackService.createOrRecalcCashback(saleId));
    },

    async approve(cashbackId: number) {
      return execute(() => cashbackService.approveCashback(cashbackId));
    },

    async markPaid(cashbackId: number) {
      return execute(() => cashbackService.markCashbackPaid(cashbackId));
    }
  };

  // Métodos para Promoções
  const promotions = {
    async list(params?: any) {
      return execute(() => promotionService.listPromotions(params));
    },

    async create(data: any) {
      return execute(() => promotionService.createPromotion(data));
    },

    async attachProducts(promotionId: number, productIds: number[]) {
      return execute(() => promotionService.attachProductsToPromotion(promotionId, productIds));
    }
  };

  // Métodos para Compras
  const purchases = {
    async createOrder(data: any) {
      return execute(() => purchaseService.createPurchaseOrder(data));
    },

    async receiveOrder(purchaseOrderId: number, data: any) {
      return execute(() => purchaseService.receivePurchaseOrder(purchaseOrderId, data));
    }
  };

  // Métodos para Despesas
  const expenses = {
    async list(filters?: any) {
      const result = await execute(() => expenseService.listExpenses(filters));
      if (result) {
        state.expenses = result.data;
      }
      return result;
    },

    async create(data: any) {
      return execute(() => expenseService.createExpense(data));
    }
  };

  return {
    loading,
    error,
    state,
    fichas,
    products,
    posts,
    customers,
    sales,
    cashback,
    promotions,
    purchases,
    expenses
  };
}
