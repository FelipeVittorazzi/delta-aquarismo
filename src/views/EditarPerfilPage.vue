<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/conta" />
        </ion-buttons>
        <ion-title>Editar Perfil</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="salvarPerfil">
            Salvar
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="avatar-container">
        <div class="avatar">
          <ion-text>{{ userInitials }}</ion-text>
        </div>
        <ion-button fill="clear" size="small">
          Alterar foto
        </ion-button>
      </div>

      <ion-list>
        <ion-item>
          <ion-label position="stacked">Nome</ion-label>
          <ion-input v-model="userData.nome" type="text" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">E-mail</ion-label>
          <ion-input v-model="userData.email" type="email" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Telefone</ion-label>
          <ion-input v-model="userData.telefone" type="tel" />
        </ion-item>
      </ion-list>

      <ion-list-header>
        <ion-label>Notificações</ion-label>
      </ion-list-header>

      <ion-list>
        <ion-item>
          <ion-label>Promoções</ion-label>
          <ion-toggle v-model="userData.notificacoes.promocoes" />
        </ion-item>

        <ion-item>
          <ion-label>Novos produtos</ion-label>
          <ion-toggle v-model="userData.notificacoes.novosProdutos" />
        </ion-item>

        <ion-item>
          <ion-label>Respostas aos comentários</ion-label>
          <ion-toggle v-model="userData.notificacoes.respostas" />
        </ion-item>
      </ion-list>

      <ion-button expand="block" color="danger" class="logout-button" @click="alterarSenha">
        Alterar Senha
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
         IonButtons, IonBackButton, IonButton, IonList, IonItem,
         IonLabel, IonInput, IonToggle, IonListHeader, IonText } from '@ionic/vue';

const router = useRouter();

const userData = ref({
  nome: 'João da Silva',
  email: 'joao.silva@email.com',
  telefone: '(11) 98765-4321',
  notificacoes: {
    promocoes: true,
    novosProdutos: true,
    respostas: true
  }
});

const userInitials = computed(() => {
  return userData.value.nome
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
});

const salvarPerfil = async () => {
  // Implementar lógica de salvamento
  router.back();
};

const alterarSenha = () => {
  // Implementar lógica de alteração de senha
};
</script>

<style scoped>
.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--ion-color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.avatar ion-text {
  font-size: 2.5em;
  font-weight: bold;
  color: white;
}

ion-list {
  margin-bottom: 32px;
}

.logout-button {
  margin: 32px 16px;
}
</style> 