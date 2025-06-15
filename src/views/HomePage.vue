<script setup lang="ts">
import { ref } from 'vue'
import TitleDelta from '@/components/TitleDelta.vue'
import PostCard from '@/components/PostCard.vue'

const cashbackValue = ref('25,60')
const posts = ref([
  {
    id: 1,
    titulo: 'Novo aquário em exposição na loja!',
    descricao: 'Venha fazer uma visita e conferir de perto 😊',
    imagem: 'https://placehold.co/600x400',
    autor: 'Delta Aquarismo',
    data: 'Ontem'
  },
  // …
])
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">
      <TitleDelta />

      <!-- cartão de cashback -->
      <ion-card class="mb-6">
        <ion-card-content class="text-start p-7">
          <h2 class="!font-semibold text-primary !text-2xl">Seu Cashback atual:</h2>
          <div class="text-5xl font-bold text-primary mt-2">R$ {{ cashbackValue }}</div>
        </ion-card-content>
      </ion-card>

      <!-- feed de posts -->
      <div class="space-y-4">
        <PostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.text-gray {
  color: var(--ion-color-medium);
}
.text-gray-700 {
  color: #4a4a4a;
}
</style>
