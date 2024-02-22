<template>
  <v-sheet>
    <v-form ref="license" :readonly="value.Saved">
      <v-row>
        <v-col class="d-flex d-flex flex-wrap" cols="12" sm="10" md="8" lg="4">
          <p class="mr-4 mt-2">เลขที่ใบอนุญาต</p>
          <v-text-field
            v-model="value.No"
            class="mr-4"
            variant="outlined"
            density="compact"
            append-icon="mdi-slash-forward"
            hide-details="auto"
            readonly
          />
          <v-text-field
            v-model="value.Year"
            variant="outlined"
            density="compact"
            hide-details="auto"
            readonly
          />
        </v-col>
        <v-spacer />
        <v-col cols="12" sm="5" md="5" lg="3">
          <DatePicker
            v-model="value.LicDate"
            label="ลงวันที่ออกใบอนุญาต"
            density="compact"
            variant="outlined"
            @update:model-value="
              value.LicDateS = utils.foramtDateString(value.LicDate)
            "
            :rules="require"
            hide-details
          />
        </v-col>
        <v-col cols="12" sm="5" md="4" lg="3">
          <v-text-field
            v-model="value.LicDateS"
            density="compact"
            variant="underlined"
            hide-details
            readonly
          />
        </v-col>
      </v-row>
      <v-divider class="my-6" />
      <v-row>
        <v-spacer />
        <v-col cols="12" sm="4" md="3">
          <v-autocomplete
            v-model="value.RqWrAt"
            label="เขียนที่"
            :items="$store.state.aa_Items"
            item-value="code"
            item-title="description"
            variant="outlined"
            density="compact"
            hide-details="auto"
            readonly
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <p class="mr-3">ยื่นคำขอต่อพนักงานเจ้าหน้าที่ :</p>
          <v-radio-group v-model="value.Rq" hide-details="auto" readonly>
            <v-radio class="mr-2" :value="1" label="กรุงเทพมหานคร" />
            <v-sheet>
              <v-radio class="mr-2 mb-1" :value="2" label="อำเภอ" />
              <v-sheet
                class="ml-3"
                max-width="300px"
                min-width="100px"
                v-if="value.Rq == 2"
              >
                <v-autocomplete
                  v-model="value.RqCC"
                  label="จังหวัด"
                  :items="cc_Items.getListsCC()"
                  item-value="code"
                  item-title="description"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                  readonly
                />
              </v-sheet>
            </v-sheet>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex flex-wrap" cols="12">
          <p class="mt-2 mr-3">ซึ่งผู้ขออนุญาตจัดให้มีการเรี่ยไร :</p>
          <v-radio-group
            v-model="value.LicHis"
            :inline="!$vuetify.display.xs"
            hide-details="auto"
            :rules="select"
          >
            <v-radio class="mr-2" :value="0" label="เคยได้รับอนุญาตมาแล้ว" />
            <v-radio class="mr-2" :value="1" label="ยังไม่เคยได้รับอนุญาต" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" lg="3">
          <v-select
            v-model="value.ObjectiveFlag"
            label="มีวัตถุประสงค์เพื่อ"
            :items="ObjectiveFlag_Items"
            variant="outlined"
            density="compact"
            :rules="select"
            :hide-details="value.ObjectiveFlag == 2 ? `auto` : false"
          />
        </v-col>
        <v-expand-transition>
          <v-col cols="12" sm="6" v-if="value.ObjectiveFlag == 2">
            <v-textarea
              v-model="value.Objective"
              :label="
                utils.array(ObjectiveFlag_Items, 'value', value.ObjectiveFlag)
                  .title
              "
              :rules="
                [0, 2].includes(value.ObjectiveFlag)
                  ? [(v) => !!v || 'โปรดกรอกข้อมูล']
                  : []
              "
              variant="outlined"
              density="compact"
            />
          </v-col>
        </v-expand-transition>
      </v-row>
      <p class="mb-2">
        เป็นจำนวนเงินหรือทรัพย์สินอื่น อย่างสูงที่ขออนุญาตเรี่ยไร
      </p>
      <v-row>
        <v-col class="d-flex align-self-start" cols="12" md="6" lg="4">
          <p class="mt-2 mx-3">จำนวนเงิน</p>
          <v-text-field
            v-model="value.MaxValue"
            placeholder="จำนวนเงิน"
            suffix="บาท"
            :rules="require"
            variant="outlined"
            density="compact"
            hide-details="auto"
            persistent-placeholder
          />
        </v-col>
        <v-col class="d-flex" cols="12" md="6" lg="4">
          <p class="mt-2 mx-3">เป็นทรัพย์สินอื่น</p>
          <v-text-field
            v-model="value.MaxValueString"
            placeholder="เป็นทรัพย์สินอื่น"
            class="align-self-start"
            variant="outlined"
            density="compact"
            hide-details="auto"
            persistent-placeholder
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8" lg="6">
          <v-textarea
            v-model="value.Location"
            label="สถานที่ที่จะทำการเรี่ยไร"
            :rules="require"
            variant="outlined"
            auto-grow
            hide-details="auto"
          />
        </v-col>
      </v-row>
      <v-row v-if="value.Section == 2">
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-autocomplete
            v-model="value.LocationC"
            label="จังหวัด"
            :items="cc_Items.getListsCC()"
            item-value="code"
            item-title="description"
            :rules="require"
            variant="outlined"
            density="compact"
            hide-details="auto"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-autocomplete
            v-model="value.LocationA"
            label="อำเภอ"
            :items="LocationA_Items"
            item-value="code"
            item-title="description"
            :rules="require"
            variant="outlined"
            density="compact"
            hide-details="auto"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-autocomplete
            v-model="value.LocationT"
            label="ตำบล"
            :items="LocationT_Items"
            item-value="code"
            item-title="description"
            :rules="require"
            variant="outlined"
            density="compact"
            hide-details="auto"
          />
        </v-col>
      </v-row>
      <v-row v-if="value.Section == 2">
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-btn
            block
            color="green-darken-3"
            variant="flat"
            :disabled="mapDialog"
            :loading="mapDialog"
            @click="mapDialog = !mapDialog"
          >
            <v-icon start>mdi-map-marker</v-icon> พิกัดที่ตั้งในแผนที่
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field
            v-model="value.SiteLatitude"
            label="ละติจูด"
            variant="outlined"
            hide-details="auto"
            density="compact"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field
            v-model="value.SiteLongtitude"
            label="ลองติจูด"
            variant="outlined"
            hide-details="auto"
            density="compact"
          />
        </v-col>
      </v-row>
      <v-divider class="my-6" />
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <DatePicker
            v-model="value.Sdate"
            label="ตั้งแต่วันที่"
            variant="outlined"
            density="compact"
            @update:model-value="
              value.SDateS = utils.foramtDateString(value.Sdate)
            "
            :rules="require"
            hide-details
          />
        </v-col>
        <v-col cols="12" sm="6" md="5" lg="3">
          <v-text-field
            v-model="value.SDateS"
            density="compact"
            variant="underlined"
            hide-details
            readonly
          />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <DatePicker
            v-model="value.Edate"
            label="ถึงวันที่"
            variant="outlined"
            density="compact"
            @update:model-value="
              value.EDateS = utils.foramtDateString(value.Edate)
            "
            :rules="require"
            hide-details
          />
        </v-col>
        <v-col cols="12" sm="6" md="5" lg="3">
          <v-text-field
            v-model="value.EDateS"
            density="compact"
            variant="underlined"
            hide-details
            readonly
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-autocomplete
            v-model="value.StimeH"
            label="ระหว่างเวลา"
            variant="outlined"
            density="compact"
            suffix="นาฬิกา"
            :items="Hour"
            :rules="require"
            hide-details="auto"
            persistent-placeholder
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-autocomplete
            v-model="value.StimeM"
            variant="outlined"
            density="compact"
            suffix="นาที"
            :items="Minute"
            :rules="require"
            hide-details="auto"
            persistent-placeholder
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-autocomplete
            v-model="value.EtimeH"
            label="ถึงเวลา"
            variant="outlined"
            density="compact"
            suffix="นาฬิกา"
            :items="Hour"
            :rules="require"
            hide-details="auto"
            persistent-placeholder
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-autocomplete
            v-model="value.EtimeM"
            variant="outlined"
            density="compact"
            suffix="นาที"
            :items="Minute"
            :rules="require"
            hide-details="auto"
            persistent-placeholder
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" lg="3">
          <v-select
            v-model="value.CollectTypeFlag"
            label="วิธีเก็บรักษาและทำบัญชีเงินหรือทรัพย์สินที่เรี่ยไรได้"
            :items="CollectTypeFlag_Items"
            variant="outlined"
            density="compact"
            :rules="select"
            hide-details="auto"
          />
        </v-col>
        <v-expand-transition>
          <v-col
            cols="12"
            sm="6"
            v-if="[1, 2, 9].includes(value.CollectTypeFlag)"
          >
            <v-textarea
              v-model="value.CollectType"
              :label="
                utils.array(
                  CollectTypeFlag_Items,
                  'value',
                  value.CollectTypeFlag
                ).title
              "
              :rules="
                [1, 2, 9].includes(value.CollectTypeFlag)
                  ? [(v) => !!v || 'โปรดกรอกข้อมูล']
                  : []
              "
              variant="outlined"
              hide-details="auto"
            />
          </v-col>
        </v-expand-transition>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" lg="3">
          <v-select
            v-model="value.CollectProcessFlag"
            label="วิธีทำการเรี่ยไร"
            :items="CollectProcessFlag_Items"
            variant="outlined"
            density="compact"
            :rules="select"
            hide-details="auto"
          />
        </v-col>
        <v-expand-transition>
          <v-col cols="12" sm="6" v-if="value.CollectProcessFlag == 9">
            <v-textarea
              v-model="value.CollectProcess"
              :label="
                utils.array(
                  CollectProcessFlag_Items,
                  'value',
                  value.CollectProcessFlag
                ).title
              "
              :rules="
                value.CollectProcessFlag == 9
                  ? [(v) => !!v || 'โปรดกรอกข้อมูล']
                  : []
              "
              variant="outlined"
              hide-details="auto"
            />
          </v-col>
        </v-expand-transition>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field
            v-model="value.EmpName"
            label="เจ้าพนักงาน"
            variant="outlined"
            density="compact"
            :rules="require"
            hide-details="auto"
          />
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-text-field
            v-model="value.EmpPosition"
            label="ตำแหน่ง"
            variant="outlined"
            density="compact"
            :rules="require"
            hide-details="auto"
          />
        </v-col>
      </v-row>
    </v-form>

    <v-dialog
      v-model="mapDialog"
      transition="dialog-top-transition"
      fullscreen
      persistent
    >
      <v-card>
        <v-card-text class="pa-0">
          <MapLatLong v-model="map" />
        </v-card-text>
        <v-card-actions class="pa-0">
          <v-btn
            block
            color="primary"
            size="x-large"
            variant="flat"
            prepend-icon="mdi-map-marker"
            @click="mapDialog = false"
          >
            ยืนยันพิกัดบนแผนที่
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>
<script setup>
import * as utils from '@/helpers/utils'
import api from '@/helpers/api'
import cc_Items from '@/helpers/itemJson'
</script>
<script>
export default {
  props: {
    data: {},
  },
  data() {
    return {
      mapDialog: false,
      map: null,
      value: {
        No: null,
        Year: null,
        LicDate: null,
        LicDateS: null,
        RqDate: null,
        RqDateS: null,

        RqWrAt: null,
        Rq: null,
        RqCC: null,
        LicHis: null,
        ObjectiveFlag: null,
        Objective: null,
        MaxValue: null,
        MaxValueString: null,
        Location: null,
        Sdate: null,
        SDateS: null,
        Edate: null,
        EDateS: null,
        StimeH: null,
        StimeM: null,
        EtimeH: null,
        EtimeM: null,
        CollectTypeFlag: null,
        CollectType: null,
        CollectProcessFlag: null,
        CollectProcess: null,
        EmpName: null,
        EmpPosition: null,

        LocationC: null,
        LocationA: null,
        LocationT: null,
        SiteLatitude: null,
        SiteLongtitude: null,

        Sign_Items: [],

        CheckValid: null,
        Validate: null,

        Section: null,
        Saved: false,
      },

      ObjectiveFlag_Items: [
        { value: 1, title: 'เพื่อทำการเรี่ยไร' },
        { value: 2, title: 'อื่น ๆ' },
      ],
      CollectTypeFlag_Items: [
        { value: 1, title: 'นำเข้าบัญชี' },
        { value: 2, title: 'เก็บไว้ที่กรรมการ' },
        { value: 9, title: 'อื่น ๆ' },
      ],
      CollectProcessFlag_Items: [
        { value: 1, title: 'โฆษณาด้วยสิ่งพิมพ์' },
        { value: 2, title: 'วิทยุกระจายเสียง' },
        { value: 3, title: 'เครื่องเปล่งเสียง' },
        { value: 9, title: 'อื่น ๆ' },
      ],

      LocationA_Items: [],
      LocationT_Items: [],

      require: [(v) => (v != null && v != '') || 'โปรดกรอกข้อมูล'],
      select: [(v) => v != null || 'โปรดเลือก'],
    }
  },

  watch: {
    'value.RqCC'(v) {
      if (v != '10') this.value.Rq = 2
      else this.value.Rq = 1
    },

    async 'value.LocationC'(v) {
      this.value.LocationA = null
      this.value.LocationT = null
      this.LocationA_Items = await api.getAA(v)
    },

    async 'value.LocationA'(v) {
      this.value.LocationT = null
      this.LocationT_Items = await api.getTT(this.value.LocationC, v)
    },

    async 'value.CheckValid'(v) {
      const self = this
      if (v) {
        if ((await this.$refs.license.validate()).valid) {
          this.value.Validate = true
        }
      }
      this.value.CheckValid = false
      setTimeout(function () {
        self.value.Validate = false
      }, 1000)
    },

    'value.MaxValue'(newVal, oldVal) {
      if (!oldVal) {
        oldVal = ''
      }
      if (newVal.replaceAll(',', '') != oldVal.replaceAll(',', '')) {
        let num = ''
        const number = newVal.replaceAll(',', '')
        let length = newVal.length
        let stay = ''
        for (let i = length - 1; i >= 0; i--) {
          stay = number.charAt(i) + stay
          if (length > 3 && Number(stay.length - 1) % 3 == 0) {
            num = number.charAt(i) + ',' + num
          } else {
            num = number.charAt(i) + num
          }
        }
        if (num.endsWith(',')) {
          num = num.slice(0, -1)
        }

        this.value.MaxValue = num
      }
    },

    map(v) {
      this.value.SiteLatitude = v.lat
      this.value.SiteLongtitude = v.long
    },
  },

  computed: {
    Hour() {
      let hour = []
      for (let i = 0; i <= 23; i++) {
        hour.push(i.toString().padStart(2, '0'))
      }
      return hour
    },

    Minute() {
      let minute = []
      for (let i = 0; i <= 60; i++) {
        minute.push(i.toString().padStart(2, '0'))
      }
      return minute
    },
  },

  async mounted() {
    this.value = this.data

    const Sign = await api.getSign(
      this.value.RqWrAt == '0083'
        ? '0083'
        : `${this.value.RqCC}${this.value.RqWrAt}`
    )

    if (Sign.status == 200) {
      this.value.Sign_Items = Sign.data
    }
  },
}
</script>
