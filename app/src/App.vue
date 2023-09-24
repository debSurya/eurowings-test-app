<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue';
import { useFetchAirports } from './services';
 
const  airportData = ref<any>({});

onMounted(() => {
  airportData.value = useFetchAirports();
});

provide("airports", computed(() => airportData.value.data));

</script>

<template>
  <main class="app-main">
    <router-view />
  </main>
</template>

<style scoped>
</style>
