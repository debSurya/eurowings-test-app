<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { postNewFlight } from "../../services";

const { allAirports } = defineProps<{
  allAirports: any[];
}>();

const emitters = defineEmits<{
  (e: "emitStatus", status: boolean): void;
}>();

const airportOptions = ref([]),
  isAddNewFlightSuccessful = ref(false);

const form = {
  valid: ref(false),
  flightNumber: ref(""),
  origin: ref(""),
  destination: ref(""),
  setRules: [(value: string) => !!value || "Required"],
};

const onSubmitData = async () => {
  const [response] = await postNewFlight({
    flightNumber: form.flightNumber.value,
    destination: form.destination.value,
    origin: form.origin.value,
  });
  console.log(response);
  isAddNewFlightSuccessful.value = response === "OK";
};

watch(isAddNewFlightSuccessful, (currentVal: boolean, prevVal: boolean) => {
  if (currentVal && !prevVal) {
    emitters("emitStatus", currentVal);
  }
});

onMounted(() => {
  airportOptions.value = allAirports
    .map((airport: any) => ({
      code: airport.code,
      name: airport.name,
    }))
    .filter((airport: any) => !!airport.name.trim())
    .sort((a: any, b: any) =>
      a.name.toUpperCase() > b.name.toUpperCase()
        ? 1
        : a.name.toUpperCase() < b.name.toUpperCase()
        ? -1
        : 0,
    );
});
</script>

<template>
  <v-main>
    <v-form @submit.prevent="onSubmitData" v-model="form.valid.value">
      <v-container>
        <v-row no-gutters>
          <v-col cols="4">
            <v-text-field
              v-model="form.flightNumber.value"
              :rules="form.setRules"
              label="Flight Number"
            />
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              theme="dark"
              variant="outlined"
              v-model="form.origin.value"
              :items="airportOptions"
              item-title="name"
              item-value="code"
              :rules="form.setRules"
              label="Origin"
              required
            >
              <template v-slot:item="{ item, props }">
                <v-list-item v-bind="props" :title="item.title" :subtitle="item.value" />
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              theme="dark"
              variant="outlined"
              v-model="form.destination.value"
              :items="airportOptions"
              item-title="name"
              item-value="code"
              :rules="form.setRules"
              label="Destination"
              required
            >
              <template v-slot:item="{ item, props }">
                <v-list-item v-bind="props" :title="item.title" :subtitle="item.value" />
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="3">
            <v-btn type="submit" block variant="elevated" :disabled="!form.valid.value"
              >Submit</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <span v-if="isAddNewFlightSuccessful">Success</span>
  </v-main>
</template>

<style></style>
