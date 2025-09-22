// Exporta todos os serviços da API
export { fichaService } from './fichaService';
export { fichaApiService } from './fichaApiService';
export { productService } from './productService';
export { postService } from './postService';
export { cashbackService, promotionService } from './cashbackService';
export { customerService } from './customerService';
export { saleService } from './saleService';
export { purchaseService } from './purchaseService';
export { expenseService } from './expenseService';

// Re-exporta o httpClient e authApi
export { httpClient } from './httpClient';
export * from './authApi';

// Re-exporta tipos
export * from '@/types/api';
