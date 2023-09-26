<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useFetchAirports } from "./services";
import AddNewFlight from "./components/AddNewFlight/AddNewFlight.vue";
import FlightListing from "./components/FlightListings/FlightListing.vue";

const airportData = ref<any>(null),
  flightListingComponent = ref(null);

const onFlightAddition = (status: boolean) => {
  if (status) {
    flightListingComponent.value.fetchFlightListing();
  }
};

onMounted(() => {
  airportData.value = useFetchAirports().data;
});
</script>

<template>
  <v-layout class="d-flex flex-column rounded rounded-md">
    <template v-if="airportData?.value">
      <add-new-flight :all-airports="airportData.value" @emit-status="onFlightAddition" />
      <flight-listing :all-airports="airportData.value" ref="flightListingComponent" />
    </template>
  </v-layout>
</template>

<style scoped></style>
