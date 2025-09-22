import { httpClient } from './httpClient';

/**
 * Serviço adicional para endpoints específicos de fichas da API
 * Mantém a estrutura existente do useFicha intacta
 */
export class FichaApiService {

  /**
   * Lista comentários de uma ficha
   * GET /api/fichas/{fichaId}/comments
   */
  async listComments(fichaId: number): Promise<any> {
    return httpClient.get(`/api/fichas/${fichaId}/comments`);
  }

  /**
   * Cria um comentário em uma ficha
   * POST /api/fichas/{fichaId}/comments
   */
  async createComment(fichaId: number, body: string): Promise<any> {
    return httpClient.post(`/api/fichas/${fichaId}/comments`, { body });
  }

  /**
   * Faz upload de fotos para um comentário de ficha
   * POST /api/comments/fichas/{commentId}/photos
   */
  async uploadPhotosToComment(commentId: number, photos: File[]): Promise<any> {
    const formData = new FormData();
    
    photos.forEach((photo, index) => {
      formData.append(`files[${index}]`, photo);
    });

    return httpClient.post(`/api/comments/fichas/${commentId}/photos`, formData);
  }

  /**
   * Curte uma ficha
   * POST /api/fichas/{fichaId}/like
   */
  async likeFicha(fichaId: number): Promise<any> {
    return httpClient.post(`/api/fichas/${fichaId}/like`);
  }

  /**
   * Remove curtida de uma ficha
   * POST /api/fichas/{fichaId}/unlike
   */
  async unlikeFicha(fichaId: number): Promise<any> {
    return httpClient.post(`/api/fichas/${fichaId}/unlike`);
  }
}

export const fichaApiService = new FichaApiService();
