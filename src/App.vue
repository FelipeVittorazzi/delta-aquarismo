<template>
  <ion-app>
    <router-view />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp } from '@ionic/vue';
import { onMounted } from 'vue';

onMounted(() => {
  // Configurar tema do aplicativo
  document.body.classList.toggle('dark', false);
});
</script>

<style>
:root {
  --ion-color-primary: #006d77;
  --ion-color-primary-rgb: 0, 109, 119;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade: #006069;
  --ion-color-primary-tint: #1a7c85;

  --ion-color-secondary: #83c5be;
  --ion-color-secondary-rgb: 131, 197, 190;
  --ion-color-secondary-contrast: #000000;
  --ion-color-secondary-contrast-rgb: 0, 0, 0;
  --ion-color-secondary-shade: #73ada7;
  --ion-color-secondary-tint: #8fcbc5;

  --ion-color-success: #2dd36f;
  --ion-color-success-rgb: 45, 211, 111;
  --ion-color-success-contrast: #000000;
  --ion-color-success-contrast-rgb: 0, 0, 0;
  --ion-color-success-shade: #28ba62;
  --ion-color-success-tint: #42d77d;

  --ion-color-warning: #ffd93d;
  --ion-color-warning-rgb: 255, 217, 61;
  --ion-color-warning-contrast: #000000;
  --ion-color-warning-contrast-rgb: 0, 0, 0;
  --ion-color-warning-shade: #e0bf36;
  --ion-color-warning-tint: #ffdd50;

  --ion-color-danger: #eb445a;
  --ion-color-danger-rgb: 235, 68, 90;
  --ion-color-danger-contrast: #ffffff;
  --ion-color-danger-contrast-rgb: 255, 255, 255;
  --ion-color-danger-shade: #cf3c4f;
  --ion-color-danger-tint: #ed576b;

  --ion-color-medium: #92949c;
  --ion-color-medium-rgb: 146, 148, 156;
  --ion-color-medium-contrast: #000000;
  --ion-color-medium-contrast-rgb: 0, 0, 0;
  --ion-color-medium-shade: #808289;
  --ion-color-medium-tint: #9d9fa6;

  --ion-color-light: #f4f5f8;
  --ion-color-light-rgb: 244, 245, 248;
  --ion-color-light-contrast: #000000;
  --ion-color-light-contrast-rgb: 0, 0, 0;
  --ion-color-light-shade: #d7d8da;
  --ion-color-light-tint: #f5f6f9;

  --ion-background-color: #ffffff;
  --ion-background-color-rgb: 255, 255, 255;
  --ion-text-color: #000000;
  --ion-text-color-rgb: 0, 0, 0;
  --ion-border-color: #d7d8da;
}

ion-content {
  --background: #f4f5f8;
}

ion-toolbar {
  --background: var(--ion-color-primary);
  --color: var(--ion-color-primary-contrast);
}

ion-tab-bar {
  --background: var(--ion-background-color);
  --border: 1px solid var(--ion-border-color);
}

ion-card {
  border-radius: 16px;
  margin: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

ion-button {
  --border-radius: 8px;
  font-weight: 600;
}

ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 56px;
}

ion-label {
  font-weight: 500;
}

.header-logo {
  height: 32px;
  width: auto;
}
</style>
