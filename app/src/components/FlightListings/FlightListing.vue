<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { useFetchFlightListing } from '../../services';
import { IFlightListing } from './FlightListing.interface';

const flightListingsData = ref<IFlightListing| null>(null);
const airports = inject("airports");
    
onMounted(() => {
    const { data } = useFetchFlightListing();
    flightListingsData.value = data;
});

</script>

<template>
    <header>Flight Listing</header>
    <section>{{ flightListingsData }}</section>
</template>

<style></style>