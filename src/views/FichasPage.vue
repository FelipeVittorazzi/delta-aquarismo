<script setup lang="ts">
import { IonPage, IonContent, IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonThumbnail, IonImg, IonSpinner, IonText } from '@ionic/vue';
import { useFicha } from '@/composables/useFicha';

const {
  fichas,
  loading,
  error,
  selectedCategory,
  carregarFichas,
  getImagemFicha,
  getNomeExibicao,
} = useFicha();

onMounted(() => {
  carregarFichas();
});

watch(selectedCategory, () => {
  carregarFichas();
});
</script>

<template>
  <ion-page>
    <ion-content :scroll-y="false">
      <div class="header-section">
        <div class="flex flex-col gap-3 items-center justify-center text-white pt-20 pb-10">
        <h1 class="text-3xl font-bold">FICHAS</h1>
      </div>
        
        <div class="segment-container">
          <ion-segment v-model="selectedCategory">
            <ion-segment-button value="fauna">
              <ion-label class="text-sm font-semibold">Peixes</ion-label>
            </ion-segment-button>
            <ion-segment-button value="flora">
              <ion-label class="text-sm font-semibold">Plantas</ion-label>
            </ion-segment-button>
            <ion-segment-button value="invertebrado">
              <ion-label class="text-sm font-semibold">Invertebrados</ion-label>
            </ion-segment-button>
          </ion-segment>
        </div>
      </div>

      <div class="list-section">
        <div v-if="loading" class="flex justify-center items-center py-8">
          <ion-spinner name="crescent"></ion-spinner>
        </div>

        <div v-else-if="error" class="flex justify-center items-center py-8 px-4">
          <ion-text color="danger">
            <p class="text-center">{{ error }}</p>
          </ion-text>
        </div>

        <ion-list v-else-if="fichas.length > 0" class="fish-list">
          <ion-item 
            v-for="ficha in fichas" 
            :key="ficha.id" 
            :router-link="'/ficha/' + ficha.id" 
            class="list-item"
          >
            <ion-thumbnail slot="start" class="fish-thumbnail">
              <ion-img :src="getImagemFicha(ficha)" :alt="getNomeExibicao(ficha)" />
            </ion-thumbnail>
            <ion-label class="fish-name">{{ getNomeExibicao(ficha) }}</ion-label>
          </ion-item>
        </ion-list>

        <div v-else class="flex justify-center items-center py-8 px-4">
          <ion-text color="medium">
            <p class="text-center">Nenhuma ficha encontrada para esta categoria.</p>
          </ion-text>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-content {
  --background: linear-gradient(135deg, #ffffff 0%,  #b9cfda 100%);
}

.header-section {
  background: url('/background.png') no-repeat center center;
  background-size: cover;
}

.segment-container {
  padding: 0 20px 20px 20px;
}

.list-section {
  flex: 1;
  overflow-y: auto;
  padding-top: 8px;
}

/* Estilização do segment */
ion-segment {
  --background: rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 4px;
  backdrop-filter: blur(10px);
}

ion-segment-button {
  --color: rgba(255, 255, 255, 0.8);
  --color-checked: #ffffff;
  --indicator-color: transparent;
  border-radius: 20px;
  margin: 2px;
  min-height: 36px;
  font-weight: 600;
}

ion-segment-button.segment-button-checked {
  background: #1a4480;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* Estilização da lista */
.fish-list {
  background: transparent;
  padding: 0;
}

.list-item {
  --background: transparent;
  margin: 8px 0;
  border: none;
}

.fish-thumbnail {
  --size: 104px;
  width: 134px;
  --border-radius: 8px;
  margin-right: 16px;
}

.fish-thumbnail ion-img {
  border-radius: 8px;
  object-fit: cover;
}

.fish-name {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
}

ion-list {
  background: transparent;
  padding: 0;
}

ion-item {
  --inner-padding-end: 0;
  --inner-border-width: 0;
}
</style> 