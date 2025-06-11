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

declare global {
  const ref: typeof ref;
  const computed: typeof computed;
  const reactive: typeof reactive;
  const watch: typeof watch;
  const watchEffect: typeof watchEffect;
  const onMounted: typeof onMounted;
  const onUnmounted: typeof onUnmounted;
  const onBeforeMount: typeof onBeforeMount;
  const onBeforeUnmount: typeof onBeforeUnmount;
  const nextTick: typeof nextTick;
  const toRef: typeof toRef;
  const toRefs: typeof toRefs;
  const provide: typeof provide;
  const inject: typeof inject;
} 