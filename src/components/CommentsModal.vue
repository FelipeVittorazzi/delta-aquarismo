<script setup lang="ts">
import { IonModal, IonContent, IonButton, IonIcon, IonTextarea, IonSpinner, IonAvatar, IonItem, IonLabel, IonList } from '@ionic/vue';
import { close, send } from 'ionicons/icons';
import { ref, computed, watch } from 'vue';

interface PostCard {
  id: number
  titulo: string
  descricao: string
  imagem: string
  autor: string
  data: string
}

interface Comentario {
  id: number
  user: {
    name: string
    avatar?: string
  }
  comment: string
  created_at: string
}

const props = defineProps<{
  isOpen: boolean
  post: PostCard | null
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

// Dados mocados para comentários
const comentariosMockados = ref<Comentario[]>([
  {
    id: 1,
    user: {
      name: "Maria Silva",
      avatar: "https://i.pravatar.cc/150?u=maria"
    },
    comment: "Que peixe lindo! Qual espécie é essa?",
    created_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    user: {
      name: "João Santos",
      avatar: "https://i.pravatar.cc/150?u=joao"
    },
    comment: "Adorei o aquário! Quantos litros tem?",
    created_at: "2024-01-15T11:45:00Z"
  },
  {
    id: 3,
    user: {
      name: "Ana Costa",
      avatar: "https://i.pravatar.cc/150?u=ana"
    },
    comment: "Parabéns pelo setup! Muito bem montado 👏",
    created_at: "2024-01-15T14:20:00Z"
  },
  {
    id: 4,
    user: {
      name: "Pedro Oliveira",
      avatar: "https://i.pravatar.cc/150?u=pedro"
    },
    comment: "Qual filtro você está usando? Estou montando um similar.",
    created_at: "2024-01-15T16:10:00Z"
  },
  {
    id: 4,
    user: {
      name: "Pedro Oliveira",
      avatar: "https://i.pravatar.cc/150?u=pedro"
    },
    comment: "Qual filtro você está usando? Estou montando um similar.",
    created_at: "2024-01-15T16:10:00Z"
  },
  {
    id: 4,
    user: {
      name: "Pedro Oliveira",
      avatar: "https://i.pravatar.cc/150?u=pedro"
    },
    comment: "Qual filtro você está usando? Estou montando um similar.",
    created_at: "2024-01-15T16:10:00Z"
  },
  {
    id: 4,
    user: {
      name: "Pedro Oliveira",
      avatar: "https://i.pravatar.cc/150?u=pedro"
    },
    comment: "Qual filtro você está usando? Estou montando um similar.",
    created_at: "2024-01-15T16:10:00Z"
  },
  {
    id: 4,
    user: {
      name: "Pedro Oliveira",
      avatar: "https://i.pravatar.cc/150?u=pedro"
    },
    comment: "Qual filtro você está usando? Estou montando um similar.",
    created_at: "2024-01-15T16:10:00Z"
  },
  {
    id: 4,
    user: {
      name: "Pedro Oliveira",
      avatar: "https://i.pravatar.cc/150?u=pedro"
    },
    comment: "Qual filtro você está usando? Estou montando um similar.",
    created_at: "2024-01-15T16:10:00Z"
  },
  {
    id: 4,
    user: {
      name: "Pedro Oliveira",
      avatar: "https://i.pravatar.cc/150?u=pedro"
    },
    comment: "Qual filtro você está usando? Estou montando um similar.",
    created_at: "2024-01-15T16:10:00Z"
  },
  {
    id: 4,
    user: {
      name: "Pedro Oliveira",
      avatar: "https://i.pravatar.cc/150?u=pedro"
    },
    comment: "Qual filtro você está usando? Estou montando um similar.",
    created_at: "2024-01-15T16:10:00Z"
  },
  {
    id: 4,
    user: {
      name: "Pedro Oliveira",
      avatar: "https://i.pravatar.cc/150?u=pedro"
    },
    comment: "Qual filtro você está usando? Estou montando um similar.",
    created_at: "2024-01-15T16:10:00Z"
  }
])

const postComments = ref<Comentario[]>([])
const loading = ref(false)
const novoComentario = ref('')
const enviandoComentario = ref(false)

const modalOpen = computed({
  get: () => props.isOpen,
  set: (value) => emit('update:isOpen', value)
});

// Simula carregamento de comentários
const carregarComentarios = async () => {
  loading.value = true
  
  // Simula delay da API
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Usa dados mocados
  postComments.value = [...comentariosMockados.value]
  loading.value = false
}

// Simula criação de comentário
const criarComentario = async (postId: number, comment: string) => {
  enviandoComentario.value = true
  
  // Simula delay da API
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const novoComentario: Comentario = {
    id: Date.now(), // ID único simples
    user: {
      name: "Você", // Usuário atual
      avatar: "https://i.pravatar.cc/150?u=usuario"
    },
    comment: comment,
    created_at: new Date().toISOString()
  }
  
  // Adiciona no início da lista
  postComments.value.unshift(novoComentario)
  enviandoComentario.value = false
}

// Carrega comentários quando o modal abre
watch(() => props.isOpen, async (isOpen) => {
  if (isOpen && props.post) {
    await carregarComentarios()
  }
})

// Carrega comentários quando o post muda
watch(() => props.post, async (newPost) => {
  if (newPost && props.isOpen) {
    await carregarComentarios()
  }
})

const formatarData = (data: string) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(data))
}

const enviarComentario = async () => {
  if (!novoComentario.value.trim() || !props.post || enviandoComentario.value) return
  
  try {
    await criarComentario(props.post.id, novoComentario.value.trim())
    novoComentario.value = ''
  } catch (error) {
    console.error('Erro ao enviar comentário:', error)
  }
}

const fecharModal = () => {
  modalOpen.value = false;
  novoComentario.value = '';
};
</script>

<template>
  <ion-modal 
    :is-open="modalOpen" 
    @did-dismiss="fecharModal"
    :initial-breakpoint="1"
    :breakpoints="[0,1]"
    animated
    :show-backdrop="false"
    class="rounded-t-3xl"
  >
    <ion-content class="ion-padding">
      <div class="flex items-center justify-center my-4">
        <h2 class="text-lg font-semibold text-primary text-center">Comentários</h2>
      </div>

      <div v-if="loading" class="text-center py-8">
        <ion-spinner></ion-spinner>
        <p class="mt-2 text-gray-600">Carregando comentários...</p>
      </div>

      <ion-list v-else-if="postComments.length > 0" class="mb-4">
        <ion-item v-for="comentario in postComments" :key="comentario.id" class="mb-3">
          <ion-avatar slot="start" class="w-8 h-8">
            <img :src="comentario.user.avatar || '/logo.png'" :alt="comentario.user.name" />
          </ion-avatar>
          <ion-label>
            <h3 class="text-sm font-semibold text-primary">{{ comentario.user.name }}</h3>
            <p class="text-sm text-gray-700">{{ comentario.comment }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ formatarData(comentario.created_at) }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <div v-else-if="!loading" class="text-center py-8 text-gray-500">
        <p class="text-sm">Nenhum comentário ainda.</p>
        <p class="text-xs">Seja o primeiro a comentar!</p>
      </div>
    </ion-content>

    <!-- Formulário fixo na parte inferior -->
    <div v-if="post" class="input-container">
      <div class="flex gap-2 p-4 bg-white border-t">
        <ion-textarea
          v-model="novoComentario"
          placeholder="Escreva seu comentário..."
          :rows="2"
          class="flex-1"
          :disabled="enviandoComentario"
        ></ion-textarea>
        <ion-button 
          @click="enviarComentario"
          :disabled="!novoComentario.trim() || enviandoComentario"
          class="self-end"
          size="small"
        >
          <ion-icon v-if="!enviandoComentario" :icon="send"></ion-icon>
          <ion-spinner v-else></ion-spinner>
        </ion-button>
      </div>
    </div>
  </ion-modal>
</template>

<style scoped>
.input-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 10;
}

ion-textarea {
  --background: transparent;
  --color: var(--ion-color-primary);
  --placeholder-color: var(--ion-color-medium);
}
ion-item {
  --background: transparent;
  --border-color: transparent;
  margin-bottom: 8px;
}

ion-avatar img {
  object-fit: cover;
}

ion-content {
  --padding-top: 0;
  --padding-bottom: 100px; /* Espaço para o input fixo */
  --background: #ffff;
  --border-radius: 26px;
  border-radius: 26px;
}
/* Borda superior do input */
.input-container .border-t {
  border-top: 1px solid var(--ion-color-light);
}
</style>
