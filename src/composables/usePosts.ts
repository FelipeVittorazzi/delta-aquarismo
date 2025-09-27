import { postService } from '@/services';
import type { Post, PostComment, FeedFilters } from '@/types/api';

const posts = ref<Post[]>([]);
const postComments = ref<PostComment[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const currentPage = ref(1);
const totalPages = ref(1);

export function usePosts() {
  
  const totalPosts = computed(() => posts.value.length);

  async function carregarFeed(filters?: FeedFilters) {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await postService.listFeed(filters);
      posts.value = result.data;
      currentPage.value = result.current_page;
      totalPages.value = result.last_page;
      return result;
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar feed';
      console.error('Erro ao carregar feed:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function criarPost(content: string, media?: File[]) {
    loading.value = true;
    error.value = null;
    
    try {
      const novoPost = await postService.createPost({ content, media });
      posts.value.unshift(novoPost);
      return novoPost;
    } catch (err: any) {
      error.value = err.message || 'Erro ao criar post';
      console.error('Erro ao criar post:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function curtirPost(postId: number) {
    try {
      await postService.likePost(postId);
      // Atualiza o estado local
      const post = posts.value.find(p => p.id === postId);
      if (post) {
        post.is_liked = true;
        post.likes_count++;
      }
      return true;
    } catch (err: any) {
      error.value = err.message || 'Erro ao curtir post';
      console.error('Erro ao curtir post:', err);
      return false;
    }
  }

  async function descurtirPost(postId: number) {
    try {
      await postService.unlikePost(postId);
      // Atualiza o estado local
      const post = posts.value.find(p => p.id === postId);
      if (post) {
        post.is_liked = false;
        post.likes_count--;
      }
      return true;
    } catch (err: any) {
      error.value = err.message || 'Erro ao descurtir post';
      console.error('Erro ao descurtir post:', err);
      return false;
    }
  }

  async function carregarComentarios(postId: number, params?: { page?: number; per_page?: number }) {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await postService.listComments(postId, params);
      postComments.value = result.data;
      return result;
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar comentários';
      console.error('Erro ao carregar comentários:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function criarComentario(postId: number, comment: string, photos?: File[]) {
    loading.value = true;
    error.value = null;
    
    try {
      const novoComentario = await postService.createComment(postId, { comment, photos });
      postComments.value.unshift(novoComentario);
      
      // Atualiza contador de comentários no post
      const post = posts.value.find(p => p.id === postId);
      if (post) {
        post.comments_count++;
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

  async function uploadMidiaPost(postId: number, media: File[]) {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await postService.uploadMediaToPost(postId, media);
      return result;
    } catch (err: any) {
      error.value = err.message || 'Erro ao fazer upload de mídia';
      console.error('Erro ao fazer upload de mídia:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  function limparErro() {
    error.value = null;
  }

  function buscarPostNaLista(id: number): Post | null {
    return posts.value.find(p => p.id === id) || null;
  }

  return {
    // Estado
    posts,
    postComments,
    loading,
    error,
    currentPage,
    totalPages,
    totalPosts,
    
    // Métodos
    carregarFeed,
    criarPost,
    curtirPost,
    descurtirPost,
    carregarComentarios,
    criarComentario,
    uploadMidiaPost,
    limparErro,
    buscarPostNaLista,
  };
}
