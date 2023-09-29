<script setup lang="ts">
import { ref, onMounted } from "vue";
import { postNewFlight, useFetchAirports, useFetchFlightListing } from "../../services";
import AddNewFlight from "../../components/AddNewFlight/AddNewFlight.vue";
import FlightListing from "../../components/FlightListings/FlightListing.vue";
import { IFlightListingResponse } from "../../components/FlightListings/FlightListing.interface";
import { checkMobileDevices } from "../../utils/common";

const showDialog = ref(false),
  flightAdditionStatusSuccess = ref(false),
  flightAdditionStatusMessage = ref(""),
  isMobile = ref(checkMobileDevices()),
  initialLoad = ref(true),
  loadingFlightListing = ref(true),
  formSubmitting = ref(false),
  flightListingResponse = ref<IFlightListingResponse[]>();

const onFormSubmit = async (formData: {
  flightNumber: string;
  origin: string;
  destination: string;
}) => {
  formSubmitting.value = true;
  const [response] = await postNewFlight({
    flightNumber: formData.flightNumber,
    destination: formData.destination,
    origin: formData.origin,
  });
  formSubmitting.value = false;
  showDialog.value = true;
  if (response === "OK") {
    flightAdditionStatusSuccess.value = true;
    flightAdditionStatusMessage.value = "Flight added successfully!";
  } else {
    flightAdditionStatusSuccess.value = false;
    flightAdditionStatusMessage.value = "Flight addition failed!";
  }
};

const dismissModal = () => {
  showDialog.value = false;
  if (flightAdditionStatusSuccess.value) {
    fetchFlightListing();
  }
};

const { data: airportData, loading: loadingAirports } = useFetchAirports();

const fetchFlightListing = async () => {
  loadingFlightListing.value = true;
  flightListingResponse.value = await useFetchFlightListing();
  loadingFlightListing.value = false;
  initialLoad.value = false;
};

onMounted(() => {
  fetchFlightListing();
});
</script>

<template>
  <v-layout class="layout rounded rounded-md">
    <v-app-bar height="70" image="../../src/assets/img/ew.png">
      <v-app-bar-title class="pl-2">Eurowings</v-app-bar-title>
    </v-app-bar>
    <v-main
      class="main-content d-flex flex-column"
      :class="(loadingAirports || loadingFlightListing) && 'justify-center'"
    >
      <template v-if="!loadingAirports && !loadingFlightListing">
        <template v-if="isMobile">
          <v-expansion-panels>
            <v-expansion-panel title="Add New Flight">
              <v-expansion-panel-text>
                <add-new-flight
                  :all-airports="airportData"
                  :form-submission-status="formSubmitting"
                  @emit-form-data="onFormSubmit"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
        <add-new-flight
          v-else
          :all-airports="airportData"
          :form-submission-status="formSubmitting"
          @emit-form-data="onFormSubmit"
        />
        <v-divider :thickness="20" color="#FFFFFF"></v-divider>
        <flight-listing :all-airports="airportData" :flight-listing="flightListingResponse" />
      </template>
      <v-progress-linear indeterminate height="30" v-else>
        <span v-if="initialLoad">Fetching flights and airports....</span>
        <span v-else>Refetching flights....</span>
      </v-progress-linear>
      <v-dialog v-model="showDialog" persistent width="300">
        <v-card class="align-center">
          <v-card-text class="text-h6">{{ flightAdditionStatusMessage }}</v-card-text>
          <v-card-actions>
            <v-btn variant="tonal" block @click="dismissModal()">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-layout>
</template>

<style lang="scss" src="./HomeContainer.styles.scss"></style>
