<template>
  <v-dialog v-model="$store.state.loading" width="80" persistent>
    <template v-slot:default="{}">
      <div class="lds">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </template>
  </v-dialog>

  <v-app v-if="officer.name">
    <Sidebar
      :header="header"
      :officer="officer"
      :items="menu"
      color="app-color"
      :version="version"
      :date="date"
    />

    <v-main>
      <router-view class="pr-8 pl-4" :key="$route.fullPath" />
    </v-main>

    <ScrollTop />
  </v-app>
</template>

<script setup>
import menu from '@/helpers/sidebar-menu'
import ScrollTop from '@/components/ScrollTop.vue'
import Sidebar from '@/components/Sidebar.vue'
import api from '@/helpers/api'
</script>
<script>
export default {
  data() {
    return {
      header: {
        title: 'เรี่ยไร',
        subTitle: '',
        place: '',
      },
      officer: {
        name: '',
        position: '',
      },
      date: null,

      version: process.env.VERSION || '0',
    }
  },
  async created() {
    await api.postLogin(1739901966762)

    this.date = (await api.getDate()).date.toString()
    const profile = await api.getLogin()
    if (![401, 500, 503].includes(profile.status)) {
      this.officer = profile.data
      this.header.place = profile.data.rcodeDescription.description
      this.$store.state.Officer = profile.data
      this.$store.state.Rcode = this.officer.rcode
    } else {
      location.href = 'https://dopa-iservice.dopa.go.th/'
    }

    this.$store.state.loading = false
  },
  async mounted() {},
}
</script>
