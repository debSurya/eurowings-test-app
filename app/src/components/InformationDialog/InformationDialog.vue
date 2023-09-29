<script setup lang="ts">
import { computed } from "vue";
import { checkMobileDevices } from "../../utils/common";

const props = defineProps<{
  showDialog: boolean;
  success: boolean;
  flightAdditionStatusMessage: string;
}>();

const emitters = defineEmits<{ (e: "emitModalDismissEvent"): void }>();

const show = computed(() => props.showDialog);

const dismissModal = () => {
  emitters("emitModalDismissEvent");
};
</script>

<template>
  <v-dialog v-model="show" persistent :width="!checkMobileDevices() ? 400 : undefined">
    <v-card class="align-center">
      <v-card-text class="d-flex flex-column align-center">
        <v-icon v-if="props.success" icon="mdi-check-circle" color="#228b22" size="70" />
        <v-icon v-else icon="mdi-alert-circle" color="#9a245d" size="70" />
        <div class="text-subtitle-1">
          {{ props.flightAdditionStatusMessage }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="tonal" block @click="dismissModal">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style />
