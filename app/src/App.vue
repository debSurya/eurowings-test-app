<script setup lang="ts">
import { computed, onMounted, provide, ref } from "vue";
import { useFetchAirports } from "./services";

const airportData = ref<any>(null);

onMounted(() => {
  airportData.value = useFetchAirports().data;
});

provide(
  "airports",
  computed(() => airportData.value),
);
</script>

<template>
  <v-layout class="rounded rounded-md">
    <router-view />
  </v-layout>
</template>

<style scoped></style>
