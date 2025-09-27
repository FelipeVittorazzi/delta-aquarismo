import { ref, computed } from 'vue';
import { customerService, saleService, purchaseService, expenseService } from '@/services';
import type { 
  Customer, 
  CreateCustomerRequest, 
  Sale, 
  CreateSaleRequest,
  PurchaseOrder,
  CreatePurchaseOrderRequest,
  ReceivePurchaseOrderRequest,
  Expense,
  CreateExpenseRequest,
  ExpenseFilters
} from '@/types/api';

const customers = ref<Customer[]>([]);
const sales = ref<Sale[]>([]);
const purchaseOrders = ref<PurchaseOrder[]>([]);
const expenses = ref<Expense[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

export function useBusiness() {
  
  const totalExpenses = computed(() => {
    return expenses.value.reduce((total, expense) => total + expense.amount_cents, 0);
  });

  const totalSales = computed(() => {
    return sales.value.reduce((total, sale) => total + sale.final_amount, 0);
  });

  const pendingSales = computed(() => {
    return sales.value.filter(sale => sale.status === 'pending');
  });

  // CLIENTES
  async function buscarClientes(params?: { search?: string; page?: number; per_page?: number }) {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await customerService.searchCustomers(params);
      customers.value = result.data;
      return result;
    } catch (err: any) {
      error.value = err.message || 'Erro ao buscar clientes';
      console.error('Erro ao buscar clientes:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function criarCliente(data: CreateCustomerRequest) {
    loading.value = true;
    error.value = null;
    
    try {
      const novoCliente = await customerService.createCustomer(data);
      customers.value.unshift(novoCliente);
      return novoCliente;
    } catch (err: any) {
      error.value = err.message || 'Erro ao criar cliente';
      console.error('Erro ao criar cliente:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  // VENDAS
  async function criarVenda(data: CreateSaleRequest) {
    loading.value = true;
    error.value = null;
    
    try {
      const novaVenda = await saleService.createSaleWithSplitPayments(data);
      sales.value.unshift(novaVenda);
      return novaVenda;
    } catch (err: any) {
      error.value = err.message || 'Erro ao criar venda';
      console.error('Erro ao criar venda:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function confirmarVenda(saleId: number) {
    loading.value = true;
    error.value = null;
    
    try {
      await saleService.confirmSale(saleId);
      
      // Atualiza o status local
      const venda = sales.value.find(s => s.id === saleId);
      if (venda) {
        venda.status = 'confirmed';
        venda.confirmed_at = new Date().toISOString();
      }
      
      return true;
    } catch (err: any) {
      error.value = err.message || 'Erro ao confirmar venda';
      console.error('Erro ao confirmar venda:', err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  // COMPRAS
  async function criarOrdemCompra(data: CreatePurchaseOrderRequest) {
    loading.value = true;
    error.value = null;
    
    try {
      const novaOrdem = await purchaseService.createPurchaseOrder(data);
      purchaseOrders.value.unshift(novaOrdem);
      return novaOrdem;
    } catch (err: any) {
      error.value = err.message || 'Erro ao criar ordem de compra';
      console.error('Erro ao criar ordem de compra:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function receberOrdemCompra(purchaseOrderId: number, data: ReceivePurchaseOrderRequest) {
    loading.value = true;
    error.value = null;
    
    try {
      await purchaseService.receivePurchaseOrder(purchaseOrderId, data);
      
      // Atualiza o status local
      const ordem = purchaseOrders.value.find(po => po.id === purchaseOrderId);
      if (ordem) {
        ordem.status = 'received';
        ordem.received_at = new Date().toISOString();
      }
      
      return true;
    } catch (err: any) {
      error.value = err.message || 'Erro ao receber ordem de compra';
      console.error('Erro ao receber ordem de compra:', err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  // DESPESAS
  async function carregarDespesas(filters?: ExpenseFilters) {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await expenseService.listExpenses(filters);
      expenses.value = result.data;
      return result;
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar despesas';
      console.error('Erro ao carregar despesas:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function criarDespesa(data: CreateExpenseRequest) {
    loading.value = true;
    error.value = null;
    
    try {
      const novaDespesa = await expenseService.createExpense(data);
      expenses.value.unshift(novaDespesa);
      return novaDespesa;
    } catch (err: any) {
      error.value = err.message || 'Erro ao criar despesa';
      console.error('Erro ao criar despesa:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  // UTILITÁRIOS
  function formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  function formatarData(data: string): string {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(data));
  }

  function limparErro() {
    error.value = null;
  }

  function buscarClientePorId(id: number): Customer | null {
    return customers.value.find(c => c.id === id) || null;
  }

  function buscarVendaPorId(id: number): Sale | null {
    return sales.value.find(s => s.id === id) || null;
  }

  return {
    // Estado
    customers,
    sales,
    purchaseOrders,
    expenses,
    loading,
    error,
    totalExpenses,
    totalSales,
    pendingSales,
    
    // Métodos - Clientes
    buscarClientes,
    criarCliente,
    
    // Métodos - Vendas
    criarVenda,
    confirmarVenda,
    
    // Métodos - Compras
    criarOrdemCompra,
    receberOrdemCompra,
    
    // Métodos - Despesas
    carregarDespesas,
    criarDespesa,
    
    // Utilitários
    formatarMoeda,
    formatarData,
    limparErro,
    buscarClientePorId,
    buscarVendaPorId,
  };
}
