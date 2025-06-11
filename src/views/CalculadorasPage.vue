<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Calculadoras</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-segment v-model="selectedCalculator">
        <ion-segment-button value="litragem">
          <ion-label>Litragem</ion-label>
        </ion-segment-button>
        <ion-segment-button value="substrato">
          <ion-label>Substrato</ion-label>
        </ion-segment-button>
      </ion-segment>

      <calculadora-litragem v-if="selectedCalculator === 'litragem'" />

      <ion-card v-else>
        <ion-card-header>
          <ion-card-title>Cálculo de Substrato</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <!-- Implementar calculadora de substrato aqui -->
          <p>Em breve!</p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
         IonSegment, IonSegmentButton, IonLabel, IonCard,
         IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import CalculadoraLitragem from '@/components/CalculadoraLitragem.vue';

const selectedCalculator = ref('litragem');
</script>

<style scoped>
ion-segment {
  padding: 16px;
}

ion-card {
  margin: 16px;
}
</style> 