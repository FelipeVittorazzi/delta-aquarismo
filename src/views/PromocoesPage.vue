<script setup lang="ts">
import { IonPage, IonContent, IonList } from '@ionic/vue';
import CardPromocao from '@/components/CardPromocao.vue';
import HeaderPadrao from '@/components/HeaderPadrao.vue';
import TitleDelta from '@/components/TitleDelta.vue';

const promocoes = ref([
  {
    id: 1,
    nome: 'Ração Premium Betta',
    imagem: 'https://placehold.co/600x400',
    cashback: 10
  },
  {
    id: 2,
    nome: 'Planta Aquática Anubia',
    imagem: 'https://placehold.co/600x400',
    cashback: 12
  },
  {
    id: 3,
    nome: 'Aquário Nano 15L',
    imagem: 'https://placehold.co/600x400',
    cashback: 5
  },
  {
    id: 4,
    nome: 'Filtro Externo Hang-On',
    imagem: 'https://placehold.co/600x400',
    cashback: 8
  },
]);
</script> 

<template>
  <ion-page>
    <HeaderPadrao title="PROMOÇÕES" />
    
    <ion-content>
      <TitleDelta containerClass="!mt-0 !pb-0" />
      <div class="">
        <ion-list class="!bg-transparent">
          <CardPromocao
            v-for="promocao in promocoes"
            :key="promocao.id"
            :nome="promocao.nome"
            :imagem="promocao.imagem"
            :cashback="promocao.cashback"
          />
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>
