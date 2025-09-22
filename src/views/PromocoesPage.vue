<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { IonPage, IonContent, IonList, IonSpinner, IonText } from '@ionic/vue';
import CardPromocao from '@/components/CardPromocao.vue';
import HeaderPadrao from '@/components/HeaderPadrao.vue';
import TitleDelta from '@/components/TitleDelta.vue';
import { useCashback } from '@/composables';

const { promotions, loading, error, carregarPromocoes, activePromotions } = useCashback();

onMounted(() => {
  carregarPromocoes();
});

// Adapta as promoções da API para o formato esperado pelo CardPromocao
const promocoesFormatadas = computed(() => {
  return activePromotions.value.map(promocao => ({
    id: promocao.id,
    nome: promocao.title,
    imagem: promocao.products?.[0]?.cover_photo?.url || 'https://placehold.co/600x400',
    cashback: promocao.percentage
  }));
});
</script> 

<template>
  <ion-page>
    <HeaderPadrao title="PROMOÇÕES" />
    
    <ion-content>
      <TitleDelta containerClass="!mt-0 !pb-0" />
      
      <!-- Loading -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <ion-spinner name="crescent"></ion-spinner>
      </div>

      <!-- Erro -->
      <div v-else-if="error" class="flex justify-center items-center py-8 px-4">
        <ion-text color="danger">
          <p class="text-center">{{ error }}</p>
        </ion-text>
      </div>

      <!-- Lista de promoções -->
      <div v-else class="">
        <ion-list class="!bg-transparent">
          <CardPromocao
            v-for="promocao in promocoesFormatadas"
            :key="promocao.id"
            :nome="promocao.nome"
            :imagem="promocao.imagem"
            :cashback="promocao.cashback"
          />
          
          <!-- Mensagem quando não há promoções -->
          <div v-if="promocoesFormatadas.length === 0" class="text-center py-8 px-4">
            <ion-text color="medium">
              <p>Nenhuma promoção ativa no momento.</p>
            </ion-text>
          </div>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>
