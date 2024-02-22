<template>
  <div>
    <div class="d-flex align-center pb-5">
      <v-icon v-if="icon" style="font-size: 30px" class="pr-2" :color="color">
        {{ icon }}
      </v-icon>

      <p :class="`font-weight-black text-${color}`">
        {{ header }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
    },
    icon: {
      type: String,
      default: '',
    },
    header: {
      type: String,
      default: '',
    },
  },
}
</script>
