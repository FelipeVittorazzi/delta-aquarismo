<template>
  <div class="optimized-image-container" :class="containerClass">
    <ion-skeleton-text 
      v-if="isLoading" 
      :class="skeletonClass"
      class="absolute inset-0 w-full h-full"
    />
    
    <ion-img
      :src="imageSrc"
      :alt="alt"
      :class="imageClass"
      class="w-full h-full object-cover"
      :style="{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease' }"
      @ionImgDidLoad="onImageLoad"
      @ionError="onImageError"
    />
    
    <div 
      v-if="hasError && !isLoading" 
      :class="imageClass"
      class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400"
    >
      <ion-icon name="image-outline" class="text-4xl" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonImg, IonSkeletonText, IonIcon } from '@ionic/vue';
import { getCachedImageUrl } from '@/services/imageCache';

interface Props {
  src: string;
  alt?: string;
  containerClass?: string;
  imageClass?: string;
  skeletonClass?: string;
  fallbackSrc?: string;
  enableCache?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  containerClass: 'relative overflow-hidden',
  imageClass: '',
  skeletonClass: 'rounded-xl',
  fallbackSrc: 'https://placehold.co/600x400/e2e8f0/64748b?text=Imagem',
  enableCache: true
});

const emit = defineEmits<{
  load: [src: string];
  error: [error: Event];
}>();

const isLoading = ref(true);
const hasError = ref(false);
const imageSrc = ref(props.src);

async function loadImage() {
  console.log('OptimizedImage - Carregando:', props.src);
  
  if (!props.src) {
    imageSrc.value = props.fallbackSrc;
    isLoading.value = false;
    return;
  }

  isLoading.value = true;
  hasError.value = false;

  try {
    if (props.enableCache && !props.src.startsWith('data:') && !props.src.startsWith('blob:')) {
      // Usa cache para URLs externas
      const cachedUrl = await getCachedImageUrl(props.src);
      console.log('OptimizedImage - URL do cache:', cachedUrl);
      imageSrc.value = cachedUrl;
    } else {
      // Usa URL normalizada diretamente
      const { normalizeImageUrl } = await import('@/utils/imageUrl');
      const normalizedUrl = normalizeImageUrl(props.src);
      console.log('OptimizedImage - URL normalizada direta:', normalizedUrl);
      imageSrc.value = normalizedUrl;
    }
  } catch (error) {
    console.warn('OptimizedImage - Erro ao carregar imagem:', error);
    // Em caso de erro, usa URL normalizada como fallback
    const { normalizeImageUrl } = await import('@/utils/imageUrl');
    imageSrc.value = normalizeImageUrl(props.src);
  }
}

function onImageLoad() {
  isLoading.value = false;
  hasError.value = false;
  emit('load', imageSrc.value);
}

function onImageError(event: Event) {
  console.warn('Erro ao exibir imagem:', event);
  
  // Se ainda não tentou o fallback, tenta usar
  if (imageSrc.value !== props.fallbackSrc) {
    imageSrc.value = props.fallbackSrc;
    return;
  }
  
  // Se o fallback também falhou, mostra erro
  isLoading.value = false;
  hasError.value = true;
  emit('error', event);
}

// Carrega a imagem quando o componente é montado
onMounted(() => {
  loadImage();
  
  // Timeout de segurança para remover loading mesmo se o evento não disparar
  setTimeout(() => {
    if (isLoading.value) {
      console.log('OptimizedImage - Timeout: forçando fim do loading');
      isLoading.value = false;
    }
  }, 5000); // 5 segundos
});

// Recarrega quando a src muda
watch(() => props.src, () => {
  loadImage();
});
</script>

<style scoped>
.optimized-image-container {
  position: relative;
}

/* Animação suave para o skeleton */
ion-skeleton-text {
  --background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  --background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Tema escuro */
@media (prefers-color-scheme: dark) {
  ion-skeleton-text {
    --background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
  }
}
</style>
