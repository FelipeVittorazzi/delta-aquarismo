import { httpClient } from './httpClient';
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductFilters,
  PaginatedResponse,
  ProductPhoto
} from '@/types/api';

export class ProductService {
  private basePath = '/api/products';

  /**
   * Lista produtos
   */
  async listProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    return httpClient.get<PaginatedResponse<Product>>(this.basePath, filters);
  }

  /**
   * Cria um novo produto
   */
  async createProduct(data: CreateProductRequest): Promise<Product> {
    return httpClient.post<Product>(this.basePath, data);
  }

  /**
   * Mostra um produto específico
   */
  async showProduct(productId: number): Promise<Product> {
    return httpClient.get<Product>(`${this.basePath}/${productId}`);
  }

  /**
   * Atualiza um produto
   */
  async updateProduct(productId: number, data: UpdateProductRequest): Promise<Product> {
    return httpClient.put<Product>(`${this.basePath}/${productId}`, data);
  }

  /**
   * Deleta um produto
   */
  async deleteProduct(productId: number): Promise<{ message: string }> {
    return httpClient.delete<{ message: string }>(`${this.basePath}/${productId}`);
  }

  /**
   * Faz upload de fotos para um produto
   */
  async uploadProductPhotos(productId: number, photos: File[], isCover?: boolean): Promise<ProductPhoto[]> {
    const formData = new FormData();
    
    photos.forEach((photo, index) => {
      formData.append(`files[${index}]`, photo);
    });
    
    if (isCover) {
      formData.append('is_cover', 'true');
    }

    return httpClient.post<ProductPhoto[]>(
      `${this.basePath}/${productId}/photos`,
      formData
    );
  }

  /**
   * Define uma foto como capa do produto
   */
  async setCoverPhoto(productId: number, photoId: number): Promise<{ message: string }> {
    return httpClient.post<{ message: string }>(
      `${this.basePath}/${productId}/photos/${photoId}/cover`
    );
  }

  /**
   * Deleta uma foto do produto
   */
  async deleteProductPhoto(productId: number, photoId: number): Promise<{ message: string }> {
    return httpClient.delete<{ message: string }>(
      `${this.basePath}/${productId}/photos/${photoId}`
    );
  }
}

export const productService = new ProductService();
