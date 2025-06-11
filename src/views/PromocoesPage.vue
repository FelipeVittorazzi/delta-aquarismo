<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Promoções</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <card-promocao
          v-for="promocao in promocoes"
          :key="promocao.id"
          :nome="promocao.nome"
          :imagem="promocao.imagem"
          :cashback="promocao.cashback"
        />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList } from '@ionic/vue';
import CardPromocao from '@/components/CardPromocao.vue';

const promocoes = ref([
  {
    id: 1,
    nome: 'Ração Premium Betta',
    imagem: '/assets/racao-betta.png',
    cashback: 10
  },
  {
    id: 2,
    nome: 'Planta Aquática Anubia',
    imagem: '/assets/anubia.png',
    cashback: 12
  },
  {
    id: 3,
    nome: 'Aquário Nano 15L',
    imagem: '/assets/aquario-nano.png',
    cashback: 5
  },
  {
    id: 4,
    nome: 'Filtro Externo Hang-On',
    imagem: '/assets/filtro-externo.png',
    cashback: 8
  }
]);
</script> 