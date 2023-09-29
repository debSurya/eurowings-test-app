<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  showDialog: boolean;
  flightAdditionStatusMessage: string;
}>();

const emitters = defineEmits<{ (e: "emitModalDismissEvent"): void }>();

const show = computed(() => props.showDialog);

const dismissModal = () => {
  emitters("emitModalDismissEvent");
};
</script>

<template>
  <v-dialog v-model="show" persistent width="300">
    <v-card class="align-center">
      <v-card-text data-testid="v-dialog-text" class="text-h6">{{
        props.flightAdditionStatusMessage
      }}</v-card-text>
      <v-card-actions>
        <v-btn variant="tonal" block @click="dismissModal">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style />
