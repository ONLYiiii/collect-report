<template>
  <v-fab-transition>
    <v-btn
      v-if="shouldShowFab"
      color="app-color"
      icon
      dark
      class="backToTop"
      @click="scrollToTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  data() {
    return {
      shouldShowFab: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.toggleButton)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.toggleButton)
  },
  methods: {
    toggleButton() {
      this.shouldShowFab = window.scrollY > 100
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style scoped>
.backToTop {
  position: fixed;
  right: 20px;
  bottom: 80px;
  z-index: 6;
  opacity: 40%;
}
</style>
