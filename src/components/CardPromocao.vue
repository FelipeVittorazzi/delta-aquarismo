<template>
  <ion-item >
    <ion-thumbnail slot="start">
      <ion-img :src="imagem" :alt="nome" />
    </ion-thumbnail>
    <ion-label>
      <h2 class="text-lg font-semibold text-white">{{ nome }}</h2>
      <div class="bg-[#009388] text-white text-lg font-semibold rounded text-center inline-block px-2 py-1">
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
  --size: 100px;
  margin: 10px;
  --border-radius: 10px;
}

ion-item {
  --background: transparent;
  --border-width: 0;
  --border-color: transparent;
}
</style> 