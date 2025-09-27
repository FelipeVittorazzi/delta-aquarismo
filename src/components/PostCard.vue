<script setup lang="ts">
import { heart, chatbubble } from 'ionicons/icons'
import { ref } from 'vue'
import CommentsModal from './CommentsModal.vue'

interface Post {
  id: number
  titulo: string
  descricao: string
  imagem: string
  autor: string
  data: string
}

const props = defineProps<{
  post: Post
}>()

const isCommentsModalOpen = ref(false)

const abrirModalComentarios = () => {
  console.log('Abrindo modal de comentários para post:', props.post);
  isCommentsModalOpen.value = true
}
</script>

<template>
  <ion-card class="rounded-3xl overflow-hidden px-2">
    <ion-card-header class="px-4 pt-4">
     <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <ion-avatar class="w-10 h-10 bg-blue-900">
          <img src="/logo.png" alt="Logo Delta" class="brightness-[10.5]" />
        </ion-avatar>
        <ion-card-subtitle class="font-semibold normal-case text-lg text-primary">{{ post.autor }}</ion-card-subtitle>
      </div>
      <ion-card-subtitle class="text-sm text-gray normal-case font-[500]">{{ post.data }}</ion-card-subtitle>
     </div>
    </ion-card-header>

    <ion-card-content class="px-4 py-2">
      <h3 class="!text-lg text-primary !mb-0">{{ post.titulo }}</h3>
      <p class="!text-lg text-primary">{{ post.descricao }}</p>
    <img
      :src="post.imagem"
      :alt="post.titulo"
      class="w-full h-[13rem] object-cover rounded-xl"
    />
  </ion-card-content>

    <ion-card-footer class="flex gap-4 px-4 pb-4">
        <ion-icon :icon="heart" slot="start" class="text-primary"/>
        <ion-icon 
          :icon="chatbubble" 
          slot="start" 
          class="text-primary cursor-pointer"
          @click="abrirModalComentarios"
        />
    </ion-card-footer>
  </ion-card>

  <!-- Modal de comentários -->
  <CommentsModal 
    v-model:is-open="isCommentsModalOpen"
    :post="post"
  />
</template>

<style scoped>
ion-icon {
  font-size: 1.5rem;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
