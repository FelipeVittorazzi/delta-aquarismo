import { ref, computed } from 'vue';
import { productService } from '@/services';
import type { Product, CreateProductRequest, UpdateProductRequest, ProductFilters, ProductPhoto } from '@/types/api';

const products = ref<Product[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const currentPage = ref(1);
const totalPages = ref(1);

export function useProducts() {
  
  const totalProducts = computed(() => products.value.length);
  const activeProducts = computed(() => products.value.filter(p => p.active !== false));

  async function carregarProdutos(filters?: ProductFilters) {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await productService.listProducts(filters);
      products.value = result.data;
      currentPage.value = result.current_page;
      totalPages.value = result.last_page;
      return result;
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar produtos';
      console.error('Erro ao carregar produtos:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function criarProduto(data: CreateProductRequest) {
    loading.value = true;
    error.value = null;
    
    try {
      const novoProduto = await productService.createProduct(data);
      products.value.unshift(novoProduto);
      return novoProduto;
    } catch (err: any) {
      error.value = err.message || 'Erro ao criar produto';
      console.error('Erro ao criar produto:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function buscarProduto(productId: number) {
    const produtoExistente = products.value.find(p => p.id === productId);
    if (produtoExistente) {
      return produtoExistente;
    }
    
    loading.value = true;
    error.value = null;
    
    try {
      const produto = await productService.showProduct(productId);
      return produto;
    } catch (err: any) {
      error.value = err.message || 'Erro ao buscar produto';
      console.error('Erro ao buscar produto:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function atualizarProduto(productId: number, data: UpdateProductRequest) {
    loading.value = true;
    error.value = null;
    
    try {
      const produtoAtualizado = await productService.updateProduct(productId, data);
      
      // Atualiza na lista local
      const index = products.value.findIndex(p => p.id === productId);
      if (index !== -1) {
        products.value[index] = produtoAtualizado;
      }
      
      return produtoAtualizado;
    } catch (err: any) {
      error.value = err.message || 'Erro ao atualizar produto';
      console.error('Erro ao atualizar produto:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function deletarProduto(productId: number) {
    loading.value = true;
    error.value = null;
    
    try {
      await productService.deleteProduct(productId);
      
      // Remove da lista local
      const index = products.value.findIndex(p => p.id === productId);
      if (index !== -1) {
        products.value.splice(index, 1);
      }
      
      return true;
    } catch (err: any) {
      error.value = err.message || 'Erro ao deletar produto';
      console.error('Erro ao deletar produto:', err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function uploadFotosProduto(productId: number, photos: File[]) {
    loading.value = true;
    error.value = null;
    
    try {
      const fotosUpload = await productService.uploadProductPhotos(productId, photos);
      
      // Atualiza as fotos do produto na lista local
      const produto = products.value.find(p => p.id === productId);
      if (produto) {
        produto.photos = [...(produto.photos || []), ...fotosUpload];
      }
      
      return fotosUpload;
    } catch (err: any) {
      error.value = err.message || 'Erro ao fazer upload de fotos';
      console.error('Erro ao fazer upload de fotos:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function definirFotoCapa(productId: number, photoId: number) {
    loading.value = true;
    error.value = null;
    
    try {
      await productService.setCoverPhoto(productId, photoId);
      
      // Atualiza no estado local
      const produto = products.value.find(p => p.id === productId);
      if (produto && produto.photos) {
        produto.photos.forEach(photo => {
          photo.is_cover = photo.id === photoId;
        });
        produto.cover_photo = produto.photos.find(p => p.id === photoId);
      }
      
      return true;
    } catch (err: any) {
      error.value = err.message || 'Erro ao definir foto de capa';
      console.error('Erro ao definir foto de capa:', err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function deletarFotoProduto(productId: number, photoId: number) {
    loading.value = true;
    error.value = null;
    
    try {
      await productService.deleteProductPhoto(productId, photoId);
      
      // Remove da lista local
      const produto = products.value.find(p => p.id === productId);
      if (produto && produto.photos) {
        produto.photos = produto.photos.filter(p => p.id !== photoId);
        if (produto.cover_photo?.id === photoId) {
          produto.cover_photo = undefined;
        }
      }
      
      return true;
    } catch (err: any) {
      error.value = err.message || 'Erro ao deletar foto';
      console.error('Erro ao deletar foto:', err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  function limparErro() {
    error.value = null;
  }

  function buscarProdutoNaLista(id: number): Product | null {
    return products.value.find(p => p.id === id) || null;
  }

  return {
    // Estado
    products,
    loading,
    error,
    currentPage,
    totalPages,
    totalProducts,
    activeProducts,
    
    // Métodos
    carregarProdutos,
    criarProduto,
    buscarProduto,
    atualizarProduto,
    deletarProduto,
    uploadFotosProduto,
    definirFotoCapa,
    deletarFotoProduto,
    limparErro,
    buscarProdutoNaLista,
  };
}
