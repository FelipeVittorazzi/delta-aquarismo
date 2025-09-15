
<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { eye, eyeOff } from 'ionicons/icons';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { login, isLoading, error } = useAuth();

const form = reactive({
  username: '',
  password: '',
});

const showPassword = ref(false);
function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}

const canSubmit = computed(() => {
  return form.username.trim().length > 3 && form.password.trim().length >= 3;
});

async function onSubmit() {
  if (!canSubmit.value) return;
  try {
    await login(form.username, form.password);
    const redirect = (router.currentRoute.value.query.redirect as string) || '/home';
    router.replace(redirect);
  } catch {
    return;
  }
}

</script>

<template>
  <ion-page>
    <ion-content fullscreen class="content-bg">
      <div class="flex flex-col h-full justify-center px-6 py-8">
       <div class="bg-white rounded-xl p-4">
        <div class="text-center mb-8">
          <img src="/logo.png" alt="Delta Aquarismo" class="mx-auto h-16 w-auto" />
          <h1 class="text-2xl mt-4 font-semibold text-primary">Bem-vindo</h1>
          <p class="text-sm text-gray-500 mt-1">Entre para acessar sua conta</p>
        </div>

        <ion-list class="rounded-xl shadow-sm bg-white/70">
          <ion-item>
            <ion-input
              v-model="form.username"
              type="email"
              label="E-mail"
              label-placement="floating"
              autocomplete="email"
              inputmode="email"
              required
              :disabled="isLoading"
            />
          </ion-item>
          <ion-item class="input-password">
            <ion-input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              label="Senha"
              label-placement="floating"
              autocomplete="current-password"
              required
              :disabled="isLoading"
            />
            <ion-button slot="end" fill="clear" size="small" @click="toggleShowPassword" :disabled="isLoading" aria-label="Alternar visibilidade da senha">
              <ion-icon :icon="showPassword ? eyeOff : eye" />
            </ion-button>
          </ion-item>
        </ion-list>

        <ion-button expand="block" class="mt-6" :disabled="!canSubmit || isLoading" @click="onSubmit">
          <template v-if="isLoading">Entrando...</template>
          <template v-else>Entrar</template>
        </ion-button>

        <ion-text v-if="error" color="danger" class="mt-3 text-center">
          <small>{{ error }}</small>
        </ion-text>
       </div>
      </div>
    </ion-content>
  </ion-page>
  
</template>


<style scoped>
.content-bg {
  --background:  linear-gradient(135deg, #4a90e2 0%, #357abd 50%, #2c5aa0 100%);
}
.text-primary {
  color: var(--ion-color-primary);
}
ion-item.input-password  {
  --inner-padding-end: 0;
}
</style>


