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
    <ion-content>
      <div class="flex flex-col gap-3 items-center justify-center text-white pt-20 pb-10">
        <h1 class="text-3xl font-bold">FICHAS</h1>
      </div>
      <ion-segment v-model="selectedCategory">
        <ion-segment-button value="peixes">
          <ion-label class="text-base font-semibold">Peixes</ion-label>
        </ion-segment-button>
        <ion-segment-button value="plantas">
          <ion-label class="text-base font-semibold">Plantas</ion-label>
        </ion-segment-button>
        <ion-segment-button value="invertebrados">
          <ion-label class="text-base font-semibold">Invertebrados</ion-label>
        </ion-segment-button>
      </ion-segment>

      <ion-list v-if="selectedCategory === 'peixes'">
        <ion-item v-for="peixe in peixes" :key="peixe.id" :router-link="'/ficha/' + peixe.id">
          <ion-thumbnail slot="start">
            <ion-img :src="peixe.imagem" :alt="peixe.nome" />
          </ion-thumbnail>
          <ion-label>{{ peixe.nome }}</ion-label>
        </ion-item>
      </ion-list>

      <ion-list v-else-if="selectedCategory === 'plantas'">
        <!-- Lista de plantas aqui -->
      </ion-list>

      <ion-list v-else>
        <!-- Lista de invertebrados aqui -->
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-segment {
  --background: #E9F4F8;
}

ion-segment-button {
  text-transform: capitalize;
}

ion-thumbnail {
  --size: 60px;
  margin-right: 16px;
}

ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
}
</style> 