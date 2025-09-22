import { httpClient } from './httpClient';
import type {
  Customer,
  CreateCustomerRequest,
  CustomerSearchParams,
  PaginatedResponse
} from '@/types/api';

export class CustomerService {
  private basePath = '/api/customers';

  /**
   * Busca clientes
   */
  async searchCustomers(params?: CustomerSearchParams): Promise<PaginatedResponse<Customer>> {
    return httpClient.get<PaginatedResponse<Customer>>(`${this.basePath}/search`, params);
  }

  /**
   * Cria um novo cliente
   */
  async createCustomer(data: CreateCustomerRequest): Promise<Customer> {
    return httpClient.post<Customer>(this.basePath, data);
  }
}

export const customerService = new CustomerService();
