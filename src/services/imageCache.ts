import { Capacitor } from '@capacitor/core';
import { CapacitorHttp } from '@capacitor/core';
import { normalizeImageUrl } from '@/utils/imageUrl';

interface CacheEntry {
  url: string;
  dataUrl: string;
  timestamp: number;
  size: number;
}

class ImageCacheService {
  private cache = new Map<string, CacheEntry>();
  private readonly CACHE_KEY = 'delta_image_cache';
  private readonly MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB
  private readonly CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 dias
  private totalCacheSize = 0;

  constructor() {
    this.loadCacheFromStorage();
  }

  private async loadCacheFromStorage() {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (cached) {
        const data = JSON.parse(cached);
        this.cache = new Map(data.entries);
        this.totalCacheSize = data.totalSize || 0;
        
        // Remove entradas expiradas
        this.cleanExpiredEntries();
      }
    } catch (error) {
      console.warn('Erro ao carregar cache de imagens:', error);
      this.clearCache();
    }
  }

  private async saveCacheToStorage() {
    try {
      const data = {
        entries: Array.from(this.cache.entries()),
        totalSize: this.totalCacheSize
      };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('Erro ao salvar cache de imagens:', error);
      // Se der erro de quota, limpa o cache
      this.clearCache();
    }
  }

  private cleanExpiredEntries() {
    const now = Date.now();
    const expired: string[] = [];

    for (const [url, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.CACHE_DURATION) {
        expired.push(url);
        this.totalCacheSize -= entry.size;
      }
    }

    expired.forEach(url => this.cache.delete(url));
    
    if (expired.length > 0) {
      this.saveCacheToStorage();
    }
  }

  private async ensureCacheSize(newEntrySize: number) {
    // Se o cache estiver muito grande, remove as entradas mais antigas
    while (this.totalCacheSize + newEntrySize > this.MAX_CACHE_SIZE && this.cache.size > 0) {
      let oldestUrl = '';
      let oldestTime = Date.now();

      for (const [url, entry] of this.cache.entries()) {
        if (entry.timestamp < oldestTime) {
          oldestTime = entry.timestamp;
          oldestUrl = url;
        }
      }

      if (oldestUrl) {
        const entry = this.cache.get(oldestUrl);
        if (entry) {
          this.totalCacheSize -= entry.size;
          this.cache.delete(oldestUrl);
        }
      }
    }
  }

  async getCachedImage(url: string): Promise<string> {
    if (!url || url.startsWith('data:') || url.startsWith('blob:')) {
      return url;
    }

    // Normaliza a URL para usar proxy em desenvolvimento
    const normalizedUrl = normalizeImageUrl(url);
    
    // Usa URL original como chave do cache, mas URL normalizada para requisição
    const cacheKey = url;
    const requestUrl = normalizedUrl;

    console.log('Cache - URL original:', url);
    console.log('Cache - URL normalizada:', normalizedUrl);

    // Verifica se já está no cache e não expirou
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      console.log('Cache - Usando imagem do cache');
      return cached.dataUrl;
    }

    try {
      // Para plataformas nativas, usa CapacitorHttp que respeita cache HTTP
      if (Capacitor.isNativePlatform()) {
        const response = await CapacitorHttp.request({
          url: requestUrl,
          method: 'GET',
          responseType: 'blob'
        });

        if (response.status === 200 && response.data) {
          // Converte blob para data URL
          const blob = new Blob([response.data], { type: 'image/jpeg' });
          const dataUrl = await this.blobToDataUrl(blob);
          
          // Adiciona ao cache
          await this.addToCache(cacheKey, dataUrl);
          return dataUrl;
        }
      } else {
        // Para web, usa fetch com URL normalizada (proxy em dev)
        try {
          const response = await fetch(requestUrl, {
            mode: 'cors',
            cache: 'force-cache'
          });
          
          if (response.ok) {
            const blob = await response.blob();
            const dataUrl = await this.blobToDataUrl(blob);
            
            // Adiciona ao cache
            await this.addToCache(cacheKey, dataUrl);
            return dataUrl;
          }
        } catch (corsError) {
          // Se ainda falhar, retorna a URL normalizada para que o ion-img tente carregar
          console.warn('Erro CORS, retornando URL normalizada:', corsError);
          return normalizedUrl;
        }
      }
    } catch (error) {
      console.warn('Erro ao buscar imagem:', error);
    }

    // Se falhou, retorna URL normalizada
    return normalizedUrl;
  }

  private async blobToDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private async addToCache(url: string, dataUrl: string) {
    const size = dataUrl.length * 0.75; // Aproximadamente o tamanho em bytes
    
    // Garante que há espaço no cache
    await this.ensureCacheSize(size);

    const entry: CacheEntry = {
      url,
      dataUrl,
      timestamp: Date.now(),
      size
    };

    this.cache.set(url, entry);
    this.totalCacheSize += size;
    
    // Salva no localStorage
    await this.saveCacheToStorage();
  }

  clearCache() {
    this.cache.clear();
    this.totalCacheSize = 0;
    localStorage.removeItem(this.CACHE_KEY);
  }

  getCacheInfo() {
    return {
      entries: this.cache.size,
      totalSize: this.totalCacheSize,
      maxSize: this.MAX_CACHE_SIZE
    };
  }
}

// Singleton
export const imageCache = new ImageCacheService();

// Função helper para uso nos componentes
export async function getCachedImageUrl(url: string): Promise<string> {
  return imageCache.getCachedImage(url);
}
