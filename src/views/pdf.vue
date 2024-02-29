<template>
  <iframe :src="fileBase64" height="100%" width="100%" frameborder="0"></iframe>

  <!-- <v-container class="d-flex align-center justify-center w-100 h-screen" fluid>
    <div class="w-75 h-75">
      <v-img v-show="!isPdf" :src="fileBase64"></v-img>
    </div>
  </v-container> -->
</template>

<script>
export default {
  data: () => ({
    fileBase64: null,
  }),
  mounted() {
    this.fileBase64 = window.sessionStorage.getItem('fileBase64')
  },
}
</script>
