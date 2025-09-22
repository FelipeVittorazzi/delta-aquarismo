import { httpClient } from './httpClient';
import type {
  Post,
  PostComment,
  CreatePostRequest,
  CreatePostCommentRequest,
  FeedFilters,
  PaginatedResponse
} from '@/types/api';

export class PostService {
  private basePath = '/api/feed';

  /**
   * Lista o feed de posts
   */
  async listFeed(filters?: FeedFilters): Promise<PaginatedResponse<Post>> {
    return httpClient.get<PaginatedResponse<Post>>(this.basePath, filters);
  }

  /**
   * Cria um novo post
   */
  async createPost(data: CreatePostRequest): Promise<Post> {
    // Envia como JSON conforme documentação
    return httpClient.post<Post>(this.basePath, { body: data.content });
  }

  /**
   * Faz upload de mídia para um post
   */
  async uploadMediaToPost(postId: number, media: File[]): Promise<any> {
    const formData = new FormData();
    
    media.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    return httpClient.post(`${this.basePath}/${postId}/media`, formData);
  }

  /**
   * Curte um post
   */
  async likePost(postId: number): Promise<{ message: string }> {
    return httpClient.post<{ message: string }>(`${this.basePath}/${postId}/like`);
  }

  /**
   * Remove curtida de um post
   */
  async unlikePost(postId: number): Promise<{ message: string }> {
    return httpClient.post<{ message: string }>(`${this.basePath}/${postId}/unlike`);
  }

  /**
   * Lista comentários de um post
   */
  async listComments(postId: number, params?: {
    page?: number;
    per_page?: number;
  }): Promise<PaginatedResponse<PostComment>> {
    return httpClient.get<PaginatedResponse<PostComment>>(
      `${this.basePath}/${postId}/comments`,
      params
    );
  }

  /**
   * Cria um comentário em um post
   */
  async createComment(
    postId: number,
    data: CreatePostCommentRequest
  ): Promise<PostComment> {
    // Envia como JSON conforme documentação
    return httpClient.post<PostComment>(
      `${this.basePath}/${postId}/comments`,
      { body: data.comment }
    );
  }

  /**
   * Faz upload de fotos para um comentário
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
      `/api/feed/comments/${commentId}/photos`,
      formData
    );
  }
}

export const postService = new PostService();
