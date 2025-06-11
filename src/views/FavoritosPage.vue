<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/conta" />
        </ion-buttons>
        <ion-title>Fichas Favoritadas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item v-for="ficha in fichasFavoritas" :key="ficha.id" :router-link="'/ficha/' + ficha.id">
          <ion-thumbnail slot="start">
            <ion-img :src="ficha.imagem" :alt="ficha.nome" />
          </ion-thumbnail>
          <ion-label>
            <h2>{{ ficha.nome }}</h2>
            <p>{{ ficha.nomeCientifico }}</p>
          </ion-label>
          <ion-button fill="clear" slot="end" @click.prevent="removerFavorito(ficha.id)">
            <ion-icon :icon="heart" color="danger" />
          </ion-button>
        </ion-item>
      </ion-list>

      <div v-if="fichasFavoritas.length === 0" class="empty-state">
        <ion-icon :icon="heart" size="large" color="medium" />
        <p>Você ainda não tem fichas favoritadas</p>
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
import { heart } from 'ionicons/icons';

const fichasFavoritas = ref([
  {
    id: 'betta',
    nome: 'Betta',
    nomeCientifico: 'Betta splendens',
    imagem: '/assets/betta.jpg'
  },
  {
    id: 'neon',
    nome: 'Neon Tetra',
    nomeCientifico: 'Paracheirodon innesi',
    imagem: '/assets/neon.jpg'
  }
]);

const removerFavorito = (id: string) => {
  fichasFavoritas.value = fichasFavoritas.value.filter(ficha => ficha.id !== id);
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