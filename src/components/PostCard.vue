<script setup lang="ts">
import { heart, chatbubble } from 'ionicons/icons'

interface Post {
  id: number
  titulo: string
  descricao: string
  imagem: string
  autor: string
  data: string
}

defineProps<{
  post: Post
}>()
</script>

<template>
  <ion-card class="rounded-xl overflow-hidden">
    <!-- cabeçalho do card -->
    <ion-card-header class="px-4 pt-4">
     <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <ion-avatar class="w-10 h-10 bg-blue-900">
          <img src="/logo.png" alt="Logo Delta" class="brightness-[10.5]" />
        </ion-avatar>
        <ion-card-subtitle class="font-semibold normal-case text-lg text-primary">{{ post.autor }}</ion-card-subtitle>
      </div>
      <ion-card-subtitle class="text-sm text-gray normal-case">{{ post.data }}</ion-card-subtitle>
     </div>
    </ion-card-header>

    <!-- imagem -->
    <ion-img
      :src="post.imagem"
      :alt="post.titulo"
      class="w-full h-40 object-cover"
    />

    <!-- conteúdo -->
    <ion-card-content class="px-4 py-2">
      <h3 class="text-lg font-semibold mb-2">{{ post.titulo }}</h3>
      <p class="text-sm text-gray-700">{{ post.descricao }}</p>
    </ion-card-content>

    <!-- rodapé com ações -->
    <ion-card-footer class="flex gap-4 px-4 pb-4">
      <ion-button fill="clear" size="small">
        <ion-icon :icon="heart" slot="start" />
        Curtir
      </ion-button>
      <ion-button fill="clear" size="small">
        <ion-icon :icon="chatbubble" slot="start" />
        Comentar
      </ion-button>
    </ion-card-footer>
  </ion-card>
</template>

<style scoped>
.text-gray {
  color: var(--ion-color-medium);
}
.text-gray-700 {
  color: #4a4a4a;
}
</style> 