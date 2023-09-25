<script setup lang="ts">
import { watch, inject, ref } from "vue";

const airports = ref(inject<any[]>("airports") || []);

const airportOptions = ref([]);

const form = {
  valid: ref(false),
  flightNumber: ref(""),
  origin: ref(""),
  destination: ref(""),
  setRules: [(value: string) => !!value || "Required"],
};

const onSubmitData = (a) => {
  console.log(a, form.flightNumber.value, form.origin.value);
};

watch(airports.value, (currentAirports: any) => {
  currentAirports.sort((a: any, b: any) =>
    a.name.toUpperCase() > b.name.toUpperCase()
      ? 1
      : a.name.toUpperCase() < b.name.toUpperCase()
      ? -1
      : 0,
  );
  airportOptions.value = currentAirports
    .map((airport: any) => ({
      code: airport.code,
      name: airport.name,
    }))
    .filter((airport: any) => !!airport.name.trim());
});
</script>

<template>
  <v-app-bar theme="dark" title="Add new flight" />
  <v-main class="d-flex">
    <v-form @submit.prevent="onSubmitData" v-model="form.valid.value">
      <v-text-field
        v-model="form.flightNumber.value"
        :rules="form.setRules"
        label="Flight Number"
        :style="{ width: '140px' }"
      />
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
      <v-btn type="submit" block variant="elevated" :disabled="!form.valid.value">Submit</v-btn>
    </v-form>
  </v-main>
</template>

<style></style>
