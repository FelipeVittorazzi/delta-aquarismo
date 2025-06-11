<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Cálculo de litragem</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <ion-item>
        <ion-label position="stacked">Comprimento (cm)</ion-label>
        <ion-input
          v-model="comprimento"
          type="number"
          inputmode="decimal"
          :clear-input="true"
        />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Largura (cm)</ion-label>
        <ion-input
          v-model="largura"
          type="number"
          inputmode="decimal"
          :clear-input="true"
        />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Altura (cm)</ion-label>
        <ion-input
          v-model="altura"
          type="number"
          inputmode="decimal"
          :clear-input="true"
        />
      </ion-item>

      <div class="resultado">
        <ion-text color="primary">
          <h2>Resultado: {{ resultado }} L</h2>
        </ion-text>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent,
         IonItem, IonLabel, IonInput, IonText } from '@ionic/vue';

const comprimento = ref('');
const largura = ref('');
const altura = ref('');

const resultado = computed(() => {
  if (!comprimento.value || !largura.value || !altura.value) return 0;
  
  const volume = Number(comprimento.value) * Number(largura.value) * Number(altura.value);
  return Math.round(volume / 1000); // Convertendo cm³ para litros
});
</script>

<style scoped>
.resultado {
  margin-top: 20px;
  text-align: center;
}

.resultado h2 {
  font-size: 1.5em;
  font-weight: bold;
}

ion-item {
  --padding-start: 0;
  --padding-end: 0;
  margin-bottom: 10px;
}
</style> 