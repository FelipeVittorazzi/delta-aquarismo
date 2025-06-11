<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <ion-img src="/logo.png" alt="Delta Aquarismo" class="header-logo" />
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card class="cashback-card">
        <ion-card-content>
          <h2>Seu Cashback atual:</h2>
          <div class="cashback-value">R$ {{ cashbackValue }}</div>
        </ion-card-content>
      </ion-card>

      <ion-list>
        <ion-item-group>
          <ion-item-divider>
            <ion-label>Novidades</ion-label>
          </ion-item-divider>
          
          <ion-item v-for="post in posts" :key="post.id" lines="full">
            <ion-thumbnail slot="start">
              <ion-img :src="post.imagem" :alt="post.titulo" />
            </ion-thumbnail>
            <ion-label>
              <h3>{{ post.titulo }}</h3>
              <p>{{ post.descricao }}</p>
              <div class="post-actions">
                <ion-button fill="clear" size="small">
                  <ion-icon :icon="heart" slot="start" />
                  Curtir
                </ion-button>
                <ion-button fill="clear" size="small">
                  <ion-icon :icon="chatbubble" slot="start" />
                  Comentar
                </ion-button>
              </div>
            </ion-label>
          </ion-item>
        </ion-item-group>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
         IonCard, IonCardContent, IonList, IonItem, IonItemDivider,
         IonItemGroup, IonLabel, IonThumbnail, IonImg, IonButton,
         IonIcon } from '@ionic/vue';
import { heart, chatbubble } from 'ionicons/icons';

const cashbackValue = ref('25,60');

const posts = ref([
  {
    id: 1,
    titulo: 'Novo aquário em exposição na loja!',
    descricao: 'Venha fazer uma visita e conferir de perto 😊',
    imagem: '/assets/nemo.jpg',
  },
  // Adicione mais posts conforme necessário
]);
</script>

<style scoped>
.header-logo {
  height: 40px;
  width: auto;
}

.cashback-card {
  margin: 16px;
  text-align: center;
}

.cashback-value {
  font-size: 2em;
  font-weight: bold;
  color: var(--ion-color-primary);
  margin-top: 8px;
}

.post-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

ion-thumbnail {
  --size: 80px;
  margin-right: 16px;
}

h3 {
  font-weight: 600;
  margin-bottom: 4px;
}
</style> 