<script setup lang="ts">
import { inject, ref, watch } from "vue";
import { useFetchFlightListing } from "../../services";
import { useRouter } from "vue-router";
import { IFlightListingViewData, IFlightListingResponse } from "./FlightListing.interface";

const airports = ref(inject<any[]>("airports") || []);
const router = useRouter();

const flightListingData = ref<IFlightListingViewData[]>([]);
const { data: apiData } = useFetchFlightListing();

watch([apiData, airports], ([currentApiData, currentAirports]: any[]) => {
  if (!!currentAirports.value && currentAirports.value.length) {
    flightListingData.value = currentApiData.map((val: IFlightListingResponse) => {
      const matchedOriginAirport = currentAirports.value.find(
        (airport: any) => airport.code === val.origin,
      );
      const matchedDestinationAirport = currentAirports.value.find(
        (airport: any) => airport.code === val.destination,
      );
      return {
        flightNumber: val.flightNumber,
        origin: {
          code: val.origin,
          name: matchedOriginAirport.name,
          country: matchedOriginAirport.country,
        },
        destination: {
          code: val.destination,
          name: matchedDestinationAirport.name,
          country: matchedDestinationAirport.country,
        },
      };
    });
  }
});

const redirectToAddFlight = () => {
  router.push("/add-new-flight");
};
</script>

<template>
  <v-app-bar theme="dark" title="Flight Listing" />
  <v-main class="d-flex flex-column align-left">
    <v-btn variant="outlined" width="130" @click="redirectToAddFlight()">Add Flight</v-btn>
    <v-table theme="dark" fixed-header>
      <tr>
        <th class="text-left">Flight number</th>
        <th class="text-left">Origin</th>
        <th class="text-left">Destination</th>
      </tr>
      <tr v-for="(flight, index) in flightListingData" :key="index">
        <td class="text-left">{{ flight.flightNumber }}</td>
        <td class="text-left">
          Code: {{ flight.origin.code }} Name: {{ flight.origin.name }} Country:
          {{ flight.origin.country }}
        </td>
        <td class="text-left">
          Code: {{ flight.destination.code }} Name: {{ flight.destination.name }} Country:
          {{ flight.destination.country }}
        </td>
      </tr>
    </v-table>
  </v-main>
</template>

<style></style>
