<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/conta" />
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <template v-if="type === 'cashback'">
          <ion-item v-for="item in cashbackHistory" :key="item.id">
            <ion-label>
              <h2>{{ item.description }}</h2>
              <p>{{ item.date }}</p>
            </ion-label>
            <ion-note slot="end" :color="item.value > 0 ? 'success' : 'medium'">
              {{ item.value > 0 ? '+' : '' }}R$ {{ item.value.toFixed(2) }}
            </ion-note>
          </ion-item>
        </template>

        <template v-else>
          <ion-item v-for="item in purchaseHistory" :key="item.id">
            <ion-thumbnail slot="start">
              <ion-img :src="item.image" :alt="item.product" />
            </ion-thumbnail>
            <ion-label>
              <h2>{{ item.product }}</h2>
              <p>{{ item.date }}</p>
            </ion-label>
            <ion-note slot="end" color="medium">
              R$ {{ item.value.toFixed(2) }}
            </ion-note>
          </ion-item>
        </template>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
         IonButtons, IonBackButton, IonList, IonItem, IonLabel,
         IonNote, IonThumbnail, IonImg } from '@ionic/vue';

const route = useRoute();
const type = computed(() => route.params.type as string);

const pageTitle = computed(() => {
  return type.value === 'cashback' ? 'Histórico de Cashback' : 'Histórico de Compras';
});

const cashbackHistory = ref([
  {
    id: 1,
    description: 'Cashback da compra de Ração Premium',
    date: '10/03/2024',
    value: 12.50
  },
  {
    id: 2,
    description: 'Resgate de cashback',
    date: '05/03/2024',
    value: -50.00
  }
]);

const purchaseHistory = ref([
  {
    id: 1,
    product: 'Ração Premium Betta',
    date: '10/03/2024',
    value: 125.00,
    image: '/assets/racao-betta.png'
  },
  {
    id: 2,
    product: 'Planta Aquática Anubia',
    date: '01/03/2024',
    value: 45.00,
    image: '/assets/anubia.png'
  }
]);
</script>

<style scoped>
ion-thumbnail {
  --size: 60px;
  margin-right: 16px;
}

h2 {
  font-weight: 500;
  margin-bottom: 4px;
}

ion-note {
  font-size: 1.1em;
  font-weight: 500;
}
</style> 