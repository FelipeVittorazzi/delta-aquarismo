import { App } from 'vue';
import {
  ref,
  computed,
  reactive,
  watch,
  watchEffect,
  onMounted,
  onUnmounted,
  onBeforeMount,
  onBeforeUnmount,
  nextTick,
  toRef,
  toRefs,
  provide,
  inject,
} from 'vue';

// Objeto com todas as funções que queremos disponibilizar globalmente
const vueExports = {
  ref,
  computed,
  reactive,
  watch,
  watchEffect,
  onMounted,
  onUnmounted,
  onBeforeMount,
  onBeforeUnmount,
  nextTick,
  toRef,
  toRefs,
  provide,
  inject,
};

export const VueAutoImportsPlugin = {
  install(app: App) {
    // Adiciona cada função ao global properties do Vue
    Object.entries(vueExports).forEach(([name, func]) => {
      app.config.globalProperties[`$${name}`] = func;
    });

    // Também adiciona ao contexto global para TypeScript
    const globalTyped = globalThis as any;
    Object.entries(vueExports).forEach(([name, func]) => {
      globalTyped[name] = func;
    });
  }
}; 