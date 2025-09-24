<script setup lang="ts">
defineProps<{
    containerClass?: string
    small?: boolean
}>()
</script>

<template>
    <div class="flex items-center justify-center px-10 py-2 mt-10" :class="containerClass">
        <img src="/logo.png" alt="Delta Aquarismo" class="brightness-[10.5] w-[6rem]" :class="small ? 'w-[65px]' : 'w-[5.5rem]'">
        <div class="flex flex-col">
            <h1 class="text-white text-2xl font-bold" :class="small ? 'text-sm font-semibold' : 'text-2xl'">DELTA</h1>
            <h1 class="text-white text-2xl font-bold" :class="small ? 'text-sm font-semibold' : 'text-2xl'">AQUARISMO</h1>
        </div>
    </div>
</template>