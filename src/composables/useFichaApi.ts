import { ref } from 'vue';
import { fichaApiService } from '@/services/fichaApiService';

/**
 * Composable adicional para funcionalidades específicas da API de fichas
 * Não altera a estrutura existente do useFicha
 */
export function useFichaApi() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const comments = ref<any[]>([]);

  /**
   * Carrega comentários de uma ficha
   */
  async function carregarComentarios(fichaId: number) {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await fichaApiService.listComments(fichaId);
      comments.value = Array.isArray(result) ? result : (result.data || []);
      return result;
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar comentários';
      console.error('Erro ao carregar comentários:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Cria um comentário em uma ficha
   */
  async function criarComentario(fichaId: number, comentario: string) {
    loading.value = true;
    error.value = null;
    
    try {
      const novoComentario = await fichaApiService.createComment(fichaId, comentario);
      
      // Adiciona o novo comentário à lista local
      if (Array.isArray(comments.value)) {
        comments.value.unshift(novoComentario);
      }
      
      return novoComentario;
    } catch (err: any) {
      error.value = err.message || 'Erro ao criar comentário';
      console.error('Erro ao criar comentário:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Faz upload de fotos para um comentário
   */
  async function uploadFotosComentario(commentId: number, fotos: File[]) {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await fichaApiService.uploadPhotosToComment(commentId, fotos);
      return result;
    } catch (err: any) {
      error.value = err.message || 'Erro ao fazer upload das fotos';
      console.error('Erro ao fazer upload das fotos:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Curte uma ficha
   */
  async function curtirFicha(fichaId: number) {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await fichaApiService.likeFicha(fichaId);
      return result;
    } catch (err: any) {
      error.value = err.message || 'Erro ao curtir ficha';
      console.error('Erro ao curtir ficha:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Remove curtida de uma ficha
   */
  async function descurtirFicha(fichaId: number) {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await fichaApiService.unlikeFicha(fichaId);
      return result;
    } catch (err: any) {
      error.value = err.message || 'Erro ao descurtir ficha';
      console.error('Erro ao descurtir ficha:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Limpa erros
   */
  function limparErro() {
    error.value = null;
  }

  return {
    // Estado
    loading,
    error,
    comments,
    
    // Métodos
    carregarComentarios,
    criarComentario,
    uploadFotosComentario,
    curtirFicha,
    descurtirFicha,
    limparErro,
  };
}
