<template>
  <v-sheet class="pt-2">
    <v-row>
      <v-col cols="12" sm="4" md="3" lg="3">
        <v-autocomplete
          v-model="value.FRcode"
          label="สถานที่ออกใบอนุญาต"
          variant="outlined"
          density="compact"
          :items="cc_Items.getListsCC()"
          item-value="code"
          item-title="description"
          hide-details="auto"
          :disabled="$store.state.Rcode != '0083'"
        />
      </v-col>
      <v-col cols="12" sm="4" md="3" lg="3">
        <v-autocomplete
          v-model="value.LRcode"
          label="อำเภอ/เขต"
          variant="outlined"
          density="compact"
          :items="$store.state.aa_Items"
          item-value="code"
          item-title="description"
          hide-details="auto"
          :disabled="$store.state.Rcode != '0083'"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex" cols="12" sm="4" md="3" lg="3">
        <p class="mt-2 mr-1">มาตรา :</p>
        <v-radio-group v-model="value.Section" inline hide-details>
          <v-radio
            label="6"
            :value="1"
            class="mr-2"
            color="app-color"
            :disabled="$store.state.Rcode != '0083'"
          />
          <v-radio label="8" :value="2" color="app-color" />
        </v-radio-group>
      </v-col>
      <v-col cols="12" sm="4" md="3" lg="3">
        <v-select
          v-model="value.Permissions"
          label="ประเภทใบอนุญาต"
          variant="outlined"
          density="compact"
          :items="select2"
          hide-details="auto"
        />
      </v-col>
      <v-col class="d-flex" cols="12" sm="6" md="4" lg="4">
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

      <v-col
        :class="$vuetify.display.xs ? 'd-flex justify-end' : ''"
        cols="12"
        md="2"
        sm="2"
        lg="2"
      >
        <v-btn
          class="px-10"
          color="primary"
          variant="outlined"
          size="41px"
          rounded
          @click="choose"
        >
          ตกลง
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script setup>
import cc_Items from '@/helpers/itemJson'
</script>
<script>
import api from '@/helpers/api'
export default {
  props: {
    data: {},
  },
  data() {
    return {
      value: {
        FRcode: null,
        LRcode: null,
        Section: null,
        Permissions: null,
        Check: false,
        No: null,
        Year: null,
      },
      select2: [
        { value: 1, title: 'ร.3 ขออนุญาตจัดให้มีการเรี่ยไร ' },
        { value: 2, title: 'ร.4 ขออนุญาตทำการเรี่ยไร' },
      ],
    }
  },
  methods: {
    async choose() {
      if (!this.value.Section || !this.value.Permissions) {
        this.$swal({
          icon: 'warning',
          title: 'เกิดข้อผิดพลาด',
          text: 'โปรดเลือกมาตราและประเภทคำขอ',
        })
      } else if (!this.value.No || !this.value.Year) {
        this.$swal({
          icon: 'warning',
          title: 'เกิดข้อผิดพลาด',
          text: 'โปรดระบุเลขใบอนุญาต',
        })
      } else {
        this.$store.state.loading = true
        let status = await api.getCollectID(
          `${this.value.Permissions}${this.value.Section}`,
          this.value.LRcode == '0083'
            ? '0083'
            : `${this.value.FRcode}${this.value.LRcode}`,
          `${this.value.Year}${this.value.No.padStart(8, '0')}`
        )
        this.$store.state.loading = false
        if (status.status == 404) {
          this.$swal({
            icon: 'info',
            title: 'ไม่พบข้อมูลใบอนุญาต',
            text: 'สามารถเพิ่มใบอนุญาตกับเลขที่ใบอนุญาตนี้',
            showCancelButton: true,
            confirmButtonText: 'ตกลง',
          }).then((result) => {
            if (result.isConfirmed) {
              this.value.Check = true
            }
          })
        } else if (status.pid) {
          this.$swal({
            icon: 'warning',
            title: 'เกิดข้อผิดพลาด',
            text: 'เลขที่ใบอนุญาตนี้มีอยู่ในระบบแล้ว',
          })
          this.value.Check = false
        } else {
          this.$swal({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
          })
          this.value.Check = false
        }
      }
    },
  },

  watch: {
    async 'value.FRcode'(v) {
      this.value.LRcode = null
      this.$store.state.aa_Items = []
      if (this.$store.state.Rcode != '0083') {
        this.$store.state.aa_Items = await api.getAA(v)
      }

      if (this.$store.state.Rcode == '0083' && v != '10') {
        this.$store.state.aa_Items = await api.getAA(v)
      }

      if (this.$store.state.Rcode == '0083' && v == '10') {
        this.$store.state.aa_Items.unshift({
          code: '0083',
          description: 'ศูนย์บริการประชาชน',
        })
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

    this.value.Section = Rcode == '0083' ? null : 2
  },
}
</script>
