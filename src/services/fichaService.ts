import { httpClient } from './httpClient';
import type {
  Ficha,
  FichaComment,
  CreateFichaCommentRequest,
  PaginatedResponse
} from '@/types/api';

export class FichaService {
  private basePath = '/api/ficha';

  /**
   * Lista todas as fichas
   */
  async listFichas(params?: {
    buscar?: string;
    ph_min?: string;
    ph_max?: string;
    categoria?: string;
    familia?: string;
    litragem_min?: string;
    litragem_max?: string;
  }): Promise<PaginatedResponse<Ficha>> {
    return httpClient.get<PaginatedResponse<Ficha>>(this.basePath, params);
  }

  /**
   * Lista comentários de uma ficha
   */
  async listComments(fichaId: number, params?: {
    page?: number;
    per_page?: number;
  }): Promise<PaginatedResponse<FichaComment>> {
    return httpClient.get<PaginatedResponse<FichaComment>>(
      `${this.basePath}/${fichaId}/comments`,
      params
    );
  }

  /**
   * Cria um comentário em uma ficha
   */
  async createComment(
    fichaId: number,
    data: CreateFichaCommentRequest
  ): Promise<FichaComment> {
    // Envia como JSON conforme documentação
    return httpClient.post<FichaComment>(
      `/api/fichas/${fichaId}/comments`,
      { body: data.comment }
    );
  }

  /**
   * Faz upload de fotos para um comentário de ficha
   */
  async uploadPhotosToComment(
    commentId: number,
    photos: File[]
  ): Promise<any> {
    const formData = new FormData();
    
    photos.forEach((photo, index) => {
      formData.append(`files[${index}]`, photo);
    });

    return httpClient.post(
      `/api/comments/fichas/${commentId}/photos`,
      formData
    );
  }

  /**
   * Curte uma ficha
   */
  async likeFicha(fichaId: number): Promise<{ message: string }> {
    return httpClient.post<{ message: string }>(`/api/fichas/${fichaId}/like`);
  }

  /**
   * Remove curtida de uma ficha
   */
  async unlikeFicha(fichaId: number): Promise<{ message: string }> {
    return httpClient.post<{ message: string }>(`/api/fichas/${fichaId}/unlike`);
  }
}

export const fichaService = new FichaService();