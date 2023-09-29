<script setup lang="ts">
import { ref, onMounted } from "vue";
import { IFlightListingViewData, IFlightListingResponse } from "./FlightListing.interface";
import { checkMobileDevices } from "../../utils/common";

const { allAirports, flightListing } = defineProps<{
  allAirports: any[];
  flightListing: IFlightListingResponse[];
}>();

const flightListingData = ref<IFlightListingViewData[]>([]);

const tableRef = ref(null),
  tableHeight = ref(0),
  scrollPos = ref(0),
  isMobile = ref(checkMobileDevices());

const populateFlightListing = () => {
  flightListingData.value = flightListing.map((val: IFlightListingResponse) => {
    const matchedOriginAirport = allAirports.find((airport: any) => airport.code === val.origin);
    const matchedDestinationAirport = allAirports.find(
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
  populateFlightListing();
  tableHeight.value = isMobile.value
    ? window.innerHeight - tableRef.value.$el.getBoundingClientRect().top - 20
    : window.innerHeight;
  tableRef.value.$el.children[0].addEventListener("scroll", () => {
    scrollPos.value = tableRef.value.$el.children[0].scrollTop;
  });
});
</script>

<template>
  <div class="table-container rounded d-flex flex-column align-left">
    <v-table fixed-header ref="tableRef" :height="tableHeight">
      <thead :class="scrollPos > 0 && 'scrolling-box-shadow'">
        <tr>
          <th class="text-center pa-3">Flight Number</th>
          <th class="text-center pa-3">
            <v-icon icon="mdi-airplane-takeoff" />
            <div>Origin</div>
          </th>
          <th class="text-center pa-3">
            <v-icon icon="mdi-airplane-landing" />
            <div>Destination</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(flight, index) in flightListingData" :key="index">
          <td class="text-center pa-2">
            <span :class="isMobile ? 'text-subtitle-1' : 'text-h6'">{{ flight.flightNumber }}</span>
          </td>
          <td class="text-center pa-2">
            <v-card
              class="d-flex flex-column justify-center"
              variant="tonal"
              :min-height="isMobile ? '140px' : '120px'"
            >
              <v-card-title>{{ flight.origin.code }}</v-card-title>
              <v-card-subtitle>{{ flight.origin.country }}</v-card-subtitle>
              <v-card-text
                class="d-flex align-center justify-center pa-1"
                :class="!isMobile ? 'font-size-1' : ''"
                >{{ flight.origin.name }}</v-card-text
              >
            </v-card>
          </td>
          <td class="text-center pa-2">
            <v-card
              class="d-flex flex-column justify-center"
              variant="tonal"
              :min-height="isMobile ? '140px' : '120px'"
            >
              <v-card-title>{{ flight.destination.code }}</v-card-title>
              <v-card-subtitle>{{ flight.destination.country }}</v-card-subtitle>
              <v-card-text
                class="d-flex align-center justify-center pa-1"
                :class="!isMobile ? 'font-size-1' : ''"
                >{{ flight.destination.name }}</v-card-text
              >
            </v-card>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style src="./FlightListing.styles.scss" lang="scss"></style>
