<script setup lang="ts">
import { IonPage, IonContent,
         IonCard, IonCardContent, IonList, IonItem, IonIcon,
         IonLabel, IonText, IonImg } from '@ionic/vue';
import { wallet, cart, star, chatbubble, person, logOut } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { useCashback } from '@/composables';
import HeaderPadrao from '@/components/HeaderPadrao.vue';

const router = useRouter();

const userName = ref('João da Silva');
const { currentUserCashback } = useCashback();

const userInitials = computed(() => {
  return userName.value
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
});

const goToHistory = (type: 'cashback' | 'purchases') => {
  router.push(`/historico/${type}`);
};

const goToFavorites = () => {
  router.push('/favoritos');
};

const goToComments = () => {
  router.push('/comentarios');
};

const editProfile = () => {
  router.push('/editar-perfil');
};

const logout = () => {
  // Implementar lógica de logout
  router.push('/login');
};
</script>

<template>
  <ion-page>
    <HeaderPadrao title="CONTA" />

    <ion-content>
      <div class="profile-header">
        <div class="avatar">
          <ion-text>{{ userInitials }}</ion-text>
        </div>
        <h2>{{ userName }}</h2>
      </div>

      <ion-card class="cashback-card">
        <ion-card-content>
          <h3>Seu cashback atual</h3>
          <div class="cashback-value">R$ {{ Number(currentUserCashback).toFixed(2) }}</div>
        </ion-card-content>
      </ion-card>

      <ion-list>
        <ion-item button detail @click="goToHistory('cashback')">
          <ion-icon :icon="wallet" slot="start" />
          <ion-label>Histórico de cashback</ion-label>
        </ion-item>

        <ion-item button detail @click="goToHistory('purchases')">
          <ion-icon :icon="cart" slot="start" />
          <ion-label>Histórico de compras</ion-label>
        </ion-item>

        <ion-item button detail @click="goToFavorites">
          <ion-icon :icon="star" slot="start" />
          <ion-label>Fichas favoritadas</ion-label>
        </ion-item>

        <ion-item button detail @click="goToComments">
          <ion-icon :icon="chatbubble" slot="start" />
          <ion-label>Comentários feitos</ion-label>
        </ion-item>
      </ion-list>

      <ion-list class="account-actions">
        <ion-item button detail @click="editProfile">
          <ion-icon :icon="person" slot="start" />
          <ion-label>Editar perfil</ion-label>
        </ion-item>

        <ion-item button class="logout-button" @click="logout">
          <ion-icon :icon="logOut" slot="start" color="danger" />
          <ion-label color="danger">Sair</ion-label>
        </ion-item>
      </ion-list>

      <div class="logo-footer">
        <ion-img src="/logo.png" alt="Delta Aquarismo" />
      </div>
    </ion-content>
  </ion-page>
</template>


<style scoped>
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px;
  background: var(--ion-color-primary);
  color: white;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--ion-color-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.avatar ion-text {
  font-size: 2em;
  font-weight: bold;
  color: var(--ion-color-primary);
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

.account-actions {
  margin-top: 32px;
}

.logout-button {
  margin-top: 16px;
}

.logo-footer {
  display: flex;
  justify-content: center;
  padding: 32px;
  opacity: 0.5;
}

.logo-footer ion-img {
  width: 120px;
}
</style> 