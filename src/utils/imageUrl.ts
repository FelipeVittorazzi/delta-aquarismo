/**
 * Utilitários para manipulação de URLs de imagens
 */

/**
 * Converte URL absoluta para URL relativa durante desenvolvimento
 * para aproveitar o proxy do Vite e evitar problemas de CORS
 */
export function normalizeImageUrl(url: string): string {
  if (!url) return url;
  
  // Se já é uma URL relativa, data URL ou blob URL, retorna como está
  if (url.startsWith('/') || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }
  
  // Durante desenvolvimento, converte URLs do deltaaquarismo.com.br para URLs relativas
  // para aproveitar o proxy configurado no Vite
  if (import.meta.env.DEV && url.includes('deltaaquarismo.com.br')) {
    try {
      // Extrai o path após o domínio
      const urlObj = new URL(url);
      const normalizedPath = urlObj.pathname + urlObj.search + urlObj.hash;
      console.log('Normalizando URL:', url, '->', normalizedPath);
      return normalizedPath;
    } catch (error) {
      console.warn('Erro ao normalizar URL:', url, error);
      return url;
    }
  }
  
  // Em produção ou para outros domínios, retorna a URL original
  return url;
}

/**
 * Gera uma URL de placeholder com dimensões e texto customizados
 */
export function getPlaceholderUrl(
  width: number = 600, 
  height: number = 400, 
  text: string = 'Carregando...',
  bgColor: string = 'e2e8f0',
  textColor: string = '64748b'
): string {
  const encodedText = encodeURIComponent(text);
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodedText}`;
}

/**
 * Verifica se uma URL é válida
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    // URLs relativas são consideradas válidas
    if (url.startsWith('/')) return true;
    
    // Data URLs e blob URLs são válidas
    if (url.startsWith('data:') || url.startsWith('blob:')) return true;
    
    // Tenta criar um objeto URL para validar
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Extrai a extensão do arquivo da URL
 */
export function getImageExtension(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const lastDot = pathname.lastIndexOf('.');
    
    if (lastDot === -1) return '';
    
    return pathname.substring(lastDot + 1).toLowerCase();
  } catch {
    // Para URLs relativas ou inválidas
    const lastDot = url.lastIndexOf('.');
    const questionMark = url.indexOf('?');
    const endPos = questionMark === -1 ? url.length : questionMark;
    
    if (lastDot === -1 || lastDot >= endPos) return '';
    
    return url.substring(lastDot + 1, endPos).toLowerCase();
  }
}

/**
 * Verifica se a URL é de uma imagem baseada na extensão
 */
export function isImageUrl(url: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg'];
  const extension = getImageExtension(url);
  return imageExtensions.includes(extension);
}
