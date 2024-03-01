<template>
  <v-container class="mx-2" fluid>
    <!-- First Order -->
    <v-expand-transition>
      <Select v-model="select" :data="select" v-show="!select.Data.length" />
    </v-expand-transition>

    <!-- Second Order -->
    <v-expand-transition>
      <div v-if="select.Data.length && !Object.keys(DataLicense).length">
        <v-sheet class="mb-6" align="center">
          <h3 class="mb-4">รายงาน ประกาศยอดรับจ่ายเงินและทรัพย์สิน</h3>
          <p>
            {{
              utils.array($store.state.aa_Items, 'code', select.LRcode)
                .description
            }}
            {{
              utils.array(cc_Items.getListsCC(), 'code', select.FRcode)
                .description
            }}
          </p>
        </v-sheet>

        <v-sheet elevation="1" rounded="lg">
          <v-data-table
            v-model:page="page"
            v-model:items-per-page="per"
            :headers="header"
            :items="select.Data"
            @click:row="choose"
            hover
          >
            <template v-slot:[`item.number`]="{ index }">
              {{ (page - 1) * per + index + 1 }}
            </template>
            <template v-slot:[`item.licId`]="{ item }">
              {{ utils.formatLicId(item.licId) }}
            </template>
            <template v-slot:[`item.licDate`]="{ item }">
              {{ utils.formatDateToDDMMYYYY(item.licDate) }}
            </template>
            <template v-slot:[`item.pid`]="{ item }">
              {{ utils.formatPid(item.pid) }}
            </template>
            <template v-slot:[`item.fname`]="{ item }">
              {{ `${item.title} ${item.fname} ${item.lname}` }}
            </template>
            <template v-slot:[`item.recStatus`]="{ item }">
              {{ utils.array(RecStauts_Items, 'value', item.recStatus).title }}
            </template>
          </v-data-table>
        </v-sheet>
      </div>
    </v-expand-transition>

    <!-- Third Order -->
    <!-- <v-expand-transition>
      <v-sheet
        elevation="1"
        rounded="lg"
        v-if="DataAcc.length && !DataAccSet.length"
      >
        <v-data-table
          v-model:page="pageAcc"
          v-model:items-per-page="perAcc"
          :headers="headerAcc"
          :items="DataAcc"
        >
          <template v-slot:[`item.number`]="{ index }">
            {{ (page - 1) * per + index + 1 }}
          </template>
          <template v-slot:[`item.startDate`]="{ item }">
            {{ utils.foramtDateString(item.startDate, true) }} -
            {{ utils.foramtDateString(item.endDate, true) }}
          </template>
          <template v-slot:[`item.action`]="{ item, index }">
            <v-btn color="primary" class="mx-1" @click="chooseAcc(item, index)">
              รายละเอียด
            </v-btn>
          </template>
        </v-data-table>
      </v-sheet>
    </v-expand-transition> -->

    <!-- Fourth Order -->
    <v-expand-transition>
      <div v-if="Object.keys(DataLicense).length">
        <v-sheet class="mx-4 mb-4">
          <v-sheet align="center">
            <h3 class="mb-4">รายงาน ประกาศยอดรับจ่ายเงินและทรัพย์สิน</h3>
            <p class="mb-6">ข้อมูลใบอนุญาตจัดให้มีการเรี่ยไร (แบบ ร.๓)</p>
          </v-sheet>
          <v-sheet>
            <div class="d-flex mb-3">
              ชื่อ - สกุล
              <h4 class="mx-2">
                {{ `${DataLicense.fname} ${DataLicense.lname}` }}
              </h4>
              (ผู้ได้รับอนุญาตจัดให้มีทำการเรี่ยไร)
            </div>
            <div class="d-flex mb-3">
              ใบอนุญาตเลขที่
              <h4 class="mx-2">{{ utils.formatLicId(DataLicense.licId) }}</h4>
            </div>
            <div class="d-flex mb-3">
              จำนวนเงินหรือทรัพท์สินอื่นอย่างสูงที่ขอรับอนุญาตเรี่ยไร
              <h4 class="mx-2">
                {{ DataLicense.reqCollectInfo.maxValueString }}
              </h4>
            </div>
            <div class="d-flex mb-3">
              ภายในเขตและสถานที่
              <h4 class="mx-2">{{ DataLicense.reqCollectInfo.location }}</h4>
            </div>
            <div class="d-flex mb-3">
              วิธีทำการเรี่ยไร
              <h4 class="mx-2">
                {{ DataLicense.reqCollectInfo.collectProcess }}
              </h4>
            </div>
            <div class="d-flex mb-3">
              ตั้งแต่วันที่
              <h4 class="mx-2">
                {{
                  utils.foramtDateString(DataLicense.reqCollectInfo.sdate, true)
                }}
              </h4>
              ถึงวันที่
              <h4 class="mx-2">
                {{
                  utils.foramtDateString(DataLicense.reqCollectInfo.edate, true)
                }}
              </h4>
            </div>
            <div class="d-flex mb-6">
              ระหว่างเวลา
              <h4 class="mx-2">
                {{ utils.time(DataLicense.reqCollectInfo.stime) }}
              </h4>
              ถึงเวลา
              <h4 class="mx-2">
                {{ utils.time(DataLicense.reqCollectInfo.etime) }}
              </h4>
              ในแต่ละวัน
            </div>
            <v-sheet class="d-flex justify-center">
              <h4>สรุปรายรับ - รายจ่ายเงินที่ได้จากการจัดให้มีการเรี่ยไร</h4>
            </v-sheet>
          </v-sheet>
        </v-sheet>

        <v-tabs v-model="tab" color="red" center-active show-arrows grow>
          <v-tooltip
            v-for="(v, index) in DataAcc"
            :key="v"
            :text="`${utils.formatDateToDDMMYYYY(
              v.startDate
            )} - ${utils.formatDateToDDMMYYYY(v.endDate)}`"
            location="bottom"
          >
            <template v-slot:activator="{ props }">
              <v-tab
                :value="index + 1"
                @click="chooseAcc(v, index)"
                v-bind="props"
              >
                {{ `รอบที่ ${index + 1}` }}
              </v-tab>
            </template>
          </v-tooltip>
        </v-tabs>
        <v-sheet align="center">
          <h4 class="my-6">{{ Date }}</h4>
        </v-sheet>
        <v-sheet elevation="1" rounded="lg">
          <v-data-table
            v-model:page="pageAccSet"
            v-model:items-per-page="perAccSet"
            :headers="headerAccSet"
            :items="DataAccSet"
          >
            <template v-slot:[`item.number`]="{ item, index }">
              {{ !item.sum ? (page - 1) * per + index + 1 : '' }}
            </template>
            <template v-slot:[`item.accDetail`]="{ item }">
              <div
                :style="
                  item.sum
                    ? item.sum == 1
                      ? 'color: red;'
                      : 'color: #4169D6'
                    : ''
                "
              >
                {{ item.accDetail }}
              </div>
            </template>
            <template v-slot:[`item.income`]="{ item }">
              <div
                :style="
                  item.sum
                    ? item.sum == 1
                      ? 'color: red;'
                      : 'color: #4169D6'
                    : ''
                "
              >
                {{
                  !item.income
                    ? item.accType == 1
                      ? item.accAmount.toLocaleString()
                      : '-'
                    : item.income.toLocaleString()
                }}
              </div>
            </template>
            <template v-slot:[`item.expenses`]="{ item }">
              <div
                :style="
                  item.sum
                    ? item.sum == 1
                      ? 'color: red;'
                      : 'color: #4169D6'
                    : ''
                "
              >
                {{
                  !item.expenses
                    ? item.accType == 2
                      ? item.accAmount.toLocaleString()
                      : '-'
                    : item.expenses.toLocaleString()
                }}
              </div>
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-btn
                color="secondary"
                @click="photo(item)"
                v-if="!item.sum && item.accPicture"
              >
                ไฟล์เเนบ
              </v-btn>
              <span v-if="!item.sum && !item.accPicture">-</span>
            </template>
          </v-data-table>
        </v-sheet>
        <v-sheet>
          <span class="d-flex align-center mb-2">
            <p>หมายเหตุ : {{ notes }}</p>
          </span>
        </v-sheet>
      </div>
    </v-expand-transition>

    <!-- Footer -->
    <v-slide-y-reverse-transition>
      <v-footer app color="white" class="pa-4" v-if="select.Data.length">
        <v-btn
          rounded
          color="secondary"
          size="large"
          prepend-icon="mdi-printer-outline"
          class="mx-1"
          v-if="DataAccSet.length"
          @click="() => print(DataAccSet)"
        >
          พิมพ์
        </v-btn>
        <v-spacer />
        <v-btn
          rounded
          color="primary"
          size="large"
          class="mx-1"
          prepend-icon="mdi-arrow-left-circle"
          @click="back"
        >
          กลับไปก่อนหน้า
        </v-btn>
      </v-footer>
    </v-slide-y-reverse-transition>
    <PictureDialog v-model="pictureDialog" :picture-base64="pictureBase64" />
  </v-container>
</template>
<script setup>
import Select from './components/Select.vue'
import api from '@/helpers/api'
import * as utils from '@/helpers/utils'
import cc_Items from '@/helpers/itemJson'
import print from '@/prints/Income'
import PictureDialog from '@/views/components/PictureDialog.vue'
</script>
<script>
export default {
  components: {
    PictureDialog,
  },
  data() {
    return {
      tab: 1,
      page: 1,
      per: 10,
      pageAcc: 1,
      perAcc: 10,
      pageAccSet: 1,
      perAccSet: 10,
      Date: null,
      pictureDialog: false,
      pictureBase64: null,
      select: {
        FRcode: null,
        LRcode: null,
        Permissions: null,
        No: null,
        Year: null,
        StartDate: null,
        EndDate: null,
        Data: [],
      },

      header: [
        {
          title: 'ลำดับที่',
          align: 'center',
          key: 'number',
          sortable: false,
        },
        {
          title: 'หมายเลขใบอนุญาต',
          align: 'center',
          key: 'licId',
        },
        {
          title: 'วันที่ออกใบอนุญาต',
          align: 'center',
          key: 'licDate',
        },
        {
          title: 'เลขประจำตัวประชาชน',
          align: 'center',
          key: 'pid',
        },
        {
          title: 'ชื่อ-สกุล',
          align: 'center',
          key: 'fname',
        },
        {
          title: 'สถานะใบอนุญาต',
          align: 'center',
          key: 'recStatus',
        },
      ],

      DataAcc: [],
      headerAcc: [
        {
          title: 'ลำดับ',
          align: 'center',
          key: 'number',
          sortable: false,
          width: '100px',
        },
        {
          title: 'สรุปรายได้-รายจ่ายที่ได้จากการจัดให้มีการเรี่ยไร',
          align: 'start',
          key: 'startDate',
        },
        {
          align: 'end',
          key: 'action',
        },
      ],

      DataAccSet: [],
      DataLicense: [],
      headerAccSet: [
        {
          title: 'ลำดับที่',
          align: 'center',
          key: 'number',
          sortable: false,
          width: '100px',
        },
        {
          title: 'รายการ',
          align: 'center',
          key: 'accDetail',
          sortable: false,
        },
        {
          title: 'รายรับ(บาท)',
          align: 'center',
          key: 'income',
          sortable: false,
        },
        {
          title: 'รายจ่าย(บาท)',
          align: 'center',
          key: 'expenses',
          sortable: false,
        },
        {
          title: 'หลักฐานอ้างอิง',
          align: 'center',
          key: 'action',
          sortable: false,
        },
      ],

      RecStauts_Items: [
        { value: 1, title: 'ผ่านการพิจรณา' },
        { value: 2, title: 'ผ่านการบันทึกลงนาม' },
        { value: 6, title: 'ออกใบแทนแล้ว' },
        { value: 7, title: 'ไม่ลงนาม' },
        { value: 8, title: 'ต่ออายุแล้ว' },
        { value: 9, title: 'ถูกยกเลิกถาวร' },
      ],
    }
  },
  computed: {
    notes() {
      if (this.DataAcc.length) {
        return this.DataAcc[this.tab - 1].notes
      }
      return ''
    },
  },
  methods: {
    async choose(e, row) {
      const v = row.item

      if (this.DataAccSet.length == 0) {
        let getLicense = await api.getLicense(v.licSubreg, v.licRcode, v.licId)
        // let getLicense = await api.getLicense(12, 1301, 256700000007)
        this.DataLicense = getLicense || []
      }

      let getAcc = await api.getAccount(v.licSubreg, v.licRcode, v.licId)
      // let getAcc = await api.getAccount(12, 1301, 256700000007)

      if (getAcc.status === 404) {
        this.$swal({
          icon: 'warning',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่พบข้อมูลรอบรายรับรายจ่าย',
        })
      } else {
        this.DataAcc = getAcc
        this.chooseAcc(this.DataAcc[0], 0)
      }
    },

    async chooseAcc(v, index) {
      let getAccSet = await api.getAccSet(
        v.licSubreg,
        v.licRcode,
        v.licId,
        v.accSet
      )
      this.DataAccSet = getAccSet.rows || []

      if (this.DataAccSet.length > 0) {
        let income = 0
        let expenses = 0
        for (const value of this.DataAccSet) {
          if (value.accType == 1) income = income + value.accAmount
          else expenses = expenses + value.accAmount
        }

        this.DataAccSet.push({
          accDetail: 'รวม',
          income: income,
          expenses: expenses,
          sum: 1,
        })

        let sum = income - expenses
        this.DataAccSet.push({
          accDetail: 'คงเหลือ',
          income: sum,
          sum: 2,
        })
        this.Date = `${utils.foramtDateString(
          v.startDate,
          true
        )} - ${utils.foramtDateString(v.endDate, true)}`

        this.tab = index + 1
      }
    },

    async photo(v) {
      console.log(
        await api.getPhoto(v.licSubreg, v.licRcode, v.licId, v.accSet, v.accNo)
      )
      try {
        const response = await api.getPhoto(
          v.licSubreg,
          v.licRcode,
          v.licId,
          v.accSet,
          v.accNo
        )
        if (response.accPicture.startsWith('data:image')) {
          this.pictureBase64 = response.accPicture
          this.pictureDialog = true
        } else {
          window.sessionStorage.setItem('fileBase64', response.accPicture)
          window.open('/pdf')
        }
      } catch (error) {
        console.error('Error fetching getPhoto:', error)
      }
    },

    back() {
      // if (this.select.Data && !this.DataAcc.length) {
      //   this.select.Data = []
      // } else if (this.DataAcc.length && !this.DataAccSet.length) {
      //   this.DataAcc = []
      // } else {
      //   this.DataAccSet = []
      //   this.DataLicense = []
      // }
      if (this.select.Data && !Object.keys(this.DataLicense).length) {
        this.select.Data = []
      } else if (Object.keys(this.DataLicense).length && !this.DataAcc.length) {
        this.DataLicense = []
      } else {
        this.DataAcc = []
        this.DataAccSet = []
        this.DataLicense = []
      }
    },
  },
}
</script>
