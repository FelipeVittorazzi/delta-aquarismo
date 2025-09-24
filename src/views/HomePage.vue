<script setup lang="ts">
import { IonPage, IonContent, IonCard, IonCardContent, IonSpinner, IonText } from '@ionic/vue';
import TitleDelta from '@/components/TitleDelta.vue'
import PostCard from '@/components/PostCard.vue'
import { usePosts, useCashback } from '@/composables';

// Composables
const { posts, loading: postsLoading, carregarFeed } = usePosts();
const { currentUserCashback, formatarMoeda, atualizarCashbackUsuario } = useCashback();

// Simula carregamento do cashback do usuário (substituir pela lógica real)
atualizarCashbackUsuario(25.60);

onMounted(async () => {
  // Carrega o feed de posts
  await carregarFeed();
});

// Dados mock para compatibilidade com PostCard existente
const postsFormatted = computed(() => {
  return posts.value.map(post => ({
    id: post.id,
    titulo: (post.content || '').substring(0, 50) + '...', // Primeira linha como título
    descricao: post.content || '',
    imagem: post.media?.[0]?.url || 'https://placehold.co/600x400',
    autor: post.user?.name || 'Usuário',
    data: new Intl.DateTimeFormat('pt-BR', { 
      day: 'numeric',
      month: 'short'
    }).format(new Date(post.created_at || Date.now()))
  }));
});
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">
      <TitleDelta />

      <ion-card class="mb-6 rounded-3xl">
        <ion-card-content class="text-start p-7">
          <h2 class="!font-semibold text-primary !text-2xl">Seu Cashback atual:</h2>
          <div class="text-5xl font-bold text-primary mt-2">{{ formatarMoeda(currentUserCashback) }}</div>
        </ion-card-content>
      </ion-card>

      <!-- Loading para posts -->
      <div v-if="postsLoading" class="flex justify-center py-8">
        <ion-spinner name="crescent"></ion-spinner>
      </div>

      <div v-else class="space-y-4">
        <PostCard
          v-for="post in postsFormatted"
          :key="post.id"
          :post="post"
        />
        
        <!-- Mensagem quando não há posts -->
        <div v-if="postsFormatted.length === 0" class="text-center py-8">
          <ion-text color="medium">
            <p>Nenhum post encontrado no momento.</p>
          </ion-text>
        </div>
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
