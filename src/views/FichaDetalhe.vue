<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/fichas" />
        </ion-buttons>
        <ion-title>{{ ficha.nome }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ficha-peixe
        :nome="ficha.nome"
        :nome-cientifico="ficha.nomeCientifico"
        :imagem="ficha.imagem"
        :ph="ficha.ph"
        :temperatura="ficha.temperatura"
        :tamanho="ficha.tamanho"
        :gh="ficha.gh"
        :nivel-compatibilidade="ficha.nivelCompatibilidade"
        :descricao="ficha.descricao"
        :comentarios="ficha.comentarios"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
         IonButtons, IonBackButton } from '@ionic/vue';
import FichaPeixe from '@/components/FichaPeixe.vue';

const route = useRoute();
const ficha = ref({
  nome: 'Betta',
  nomeCientifico: 'Betta splendens',
  imagem: '/assets/betta.jpg',
  ph: '6,0 - 7,5',
  temperatura: '24 - 30°C',
  tamanho: '7 cm',
  gh: '5 - 20',
  nivelCompatibilidade: 3,
  descricao: 'Os Betta são maquetes nas coubares vividos, elaborantes e são restindo ar aberentes outros máles, tentam que matar um dós neles no mesmo aquário.',
  comentarios: [
    {
      id: 1,
      autor: 'Gabriel S.',
      iniciais: 'GS',
      texto: 'Ótimas! Lindo peixe, e bem fácil de manter.'
    }
  ]
});

onMounted(async () => {
  // Aqui você pode carregar os dados da ficha baseado no ID da rota
  const id = route.params.id;
  // Implementar chamada à API para buscar dados da ficha
});
</script> 