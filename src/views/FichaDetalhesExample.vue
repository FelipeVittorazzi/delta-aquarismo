<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { 
  IonPage, 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButton, 
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonTextarea,
  IonSpinner,
  IonText,
  IonFab,
  IonFabButton
} from '@ionic/vue';
import { heart, heartOutline, chatbubble, camera } from 'ionicons/icons';
import { useFicha } from '@/composables/useFicha';
import { useFichaApi } from '@/composables/useFichaApi';

const route = useRoute();
const fichaId = Number(route.params.id);

// Composable original (mantém estrutura existente)
const { 
  buscarFicha, 
  getImagemFicha, 
  getNomeExibicao,
  loading: fichaLoading,
  error: fichaError
} = useFicha();

// Novo composable para funcionalidades da API
const {
  comments,
  loading: apiLoading,
  error: apiError,
  carregarComentarios,
  criarComentario,
  curtirFicha,
  descurtirFicha,
  uploadFotosComentario
} = useFichaApi();

const ficha = ref<any>(null);
const novoComentario = ref('');
const isLiked = ref(false);
const likesCount = ref(0);
const selectedFiles = ref<File[]>([]);

onMounted(async () => {
  // Carrega a ficha usando o composable original
  ficha.value = await buscarFicha(fichaId);
  
  // Carrega os comentários usando o novo composable
  await carregarComentarios(fichaId);
});

async function handleLike() {
  if (isLiked.value) {
    const result = await descurtirFicha(fichaId);
    if (result) {
      isLiked.value = false;
      likesCount.value = Math.max(0, likesCount.value - 1);
    }
  } else {
    const result = await curtirFicha(fichaId);
    if (result) {
      isLiked.value = true;
      likesCount.value++;
    }
  }
}

async function handleCreateComment() {
  if (novoComentario.value.trim()) {
    const result = await criarComentario(fichaId, novoComentario.value.trim());
    if (result) {
      novoComentario.value = '';
      
      // Se há arquivos selecionados, faz upload
      if (selectedFiles.value.length > 0) {
        await uploadFotosComentario(result.id, selectedFiles.value);
        selectedFiles.value = [];
      }
    }
  }
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    selectedFiles.value = Array.from(target.files);
  }
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title v-if="ficha">{{ getNomeExibicao(ficha) }}</ion-title>
        <ion-title v-else>Carregando...</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <!-- Loading da ficha -->
      <div v-if="fichaLoading" class="flex justify-center py-8">
        <ion-spinner name="crescent"></ion-spinner>
      </div>

      <!-- Erro ao carregar ficha -->
      <div v-else-if="fichaError" class="p-4">
        <ion-text color="danger">
          <p>{{ fichaError }}</p>
        </ion-text>
      </div>

      <!-- Detalhes da ficha -->
      <div v-else-if="ficha" class="p-4">
        <!-- Imagem da ficha -->
        <div class="mb-4">
          <img 
            :src="getImagemFicha(ficha)" 
            :alt="getNomeExibicao(ficha)"
            class="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <!-- Informações da ficha -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold mb-2">{{ getNomeExibicao(ficha) }}</h1>
          <p v-if="ficha.descricao" class="text-gray-600 mb-4">{{ ficha.descricao }}</p>
          
          <!-- Botão de curtir -->
          <ion-button 
            @click="handleLike" 
            :disabled="apiLoading"
            fill="clear"
            class="mb-4"
          >
            <ion-icon 
              :icon="isLiked ? heart : heartOutline" 
              :color="isLiked ? 'danger' : 'medium'"
              slot="start"
            ></ion-icon>
            {{ likesCount }} curtidas
          </ion-button>
        </div>

        <!-- Seção de comentários -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-4 flex items-center">
            <ion-icon :icon="chatbubble" class="mr-2"></ion-icon>
            Comentários ({{ comments.length }})
          </h2>

          <!-- Formulário para novo comentário -->
          <div class="mb-4">
            <ion-textarea
              v-model="novoComentario"
              placeholder="Escreva um comentário..."
              :rows="3"
              class="mb-2"
            ></ion-textarea>
            
            <!-- Upload de fotos -->
            <div class="mb-2">
              <input
                type="file"
                multiple
                accept="image/*"
                @change="handleFileSelect"
                class="mb-2"
              />
              <div v-if="selectedFiles.length > 0" class="text-sm text-gray-600">
                {{ selectedFiles.length }} arquivo(s) selecionado(s)
              </div>
            </div>

            <ion-button 
              @click="handleCreateComment"
              :disabled="!novoComentario.trim() || apiLoading"
              expand="block"
            >
              <ion-spinner v-if="apiLoading" name="crescent" class="mr-2"></ion-spinner>
              Comentar
            </ion-button>
          </div>

          <!-- Lista de comentários -->
          <ion-list v-if="comments.length > 0">
            <ion-item v-for="comment in comments" :key="comment.id">
              <ion-label>
                <h3>{{ comment.user?.name || 'Usuário' }}</h3>
                <p>{{ comment.body || comment.comment }}</p>
                <p class="text-sm text-gray-500">
                  {{ new Date(comment.created_at).toLocaleDateString('pt-BR') }}
                </p>
              </ion-label>
            </ion-item>
          </ion-list>

          <!-- Mensagem quando não há comentários -->
          <div v-else class="text-center py-8">
            <ion-text color="medium">
              <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
            </ion-text>
          </div>

          <!-- Erro da API -->
          <div v-if="apiError" class="mt-4">
            <ion-text color="danger">
              <p>{{ apiError }}</p>
            </ion-text>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.p-4 {
  padding: 1rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.w-full {
  width: 100%;
}

.h-64 {
  height: 16rem;
}

.object-cover {
  object-fit: cover;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.text-xl {
  font-size: 1.25rem;
}

.text-sm {
  font-size: 0.875rem;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.text-gray-600 {
  color: #4b5563;
}

.text-gray-500 {
  color: #6b7280;
}

.text-center {
  text-align: center;
}
</style>
