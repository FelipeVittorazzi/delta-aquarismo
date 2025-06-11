<template>
  <ion-tabs>
    <ion-router-outlet></ion-router-outlet>
    
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="home" href="/home">
        <ion-icon :icon="home" />
        <ion-label>Início</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="promocoes" href="/promocoes">
        <ion-icon :icon="pricetag" />
        <ion-label>Promoções</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="fichas" href="/fichas">
        <ion-icon :icon="document" />
        <ion-label>Fichas</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="calculadoras" href="/calculadoras">
        <ion-icon :icon="calculator" />
        <ion-label>Calculadoras</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="conta" href="/conta">
        <ion-icon :icon="person" />
        <ion-label>Conta</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script setup lang="ts">
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/vue';
import { home, pricetag, document, calculator, person } from 'ionicons/icons';
</script>

<style scoped>
ion-tab-bar {
  --background: var(--ion-color-light);
}

ion-tab-button {
  --color: var(--ion-color-medium);
  --color-selected: var(--ion-color-primary);
}
</style> 