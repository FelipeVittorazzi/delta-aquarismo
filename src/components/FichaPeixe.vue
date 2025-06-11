<template>
  <ion-card>
    <ion-img :src="imagem" :alt="nome" class="peixe-imagem" />
    
    <ion-card-header>
      <ion-card-title>{{ nome }}</ion-card-title>
      <ion-card-subtitle>{{ nomeCientifico }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <div class="parametro">
              <ion-label>pH</ion-label>
              <ion-text>{{ ph }}</ion-text>
            </div>
          </ion-col>
          <ion-col size="6">
            <div class="parametro">
              <ion-label>Temperatura</ion-label>
              <ion-text>{{ temperatura }}</ion-text>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6">
            <div class="parametro">
              <ion-label>Tamanho</ion-label>
              <ion-text>{{ tamanho }}</ion-text>
            </div>
          </ion-col>
          <ion-col size="6">
            <div class="parametro">
              <ion-label>GH</ion-label>
              <ion-text>{{ gh }}</ion-text>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <div class="compatibilidade">
        <ion-label>Compatibilidade</ion-label>
        <div class="peixes-icons">
          <ion-icon :icon="fish" v-for="n in nivelCompatibilidade" :key="n" />
        </div>
      </div>

      <div class="descricao">
        <ion-label>Descrição</ion-label>
        <ion-text>{{ descricao }}</ion-text>
      </div>

      <div class="comentarios">
        <ion-label>Comentários</ion-label>
        <ion-list>
          <ion-item v-for="comentario in comentarios" :key="comentario.id">
            <ion-avatar slot="start">
              <ion-text>{{ comentario.iniciais }}</ion-text>
            </ion-avatar>
            <ion-label>
              <h3>{{ comentario.autor }}</h3>
              <p>{{ comentario.texto }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-card-content>

    <ion-button fill="clear" class="favorite-button">
      <ion-icon :icon="heart" slot="icon-only" />
    </ion-button>
  </ion-card>
</template>

<script setup lang="ts">
import { heart, fish } from 'ionicons/icons';

interface Props {
  nome: string;
  nomeCientifico: string;
  imagem: string;
  ph: string;
  temperatura: string;
  tamanho: string;
  gh: string;
  nivelCompatibilidade: number;
  descricao: string;
  comentarios: Array<{
    id: number;
    autor: string;
    iniciais: string;
    texto: string;
  }>;
}

defineProps<Props>();
</script>

<style scoped>
.peixe-imagem {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.parametro {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
}

.compatibilidade {
  margin: 20px 0;
}

.peixes-icons {
  display: flex;
  gap: 5px;
  margin-top: 5px;
}

.descricao {
  margin: 20px 0;
}

.comentarios {
  margin-top: 20px;
}

ion-avatar {
  background: var(--ion-color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorite-button {
  position: absolute;
  top: 10px;
  right: 10px;
  --background: rgba(255, 255, 255, 0.8);
  --border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 0;
}
</style> 