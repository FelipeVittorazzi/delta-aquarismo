// Tipos base
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

// Tipos para Fichas
export interface Ficha {
  id: number;
  title: string;
  description?: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  user: User;
  photos?: Photo[];
}

export interface FichaComment {
  id: number;
  ficha_id: number;
  user_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user: User;
  photos?: Photo[];
}

export interface CreateFichaCommentRequest {
  comment: string;
  photos?: File[];
}

// Tipos para Produtos
export interface Product {
  id: number;
  sku: string;
  name: string;
  type: string;
  sale_price_cents: number;
  cost_price_cents: number;
  stock: number;
  active?: boolean;
  created_at: string;
  updated_at: string;
  photos?: ProductPhoto[];
  cover_photo?: ProductPhoto;
}

export interface ProductPhoto {
  id: number;
  product_id: number;
  filename: string;
  url: string;
  is_cover: boolean;
  created_at: string;
}

export interface CreateProductRequest {
  sku: string;
  name: string;
  type: string;
  sale_price_cents: number;
  cost_price_cents: number;
  stock: number;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

// Tipos para Posts
export interface Post {
  id: number;
  user_id: number;
  body: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  user: User;
  media?: PostMedia[];
}

export interface PostMedia {
  id: number;
  post_id: number;
  filename: string;
  url: string;
  type: 'image' | 'video';
  created_at: string;
}

export interface PostComment {
  id: number;
  post_id: number;
  user_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user: User;
  photos?: Photo[];
}

export interface CreatePostRequest {
  content: string;
  media?: File[];
}

export interface CreatePostCommentRequest {
  comment: string;
  photos?: File[];
}

// Tipos para Cashback
export interface Cashback {
  id: number;
  sale_id: number;
  customer_id: number;
  amount: number;
  percentage: number;
  status: 'pending' | 'approved' | 'paid' | 'cancelled';
  created_at: string;
  updated_at: string;
  approved_at?: string;
  paid_at?: string;
  sale: Sale;
  customer: Customer;
}

export interface Promotion {
  id: number;
  title: string;
  percentage: number;
  active: boolean;
  created_at: string;
  updated_at: string;
  products?: Product[];
}

export interface CreatePromotionRequest {
  title: string;
  percentage: number;
  active: boolean;
}

export interface CreateCashbackRequest {
  sale_id: number;
  recalculate?: boolean;
}

// Tipos para Clientes
export interface Customer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  document?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCustomerRequest {
  name: string;
  email?: string;
  phone?: string;
  document?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}

// Tipos para Vendas
export interface Sale {
  id: number;
  customer_id: number;
  total_amount: number;
  discount_amount?: number;
  final_amount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  updated_at: string;
  confirmed_at?: string;
  customer: Customer;
  items: SaleItem[];
  payments: SalePayment[];
}

export interface SaleItem {
  product_id: number;
  qty: number;
}

export interface SalePayment {
  method: string;
  amount_cents: number;
  installments?: number;
  card_brand?: string;
}

export interface CreateSaleRequest {
  customer_id: number;
  items: SaleItem[];
  payments: SalePayment[];
}

// Tipos para Compras
export interface PurchaseOrder {
  id: number;
  supplier_id?: number;
  type: string;
  status: 'pending' | 'received' | 'cancelled';
  created_at: string;
  updated_at: string;
  received_at?: string;
  items: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
  product_id?: number;
  qty: number;
  unit_cost_cents: number;
}

export interface CreatePurchaseOrderRequest {
  supplier_id?: number;
  type: string;
  items: PurchaseOrderItem[];
}

export interface ReceivePurchaseOrderRequest {
  update_cost: boolean;
}

// Tipos para Despesas
export interface Expense {
  id: number;
  category: string;
  vendor: string;
  amount_cents: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateExpenseRequest {
  category: string;
  vendor: string;
  amount_cents: number;
  notes?: string;
}

// Tipos auxiliares
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  created_at: string;
}

export interface Photo {
  id: number;
  filename: string;
  url: string;
  created_at: string;
}

// Tipos para filtros e parâmetros
export interface FeedFilters {
  page?: number;
  per_page?: number;
  user_id?: number;
}

export interface ProductFilters {
  search?: string;
  type?: string;
  active?: string;
}

export interface CustomerSearchParams {
  search?: string;
  page?: number;
  per_page?: number;
}

export interface ExpenseFilters {
  from?: string;
  to?: string;
}
