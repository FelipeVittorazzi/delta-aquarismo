<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Fichas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-segment v-model="selectedCategory">
        <ion-segment-button value="peixes">
          <ion-label>Peixes</ion-label>
        </ion-segment-button>
        <ion-segment-button value="plantas">
          <ion-label>Plantas</ion-label>
        </ion-segment-button>
        <ion-segment-button value="invertebrados">
          <ion-label>Invertebrados</ion-label>
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

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
         IonSegment, IonSegmentButton, IonLabel, IonList, IonItem,
         IonThumbnail, IonImg } from '@ionic/vue';

const selectedCategory = ref('peixes');

const peixes = ref([
  {
    id: 'betta',
    nome: 'Betta Splendens',
    imagem: '/assets/betta.jpg'
  },
  {
    id: 'neon',
    nome: 'Neon Tetra',
    imagem: '/assets/neon.jpg'
  },
  {
    id: 'barb',
    nome: 'Green Tiger Barb',
    imagem: '/assets/barb.jpg'
  },
  {
    id: 'shrimp',
    nome: 'Red Cherry Shrimp',
    imagem: '/assets/shrimp.jpg'
  }
]);
</script>

<style scoped>
ion-segment {
  padding: 16px;
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