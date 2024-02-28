<template>
  <v-sheet class="pt-2">
    <v-row>
      <v-col cols="12" sm="6" md="3" lg="3">
        <v-autocomplete
          v-model="value.FRcode"
          label="สถานที่ออกใบอนุญาต"
          variant="outlined"
          density="compact"
          :items="cc_Items.getListsCC()"
          item-value="code"
          item-title="description"
          hide-details="auto"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3" lg="3">
        <v-autocomplete
          v-model="value.LRcode"
          label="อำเภอ/เขต"
          variant="outlined"
          density="compact"
          :items="$store.state.aa_Items"
          item-value="code"
          item-title="description"
          hide-details="auto"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-select
          v-model="value.Permissions"
          label="ประเภทใบอนุญาต"
          variant="outlined"
          density="compact"
          :items="select2"
          hide-details="auto"
        />
      </v-col>
      <v-col class="d-flex" cols="12" sm="6" md="4">
        <v-text-field
          v-model="value.No"
          :label="$route.name != 'license' ? 'ใบอนุญาตเลขที่' : 'คำขอเลขที่'"
          class="mr-4"
          variant="outlined"
          density="compact"
          v-mask="'########'"
          append-icon="mdi-slash-forward"
          hide-details="auto"
        />
        <v-text-field
          v-model="value.Year"
          label="ปี"
          variant="outlined"
          density="compact"
          v-mask="'####'"
          hide-details="auto"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <DatePicker
          v-model="value.StartDate"
          label="วันที่ออกใบอนุญาต"
          density="compact"
          variant="outlined"
          hide-details
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <DatePicker
          v-model="value.EndDate"
          label="จนถึงวันที่"
          density="compact"
          variant="outlined"
          hide-details
        />
      </v-col>
      <v-col
        :class="$vuetify.display.smAndDown ? 'd-flex justify-end' : ''"
        cols="12"
        md="2"
        lg="2"
      >
        <v-btn
          class="px-6"
          color="#444"
          height="41px"
          prepend-icon="mdi-magnify"
          rounded
          @click="choose"
        >
          ค้นหา
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script setup>
import cc_Items from '@/helpers/itemJson'
import api from '@/helpers/api'
import * as utils from '@/helpers/utils'
</script>
<script>
export default {
  props: {
    data: {},
  },
  data() {
    return {
      value: {
        FRcode: null,
        LRcode: null,
        Permissions: null,
        No: null,
        Year: null,
        StartDate: null,
        EndDate: null,
        Data: [],
      },
      select2: [
        { value: 11, title: 'ร.3 ขออนุญาตจัดให้มีการเรี่ยไร มาตรา 6' },
        { value: 12, title: 'ร.3 ขออนุญาตจัดให้มีการเรี่ยไร มาตรา 8' },
      ],
    }
  },
  methods: {
    async choose() {
      if (!this.value.FRcode || !this.value.LRcode) {
        this.$swal({
          icon: 'warning',
          title: 'เกิดข้อผิดพลาด',
          text: 'โปรดเลือกสถานที่ออกใบอนุญาต',
        })
      } else if (!this.value.StartDate || !this.value.EndDate) {
        this.$swal({
          icon: 'warning',
          title: 'เกิดข้อผิดพลาด',
          text: 'โปรดระบุเลขวันที่ออใบอนุญาต',
        })
      } else {
        this.$store.state.loading = true

        let getData = await api.getReport(
          this.value.LRcode == '0083'
            ? '0083'
            : `${this.value.FRcode}${this.value.LRcode}`,
          Number(utils.formatYYYYMMDD(this.value.StartDate)),
          Number(utils.formatYYYYMMDD(this.value.EndDate)),
          this.value.Permissions,
          this.value.Year,
          this.value.No
        )
        this.$store.state.loading = false

        if (getData.data.length != 0) {
          this.value.Data = getData.data
        } else if (getData.data.length == 0) {
          this.$swal({
            icon: 'warning',
            title: 'ไม่พบข้อมูล',
          })
        } else {
          this.$swal({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
          })
        }
      }
    },
  },

  watch: {
    async 'value.FRcode'(v) {
      this.value.LRcode = null
      this.$store.state.aa_Items = []
      if (v != '10') {
        this.$store.state.aa_Items = await api.getAA(v)
      }
      if (v == '10') {
        this.$store.state.aa_Items.unshift({
          code: '0083',
          description: 'ศูนย์บริการประชาชนฯ',
        })
        this.value.LRcode = '0083'
      }
    },
  },

  async mounted() {
    this.value = this.data

    const Rcode = this.$store.state.Rcode
    const self = this
    if (Rcode == '0083') {
      this.value.FRcode = '10'
      if (this.$store.state.Rcode == '0083') {
        this.$store.state.aa_Items.unshift({
          code: '0083',
          description: 'ศูนย์บริการประชาชน',
        })
      }
      setTimeout(function () {
        self.value.LRcode = '0083'
      }, 0)
    } else {
      this.value.FRcode = Rcode.substring(0, 2)
      this.$store.state.aa_Items = await api.getAA(this.value.FRcode)
      this.value.LRcode = Rcode.substring(2, 4)
    }
  },
}
</script>
