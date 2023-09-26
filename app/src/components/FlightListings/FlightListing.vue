<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFetchFlightListing } from "../../services";
import { IFlightListingViewData, IFlightListingResponse } from "./FlightListing.interface";

const props = defineProps<{
  allAirports: any[];
}>();

const flightListingData = ref<IFlightListingViewData[]>([]);

const fetchFlightListing = async () => {
  const flightListingResponse = await useFetchFlightListing();
  populateFlightListing(flightListingResponse);
};

const populateFlightListing = (apiData: IFlightListingResponse[]) => {
  flightListingData.value = apiData.map((val: IFlightListingResponse) => {
    const matchedOriginAirport = props.allAirports.find(
      (airport: any) => airport.code === val.origin,
    );
    const matchedDestinationAirport = props.allAirports.find(
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
};

onMounted(() => {
  fetchFlightListing();
});

defineExpose({
  fetchFlightListing,
});
</script>

<template>
  <v-main class="d-flex flex-column align-left">
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
