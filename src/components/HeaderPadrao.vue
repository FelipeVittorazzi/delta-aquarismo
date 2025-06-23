<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle } from '@ionic/vue';

defineProps<{
  title: string;
}>();
</script>

<template>
  <ion-header class="ion-no-border">
    <ion-toolbar class="!bg-[#005085]">
      <div class="flex flex-col gap-3 items-center justify-center text-white pb-3 pt-10">
        <ion-title class="!text-white !font-semibold">{{ title }}</ion-title>
      </div>
    </ion-toolbar>
  </ion-header>
</template> 