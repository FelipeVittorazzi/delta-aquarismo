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
      <ion-list v-if="type === 'cashback'">
        <ion-item v-for="item in cashbackHistory" :key="item.id">
          <ion-label>
            <h2>Venda #{{ item.sale_id }}</h2>
            <p>{{ new Date(item.created_at).toLocaleDateString('pt-BR') }}</p>
          </ion-label>
          <ion-note slot="end" :color="(item.status === 'approved' || item.status === 'paid') ? 'success' : 'medium'">
            R$ {{ Number(item.amount).toFixed(2) }}
          </ion-note>
        </ion-item>
      </ion-list>

      <ion-list v-else>
        <ion-item v-for="p in purchaseHistory" :key="p.id">
          <ion-label>
            <h2>Compra #{{ p.id }}</h2>
            <p>{{ new Date(p.created_at).toLocaleDateString('pt-BR') }} • {{ p.status }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
         IonButtons, IonBackButton, IonList, IonItem, IonLabel,
         IonNote, IonThumbnail, IonImg } from '@ionic/vue';
import { useMe } from '@/composables/useMe';

const route = useRoute();
const type = computed(() => route.params.type as string);

const pageTitle = computed(() => {
  return type.value === 'cashback' ? 'Histórico de Cashback' : 'Histórico de Compras';
});

const { cashbacks, purchases, loadCashbacks, loadPurchases } = useMe();
const cashbackHistory = cashbacks;
const purchaseHistory = purchases;

onMounted(async () => {
  if (type.value === 'cashback') {
    await loadCashbacks();
  } else {
    await loadPurchases();
  }
});
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