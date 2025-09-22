import { ref, computed } from 'vue';
import { cashbackService, promotionService } from '@/services';
import type { Cashback, Promotion, CreatePromotionRequest } from '@/types/api';

const cashbacks = ref<Cashback[]>([]);
const promotions = ref<Promotion[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const currentUserCashback = ref(0);

export function useCashback() {
  
  const totalCashback = computed(() => {
    return cashbacks.value.reduce((total, cb) => {
      if (cb.status === 'approved' || cb.status === 'paid') {
        return total + cb.amount;
      }
      return total;
    }, 0);
  });

  const pendingCashback = computed(() => {
    return cashbacks.value
      .filter(cb => cb.status === 'pending')
      .reduce((total, cb) => total + cb.amount, 0);
  });

  const activePromotions = computed(() => {
    return promotions.value.filter(p => p.active);
  });

  async function criarCashbackParaVenda(saleId: number) {
    loading.value = true;
    error.value = null;
    
    try {
      const novoCashback = await cashbackService.createOrRecalcCashback(saleId);
      cashbacks.value.unshift(novoCashback);
      return novoCashback;
    } catch (err: any) {
      error.value = err.message || 'Erro ao criar cashback';
      console.error('Erro ao criar cashback:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function aprovarCashback(cashbackId: number) {
    loading.value = true;
    error.value = null;
    
    try {
      await cashbackService.approveCashback(cashbackId);
      
      // Atualiza o status local
      const cashback = cashbacks.value.find(cb => cb.id === cashbackId);
      if (cashback) {
        cashback.status = 'approved';
        cashback.approved_at = new Date().toISOString();
      }
      
      return true;
    } catch (err: any) {
      error.value = err.message || 'Erro ao aprovar cashback';
      console.error('Erro ao aprovar cashback:', err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function marcarCashbackComoPago(cashbackId: number) {
    loading.value = true;
    error.value = null;
    
    try {
      await cashbackService.markCashbackPaid(cashbackId);
      
      // Atualiza o status local
      const cashback = cashbacks.value.find(cb => cb.id === cashbackId);
      if (cashback) {
        cashback.status = 'paid';
        cashback.paid_at = new Date().toISOString();
      }
      
      return true;
    } catch (err: any) {
      error.value = err.message || 'Erro ao marcar cashback como pago';
      console.error('Erro ao marcar cashback como pago:', err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function carregarPromocoes(params?: { page?: number; per_page?: number; is_active?: boolean }) {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await promotionService.listPromotions(params);
      promotions.value = result.data;
      return result;
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar promoções';
      console.error('Erro ao carregar promoções:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function criarPromocao(data: CreatePromotionRequest) {
    loading.value = true;
    error.value = null;
    
    try {
      const novaPromocao = await promotionService.createPromotion(data);
      promotions.value.unshift(novaPromocao);
      return novaPromocao;
    } catch (err: any) {
      error.value = err.message || 'Erro ao criar promoção';
      console.error('Erro ao criar promoção:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function anexarProdutosPromocao(promotionId: number, productIds: number[]) {
    loading.value = true;
    error.value = null;
    
    try {
      await promotionService.attachProductsToPromotion(promotionId, productIds);
      return true;
    } catch (err: any) {
      error.value = err.message || 'Erro ao anexar produtos à promoção';
      console.error('Erro ao anexar produtos à promoção:', err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  function atualizarCashbackUsuario(valor: number) {
    currentUserCashback.value = valor;
  }

  function formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  function limparErro() {
    error.value = null;
  }

  return {
    // Estado
    cashbacks,
    promotions,
    loading,
    error,
    currentUserCashback,
    totalCashback,
    pendingCashback,
    activePromotions,
    
    // Métodos
    criarCashbackParaVenda,
    aprovarCashback,
    marcarCashbackComoPago,
    carregarPromocoes,
    criarPromocao,
    anexarProdutosPromocao,
    atualizarCashbackUsuario,
    formatarMoeda,
    limparErro,
  };
}
