<template>
  <nav>
    <v-navigation-drawer
      v-model="drawer"
      image="@/assets/images/bg-request-alpha.png"
      :color="color"
      :width="width"
    >
      <div class="text-center justify-center">
        <div class="d-flex justify-center pt-10">
          <v-img max-width="60" src="@/assets/images/icon-request.png" />
        </div>
        <div class="text-h5 pt-5">
          <h1>i-SERVICE</h1>
        </div>
        <div class="text-h6 text-orange-lighten-3 pb-2">{{ header.title }}</div>
      </div>
      <v-divider :thickness="1" class="border-opacity-100 mx-6" />

      <v-list>
        <v-list-item
          v-for="(item, idx) in items"
          :key="item.title"
          :value="item.title"
          @click="menu(item, idx)"
          :active="$route.path === item.link"
        >
          <template v-slot:prepend>
            <v-avatar>
              <v-icon :icon="item.icon" color="white"></v-icon>
            </v-avatar>
          </template>

          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <hr class="mb-4 mx-5" />
        <div class="px-5 pb-10">
          <v-btn
            block
            text
            rounded="xl"
            size="large"
            color="app-color"
            prepend-icon="mdi-arrow-left"
            @click="back()"
          >
            ย้อนกลับ
          </v-btn>
          <div style="position: absolute" class="text-overline">
            version: {{ version }}
          </div>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      elevation="0"
      v-if="$vuetify.display.mdAndUp"
      extension-height="5"
      sticky
    >
      <v-list-item v-if="$vuetify.display.mdAndUp" :subtitle="officer.position">
        <template v-slot:title>
          <span class="font-weight-bold text-app-color">
            {{ officer.name }}
          </span>
        </template>
        <template v-slot:prepend>
          <v-avatar>
            <v-icon color="gray" size="30"> mdi-account-circle-outline </v-icon>
          </v-avatar>
        </template>
      </v-list-item>

      <v-spacer />

      <v-list-item
        v-if="$vuetify.display.mdAndUp"
        :subtitle="thaiDate"
        class="text-right mr-2"
      >
        <template v-slot:title>
          <span class="font-weight-bold text-app-color">
            {{ `${header.place} (${this.$store.state.Rcode})` }}
          </span>
        </template>
      </v-list-item>

      <template v-slot:extension>
        <v-divider
          :thickness="1"
          class="border-opacity-100"
          color="grey-darken-1 mx-6"
        />
      </template>
    </v-app-bar>
    <v-app-bar elevation="0" height="45">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <span class="font-weight-bold">{{ subTitle }}</span>
    </v-app-bar>
  </nav>
</template>

<script>
import { foramtDateString } from '@/helpers/utils.js'
export default {
  data: () => ({
    drawer: null,
    active: 0,
    subTitle: '',
    selection: null,
  }),

  props: {
    header: {
      title: {
        type: String,
      },
      subTitle: {
        type: String,
      },
      place: {
        type: String,
      },
    },
    officer: {
      name: {
        type: String,
      },
      position: {
        type: String,
      },
    },
    items: {
      type: Array,
    },
    version: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    color: {
      type: String,
    },
    width: {
      type: String,
      default: '280',
    },
  },
  computed: {
    thaiDate() {
      return foramtDateString(this.date, true)
    },
  },
  async mounted() {
    await this.$router.isReady()
    const foundObject = await this.items.find(
      (item) => item.link === this.$route.path
    )
    if (foundObject) {
      this.selection = foundObject.title
      this.subTitle = foundObject.subTitle
      document.title = this.subTitle
    }
  },

  methods: {
    back() {
      this.$router.go(-1)
    },

    async menu(item) {
      this.selection = item.title
      this.subTitle = item.subTitle
      document.title = this.subTitle
      await this.$router.replace({ path: item.link })
    },
  },
}
</script>
