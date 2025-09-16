import { ref, computed } from 'vue';
import { httpClient } from '@/services/httpClient';
import { Ficha, FichaFilters } from '@/types/ficha';

const fichas = ref<Ficha[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const selectedCategory = ref<'fauna' | 'flora' | 'invertebrado'>('fauna');

export function useFicha() {

  const fichasPorCategoria = computed(() => {
    return fichas.value.filter(ficha => ficha.categoria === selectedCategory.value);
  });

  const totalFichas = computed(() => fichas.value.length);

  async function carregarFichas(filters?: FichaFilters) {
    loading.value = true;
    error.value = null;
    
    try {
      const allFilters: FichaFilters = {
        categoria: selectedCategory.value,
        ...filters,
      };
      
      fichas.value = await httpClient.get<Ficha[]>('/api/ficha', allFilters);
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar fichas';
      console.error('Erro ao carregar fichas:', err);
    } finally {
      loading.value = false;
    }
  }

  async function buscarFicha(id: number): Promise<Ficha | null> {
    const fichaExistente = fichas.value.find(f => f.id === id);
    if (fichaExistente) {
      return fichaExistente;
    }
    
    try {
      return await httpClient.get<Ficha>(`/api/ficha/${id}`);
    } catch (err: any) {
      error.value = err.message || 'Erro ao buscar ficha';
      console.error('Erro ao buscar ficha:', err);
      return null;
    }
  }

  async function buscarFichaPorSlug(slug: string): Promise<Ficha | null> {
    try {
      return await httpClient.get<Ficha>(`/api/ficha/slug/${slug}`);
    } catch (err: any) {
      error.value = err.message || 'Erro ao buscar ficha';
      console.error('Erro ao buscar ficha:', err);
      return null;
    }
  }

  function getImagemFicha(ficha: Ficha): string {
    return ficha.capa?.url_new || ficha.fotos?.[0]?.url_new || 'https://placehold.co/600x400';
  }

  function getNomeExibicao(ficha: Ficha): string {
    return ficha.nomes_comum || ficha.nome_cientifico;
  }

  function setCategoria(categoria: 'fauna' | 'flora' | 'invertebrado') {
    selectedCategory.value = categoria;
  }

  function limparErro() {
    error.value = null;
  }

  function buscarFichaNaLista(id: number): Ficha | null {
    return fichas.value.find(f => f.id === id) || null;
  }

  return {
    // Estado
    fichas,
    fichasPorCategoria,
    loading,
    error,
    selectedCategory,
    totalFichas,
    
    // Métodos
    carregarFichas,
    buscarFicha,
    buscarFichaNaLista,
    buscarFichaPorSlug,
    getImagemFicha,
    getNomeExibicao,
    setCategoria,
    limparErro,
  };
}
