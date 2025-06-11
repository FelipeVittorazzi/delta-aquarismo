<template>
  <ion-item>
    <ion-thumbnail slot="start">
      <ion-img :src="imagem" :alt="nome" />
    </ion-thumbnail>
    <ion-label>
      <h2>{{ nome }}</h2>
      <div class="cashback-badge">
        {{ cashback }}% de cashback
      </div>
    </ion-label>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonThumbnail, IonImg, IonLabel } from '@ionic/vue';

interface Props {
  nome: string;
  imagem: string;
  cashback: number;
}

defineProps<Props>();
</script>

<style scoped>
ion-thumbnail {
  --size: 80px;
  margin: 10px;
}

.cashback-badge {
  display: inline-block;
  background-color: var(--ion-color-success);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  margin-top: 5px;
}

h2 {
  font-size: 1.1em;
  font-weight: 500;
  margin-bottom: 8px;
}
</style> 