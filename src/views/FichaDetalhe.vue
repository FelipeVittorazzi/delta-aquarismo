
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { 
  IonPage, IonContent, IonButton, IonImg, IonIcon, IonSpinner, IonText
} from '@ionic/vue';
import { fish, arrowBack } from 'ionicons/icons';
import { useFicha } from '@/composables/useFicha';
import TitleDelta from '@/components/TitleDelta.vue'
import { Ficha } from '@/types/ficha';

const route = useRoute();
const router = useRouter();
const { buscarFichaNaLista, getImagemFicha, getNomeExibicao } = useFicha();

const ficha = ref<Ficha | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);


const carregarFicha = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const id = Number(route.params.id);
    if (!id) {
      throw new Error('ID da ficha não encontrado');
    }
    
    ficha.value = buscarFichaNaLista(id);
    
    if (!ficha.value) {
      const { carregarFichas } = useFicha();
      await carregarFichas();
      ficha.value = buscarFichaNaLista(id);
    }
    
    if (!ficha.value) {
      error.value = 'Ficha não encontrada';
    }
  } catch (err: any) {
    error.value = err.message || 'Erro ao carregar ficha';
    console.error('Erro ao carregar ficha:', err);
  } finally {
    loading.value = false;
  }
}


const formatPh = (ficha: Ficha) => {
  if (ficha.ph_min && ficha.ph_max) {
    return `${ficha.ph_min} - ${ficha.ph_max}`;
  }
  return '-';
}

const formatTemp = (ficha: Ficha) => {
  if (ficha.temp_min && ficha.temp_max) {
    return `${ficha.temp_min} - ${ficha.temp_max}°C`;
  }
  return '-';
}

const formatTamanho = (ficha: Ficha) => {
  if (ficha.tamanho_max) {
    return `${ficha.tamanho_max} cm`;
  }
  return '-';
}

const formatGh = (ficha: Ficha) => {
  if (ficha.dureza_min && ficha.dureza_max) {
    return `${ficha.dureza_min} - ${ficha.dureza_max}`;
  }
  return '5 - 20';
}

const goBack = () => {
  console.log('goBack');
  router.push('/fichas');
}

onMounted(() => {
  nextTick(() => {
    carregarFicha();
  });
});
</script>

<template>
  <ion-page>
    <ion-content>
      <div v-if="loading" class="flex justify-center items-center py-8">
        <ion-spinner name="crescent"></ion-spinner>
      </div>

      <div v-else-if="error" class="flex justify-center items-center py-8 px-4">
        <ion-text color="danger">
          <p class="text-center">{{ error }}</p>
        </ion-text>
      </div>

      <div v-else-if="ficha" class="ficha-content">
          <div class="custom-header flex items-center justify-between px-4 py-3 relative z-10 my-5">
            <ion-button fill="clear" color="light" @click="goBack" class="m-0 relative z-10">
              <ion-icon :icon="arrowBack" />
            </ion-button>
          <div class="flex items-center justify-center absolute left-0 right-0 top-0 bottom-0">
            <TitleDelta containerClass="!m-0 !p-0 !w-full" small />
          </div>
        </div>

        <div class="hero-container relative h-[244px] mx-5 rounded-3xl overflow-hidden shadow-2xl rounded-b-none">
          <ion-img 
            :src="getImagemFicha(ficha)" 
            :alt="getNomeExibicao(ficha)"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="content-card bg-white mx-5  rounded-3xl p-6 relative z-20 shadow-lg rounded-t-none">
          <div class="mb-4">
            <h1 class="text-3xl font-bold text-gray-900 mb-1">{{ getNomeExibicao(ficha) }}</h1>
            <p class="text-lg text-gray-500 italic">{{ ficha.nome_cientifico }}</p>
          </div>

          <div class="mb-8">
            <div class="flex">
              <div class="flex-1 flex justify-between items-center border border-gray-200 p-2 border-l-0">
                <span class="text-sm text-gray-500 font-medium">pH</span>
                <span class="text-sm text-gray-900 font-semibold">{{ formatPh(ficha) }}</span>
              </div>
              <div class="flex-1 flex justify-between items-center border border-gray-200 p-2 border-r-0">
                <span class="text-sm text-gray-500 font-medium">Temperatura</span>
                <span class="text-sm text-gray-900 font-semibold">{{ formatTemp(ficha) }}</span>
              </div>
            </div>
              <div class="flex">
              <div class="flex-1 flex justify-between items-center border border-gray-200 p-2 border-l-0">
                <span class="text-sm text-gray-500 font-medium">Tamanho</span>
                <span class="text-sm text-gray-900 font-semibold">{{ formatTamanho(ficha) }}</span>
              </div>
              <div class="flex-1 flex justify-between items-center border border-gray-200 p-2 border-r-0">
                <span class="text-sm text-gray-500 font-medium">GH</span>
                <span class="text-sm text-gray-900 font-semibold">{{ formatGh(ficha) }}</span>
              </div>
            </div>
            <div class="flex">
              <div class="flex-1 flex justify-between items-center border border-gray-200 p-2 border-x-0">
                <span class="text-sm text-gray-500 font-medium">Compatibilidade</span>
                <div class="flex gap-1">
                  <ion-icon :icon="fish" class="text-blue-500 text-xl transform rotate-180" />
                  <ion-icon :icon="fish" class="text-blue-500 text-xl transform rotate-180" />
                  <ion-icon :icon="fish" class="text-blue-500 text-xl transform rotate-180" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="ficha.descricao" class="mb-8">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Descrição</h2>
            <p class="text-base leading-relaxed text-gray-700">{{ ficha.descricao }}</p>
          </div>

          <!-- Comments Section -->
          <!-- <div class="border-t border-gray-200 pt-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Comentários</h2>
            <div class="flex gap-3 items-start">
              <div class="comment-avatar w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                <span>GS</span>
              </div>
              <div class="flex-1">
                <div class="font-semibold text-gray-900 text-sm mb-1">Gabriel S.</div>
                <div class="text-gray-700 text-sm leading-relaxed">Ótimas! Lindo peixe, e bem fácil de manter.</div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>