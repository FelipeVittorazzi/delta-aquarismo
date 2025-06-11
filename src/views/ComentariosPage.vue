<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/conta" />
        </ion-buttons>
        <ion-title>Comentários Feitos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item v-for="comentario in comentarios" :key="comentario.id">
          <ion-thumbnail slot="start">
            <ion-img :src="comentario.fichaImagem" :alt="comentario.fichaNome" />
          </ion-thumbnail>
          <ion-label>
            <h2>{{ comentario.fichaNome }}</h2>
            <p>{{ comentario.texto }}</p>
            <p class="date">{{ comentario.data }}</p>
          </ion-label>
          <ion-button fill="clear" slot="end" @click="removerComentario(comentario.id)">
            <ion-icon :icon="trash" color="danger" />
          </ion-button>
        </ion-item>
      </ion-list>

      <div v-if="comentarios.length === 0" class="empty-state">
        <ion-icon :icon="chatbubble" size="large" color="medium" />
        <p>Você ainda não fez nenhum comentário</p>
        <ion-button fill="clear" router-link="/fichas">
          Explorar Fichas
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
         IonButtons, IonBackButton, IonList, IonItem, IonLabel,
         IonThumbnail, IonImg, IonButton, IonIcon } from '@ionic/vue';
import { trash, chatbubble } from 'ionicons/icons';

const comentarios = ref([
  {
    id: 1,
    fichaNome: 'Betta',
    fichaImagem: '/assets/betta.jpg',
    texto: 'Ótimas! Lindo peixe, e bem fácil de manter.',
    data: '10/03/2024'
  }
]);

const removerComentario = (id: number) => {
  comentarios.value = comentarios.value.filter(comentario => comentario.id !== id);
};
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

.date {
  font-size: 0.8em;
  color: var(--ion-color-medium);
  margin-top: 4px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 32px;
  text-align: center;
  color: var(--ion-color-medium);
}

.empty-state ion-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-state p {
  margin-bottom: 16px;
}
</style> 