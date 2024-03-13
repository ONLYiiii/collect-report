<template>
  <v-dialog v-model="dialogVisible" content-class="align-center">
    <v-card max-height="80vh" max-width="75vw">
      <v-card-title class="d-flex justify-end px-2 py-1">
        <v-btn
          icon="mdi-window-close"
          @click="() => (dialogVisible = false)"
          color="error"
          variant="text"
        ></v-btn>
      </v-card-title>

      <v-card-text class="pa-5">
        <v-img :src="props.pictureBase64" height="65vh" width="50vw"></v-img>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
const dialogVisible = defineModel()
const props = defineProps({
  pictureBase64: String,
})
</script>
