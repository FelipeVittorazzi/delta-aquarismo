import { httpClient } from './httpClient';
import type {
  Expense,
  CreateExpenseRequest,
  ExpenseFilters,
  PaginatedResponse
} from '@/types/api';

export class ExpenseService {
  private basePath = '/api/expenses';

  /**
   * Cria uma nova despesa
   */
  async createExpense(data: CreateExpenseRequest): Promise<Expense> {
    return httpClient.post<Expense>(this.basePath, data);
  }

  /**
   * Lista despesas
   */
  async listExpenses(filters?: ExpenseFilters): Promise<PaginatedResponse<Expense>> {
    return httpClient.get<PaginatedResponse<Expense>>(this.basePath, filters);
  }
}

export const expenseService = new ExpenseService();
