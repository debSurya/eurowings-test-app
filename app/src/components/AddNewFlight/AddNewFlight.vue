<script setup lang="ts">
import { ref, onMounted } from "vue";
import { checkMobileDevices } from "../../utils/common";

const props = defineProps<{
  allAirports: any[];
  formSubmissionStatus: boolean;
}>();

const emitters = defineEmits<{
  (
    e: "emitFormData",
    formData: {
      flightNumber: string;
      destination: string;
      origin: string;
    },
  ): void;
}>();

const airportOptions = ref([]),
  formRef = ref(null),
  isMobile = ref(checkMobileDevices());

const form = {
  valid: ref(null),
  flightNumber: ref(""),
  origin: ref(""),
  destination: ref(""),
  setRules: (value: string) => !!value || "Required",
  flightNumberRules: (value: string) => value.length <= 4 || "Should be upto 4 digits",
};

const onSubmitData = () => {
  emitters("emitFormData", {
    flightNumber: form.flightNumber.value,
    origin: form.origin.value,
    destination: form.destination.value,
  });
};

onMounted(() => {
  airportOptions.value = props.allAirports
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
  <div
    class="add-flight-container rounded d-flex flex-column pt-3 pb-3"
    :class="!isMobile && 'box-shadow'"
  >
    <v-form @submit.prevent="onSubmitData" v-model="form.valid.value" ref="formRef">
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="4" lg="4">
            <v-text-field
              class="input-flight-num pb-1"
              type="number"
              v-model="form.flightNumber.value"
              :rules="[form.setRules, form.flightNumberRules]"
              label="Flight Number"
            />
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="4">
            <v-autocomplete
              class="pb-1"
              variant="outlined"
              v-model="form.origin.value"
              :items="airportOptions"
              item-title="name"
              item-value="code"
              :rules="[form.setRules]"
              label="Origin"
              required
            >
              <template v-slot:item="{ item, props }">
                <v-list-item v-bind="props" :title="item.title" :subtitle="item.value" />
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="4">
            <v-autocomplete
              variant="outlined"
              v-model="form.destination.value"
              :items="airportOptions"
              item-title="name"
              item-value="code"
              :rules="[form.setRules]"
              label="Destination"
              required
            >
              <template v-slot:item="{ item, props }">
                <v-list-item v-bind="props" :title="item.title" :subtitle="item.value" />
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row class="mt-0" justify="center">
          <v-col cols="6" sm="4" md="3" lg="2">
            <v-btn
              class="add-new-submit-btn"
              type="submit"
              block
              :ripple="true"
              variant="elevated"
              :disabled="!form.valid.value || props.formSubmissionStatus"
            >
              <v-progress-circular indeterminate :size="20" v-if="props.formSubmissionStatus" />
              <span v-else>{{ isMobile ? "Submit" : "Add New Flight" }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<style src="./AddNewFlight.scss" lang="scss"></style>
