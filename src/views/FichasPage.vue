<script setup lang="ts">
import { IonPage, IonContent,
         IonSegment, IonSegmentButton, IonLabel, IonList, IonItem,
         IonThumbnail, IonImg } from '@ionic/vue';

const selectedCategory = ref('peixes');

const peixes = ref([
  {
    id: 'betta',
    nome: 'Betta Splendens',
    imagem: 'https://placehold.co/600x400'
  },
  {
    id: 'neon',
    nome: 'Neon Tetra',
    imagem: 'https://placehold.co/600x400'
  },
  {
    id: 'barb',
    nome: 'Green Tiger Barb',
    imagem: 'https://placehold.co/600x400'
  },
  {
    id: 'shrimp',
    nome: 'Red Cherry Shrimp',
    imagem: 'https://placehold.co/600x400'
  }
]);
</script>

<template>
  <ion-page>
    <ion-content :scroll-y="false">
      <!-- Cabeçalho com gradiente -->
      <div class="header-section">
        <div class="flex flex-col gap-3 items-center justify-center text-white pt-20 pb-10">
        <h1 class="text-3xl font-bold">FICHAS</h1>
      </div>
        
        <!-- Segment dentro do cabeçalho -->
        <div class="segment-container">
          <ion-segment v-model="selectedCategory">
            <ion-segment-button value="peixes">
              <ion-label class="text-sm font-semibold">Peixes</ion-label>
            </ion-segment-button>
            <ion-segment-button value="plantas">
              <ion-label class="text-sm font-semibold">Plantas</ion-label>
            </ion-segment-button>
            <ion-segment-button value="invertebrados">
              <ion-label class="text-sm font-semibold">Invertebrados</ion-label>
            </ion-segment-button>
          </ion-segment>
        </div>
      </div>

      <!-- Área da lista com scroll -->
      <div class="list-section">
        <ion-list v-if="selectedCategory === 'peixes'" class="fish-list">
          <ion-item v-for="peixe in peixes" :key="peixe.id" :router-link="'/ficha/' + peixe.id" class="list-item">
            <ion-thumbnail slot="start" class="fish-thumbnail">
              <ion-img :src="peixe.imagem" :alt="peixe.nome" />
            </ion-thumbnail>
            <ion-label class="fish-name">{{ peixe.nome }}</ion-label>
          </ion-item>
        </ion-list>

        <ion-list v-else-if="selectedCategory === 'plantas'" class="fish-list">
          <!-- Lista de plantas aqui -->
        </ion-list>

        <ion-list v-else class="fish-list">
          <!-- Lista de invertebrados aqui -->
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
/* Layout principal */
ion-content {
  --background: #f8f9fa;
}

.header-section {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 50%, #2c5aa0 100%);
  position: relative;
}

.segment-container {
  padding: 0 20px 20px 20px;
}

.list-section {
  background: #f8f9fa;
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
  --background: #ffffff;
  --border-radius: 12px;
  --padding-start: 16px;
  --padding-end: 16px;
  margin: 8px 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  border: none;
}

.fish-thumbnail {
  --size: 64px;
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

/* Remover estilos padrão do Ionic */
ion-list {
  background: transparent;
  padding: 0;
}

ion-item {
  --inner-padding-end: 0;
  --inner-border-width: 0;
}
</style> 