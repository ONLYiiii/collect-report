<template>
  <v-container class="mx-2" fluid>
    <v-expand-transition>
      <Select v-model="select" :data="select" v-show="!select.Check" />
    </v-expand-transition>

    <v-expand-transition>
      <v-sheet elevation="1" v-if="select.Check">
        <v-sheet
          style="position: sticky; z-index: 2"
          :style="$vuetify.display.mdAndDown ? `top: 45px;` : `top: 114px;`"
        >
          <v-tabs v-model="tab" color="red" grow>
            <v-tab :value="1" selected-class="bg-app-color" border>
              ผู้ยื่นคำขอ
            </v-tab>
            <v-tab :value="2" selected-class="bg-app-color" border>
              รายละเอียดใบอนุญาต
            </v-tab>
            <v-tab :value="3" selected-class="bg-app-color" v-if="false" border>
              ภาพถ่าย
            </v-tab>
            <v-tab :value="4" selected-class="bg-app-color" border>
              บันทึกผลการลงนาม
            </v-tab>
          </v-tabs>
        </v-sheet>
        <v-divider />
        <v-sheet class="py-4 px-6">
          <v-scroll-x-transition>
            <div v-show="tab == 1" class="py-6 ma-n6">
              <Requestor
                v-model="request"
                :listGrantFlag="[1, 2, 3, 4, 5]"
                :listIdentify="[0, 1, 2]"
                :readonly="Saved"
              />
            </div>
          </v-scroll-x-transition>

          <v-scroll-x-transition>
            <div v-show="tab == 2" class="py-6">
              <LicenseDetail v-model="v" :data="v" />
            </div>
          </v-scroll-x-transition>

          <v-scroll-x-transition>
            <div v-show="tab == 3" class="py-6">
              <v-sheet align="center">
                <h2 class="mb-3">รูปภาพของผู้ได้รับอนุญาต</h2>
                <Image />
              </v-sheet>
            </div>
          </v-scroll-x-transition>

          <v-scroll-x-transition>
            <v-form ref="sign" v-show="tab == 4" class="py-6">
              <v-sheet>
                <v-row>
                  <v-col cols="12" sm="6" md="3">
                    <DatePicker
                      v-model="SignDate"
                      label="วันที่"
                      density="compact"
                      variant="outlined"
                      @update:model-value="
                        SignDateS = utils.foramtDateString(SignDate)
                      "
                      :rules="require"
                      :readonly="Saved"
                      hide-details
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="SignDateS"
                      density="compact"
                      variant="underlined"
                      hide-details
                      readonly
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete
                      v-model="SignName"
                      label="ผู้ลงนาม"
                      :items="v.Sign_Items"
                      item-title="empFname"
                      :rules="require"
                      variant="outlined"
                      density="compact"
                      hide-details="auto"
                      :readonly="Saved"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="SignPosition"
                      :rules="require"
                      label="ตำแหน่ง"
                      variant="outlined"
                      density="compact"
                      hide-details="auto"
                      :readonly="Saved"
                    />
                  </v-col>
                </v-row>
              </v-sheet>
            </v-form>
          </v-scroll-x-transition>
        </v-sheet>
      </v-sheet>
    </v-expand-transition>

    <v-slide-y-reverse-transition>
      <v-footer app color="white" class="pa-4" v-if="select.Check">
        <v-spacer />
        <v-btn
          rounded
          color="primary"
          size="large"
          prepend-icon="mdi-content-save-outline"
          class="mx-1"
          @click="save"
          v-if="!Saved"
        >
          บันทึก
        </v-btn>
        <v-btn
          rounded
          :color="!Saved ? 'red' : 'primary'"
          size="large"
          class="mx-1"
          :prepend-icon="!Saved ? 'mdi-close-circle-outline' : 'mdi-reload'"
          @click="cancel"
        >
          {{ !Saved ? 'ยกเลิก' : 'เริ่มรายการใหม่' }}
        </v-btn>
      </v-footer>
    </v-slide-y-reverse-transition>
  </v-container>
</template>
<script setup>
import Select from './components/Select.vue'
import LicenseDetail from './components/LicenseDetail.vue'
import Image from '@/components/Image.vue'
import api from '@/helpers/api'
import * as utils from '@/helpers/utils'
</script>
<script>
export default {
  data() {
    return {
      Saved: false,
      tab: 1,
      select: {
        FRcode: null,
        LRcode: null,
        Section: null,
        Permissions: null,
        Check: false,
        No: null,
        Year: null,
      },

      request: {
        applicantType: 2,
        business: {
          keyword: '',
          busId: null,
          busRegNo: '',
          busName: null,
          busType: null,
          busRegister: '',
          establishDate: '0',
          hid: '',
          hno: '',
          mm: null,
          buildingName: '',
          floor: '',
          village: '',
          trok: '',
          soi: '',
          thanon: '',
          cc: null,
          aa: null,
          tt: null,
          hrcode: null,
          postCode: '',
          telNo: '',
          faxNo: '',
          email: '',
        },
        requestor: [
          {
            recSeq: null,
            committeeType: '',
            pid: '',
            identifyDoctype: 0,
            identifyDocid: '',
            title: null,
            fname: '',
            mname: '',
            lname: '',
            age: '',
            sex: null,
            dob: null,
            nat: null,
            race: null,
            religion: null,
            occu: null,
            income: '',
            faname: '',
            maname: '',
            hid: '',
            hno: '',
            mm: null,
            buildingName: '',
            floor: '',
            village: '',
            trok: '',
            soi: '',
            thanon: '',
            cc: null,
            aa: null,
            tt: null,
            hrcode: null,
            postCode: '',
            telNo: '',
            faxNo: '',
            mobileNo: '',
            identifyDocissue: null,
            identifyCc: null,
            identifyAa: null,
            grantFlag: 0,
            grantPid: '',
            grantIdentifyDoctype: null,
            grantIdentifyDocid: '',
            grantFlname: '',
            rcodeDescription: '',
            rcodeCcDescription: '',
            ccDescription: '',
            aaDescription: '',
          },
        ],
      },

      v: {
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
        Validate: false,

        Section: null,
        Saved: false,
      },

      SignDate: null,
      SignDateS: null,
      SignPid: null,
      SignName: null,
      SignPosition: null,

      require: [(v) => !!v || 'โปรดกรอกข้อมูล'],
    }
  },

  methods: {
    async save() {
      this.v.CheckValid = true
      const self = this
      setTimeout(async () => {
        if (!(await self.$refs.sign.validate()).valid) {
          self.$swal({
            icon: 'warning',
            text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
          })
          self.tab = 4
        } else if (!self.v.Validate) {
          self.$swal({
            icon: 'warning',
            text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
          })
          self.tab = 2
        } else if (
          !this.request.requestor[0].fname ||
          !this.request.requestor[0].pid
        ) {
          self.$swal({
            icon: 'warning',
            text: 'กรุณาค้นหาผู้ยื่นคำขอ',
          })
          self.tab = 1
        } else {
          self.data()
        }
      }, 50)
    },

    async data() {
      const data = {
        eLicInfo: {
          licSubreg: Number(`${this.select.Permissions}${this.select.Section}`),
          licRcode:
            this.v.RqWrAt == '0083' ? `0083` : `${this.v.RqCC}${this.v.RqWrAt}`,
          licId: `${this.v.Year}${this.v.No.padStart(8, '0')}`,
          licDate: Number(utils.formatYYYYMMDD(this.v.LicDate)),
          issueDate: 0,
          expireDate: 0,
          applicantType: Number(this.request.applicantType),
          busId: Number(this.request.business.busId) || 0,
          busRegno: this.request.business.busRegNo || ' ',
          busName: this.request.business.busName || ' ',
          pid: Number(this.request.requestor[0].pid.replaceAll('-', '')),
          identifyDoctype: Number(this.request.requestor[0].identifyDoctype),
          identifyDocid: this.request.requestor[0].identifyDocid || ' ',
          title: Number(this.request.requestor[0].title),
          fname: this.request.requestor[0].fname,
          mname: this.request.requestor[0].mname || ' ',
          lname: this.request.requestor[0].lname,
          sex: Number(this.request.requestor[0].sex),
          dateOfBirth: Number(
            utils.formatYYYYMMDD(this.request.requestor[0].dob)
          ),
          age: Number(this.request.requestor[0].age),
          nat: Number(this.request.requestor[0].nat),
          race: Number(this.request.requestor[0].race),
          hid: Number(this.request.requestor[0].hid) || 0,
          hrCode: this.request.requestor[0].hrcode || ' ',
          ccaattmm: Number(
            `${this.request.requestor[0].cc}${this.request.requestor[0].aa}${this.request.requestor[0].tt}`
          ),
          hno: this.request.requestor[0].hno || ' ',
          trok: this.request.requestor[0].trok || ' ',
          soi: this.request.requestor[0].soi || ' ',
          thanon: this.request.requestor[0].thanon || ' ',
          approveNo: ' ',
          approveDate: 0,
          signDate: utils.formatYYYYMMDD(this.SignDate) || ' ',
          signTitle: ' ',
          signTitleFlag: 0,
          signPid: Number(this.SignPid) || 0,
          signName: this.SignName || ' ',
          signPosition: this.SignPosition || ' ',
          signPicPart1: ' ',
          signPicPart2: ' ',
          dateStatus: (await api.getDate()).date,
          imgFlag: 2,
          printPage: 1,
          qrcodeSeq: 0,
          licFee: 0,
          remark: ' ',
          cancelCode: 0,
          cancelDate: 0,
          cancelCause: ' ',
          uncancelDate: 0,
          uncancelCause: ' ',
          cancelRqId: 0,
          cancelEmp: 0,
          postCode: Number(this.request.requestor[0].postCode) || 0,
          telNo: this.request.requestor[0].telNo || ' ',
          signPid2: 0,
          signTitleFlag2: 0,
        },
        collectLic: {
          orgSubtypeCode: 0,
          orgRcode: ' ',
          orgId: ' ',
          pidPicture: ' ',
        },
        collectReqInfo: {
          reflcRcode: ' ',
          reflcId: '0',
          reflcStatus: 0,
          rqWrAt: utils.array(this.$store.state.aa_Items, 'code', this.v.RqWrAt)
            .description,
          appealFlag: 0,
          orgSubtypeCode: 0,
          orgRcode: ' ',
          orgId: ' ',
          objectiveFlag: this.v.ObjectiveFlag,
          objective: this.v.Objective || ' ',
          pidPicture: ' ',
          licHis: this.v.LicHis,
          maxValue: Number(this.v.MaxValue.replaceAll(',', '')),
          rcodeLocation: ' ',
          location: this.v.Location,
          locationMap: ' ',
          sdate: Number(utils.formatYYYYMMDD(this.v.Sdate)),
          edate: Number(utils.formatYYYYMMDD(this.v.Edate)),
          stime: Number(`${this.v.StimeH}${this.v.StimeM}00`),
          etime: Number(`${this.v.EtimeH}${this.v.EtimeM}00`),
          collectTypeFlag: this.v.CollectTypeFlag,
          collectType: this.v.CollectType || ' ',
          collectProcessFlag: this.v.CollectProcessFlag,
          collectProcess: this.v.CollectProcess || ' ',
          reflcDate: 0,
          maxValueString: this.v.MaxValueString || ' ',
          mPosition: this.v.EmpPosition,
          accountPlan: ' ',
          locationCat: Number(
            `${this.v.LocationC || ' '}${this.v.LocationA || ''}${
              this.v.LocationT || ''
            }`
          ),
          lat: this.v.SiteLatitude || ' ',
          long: this.v.SiteLongtitude || ' ',
        },
      }

      const status = await api.importCollect(data)
      if (status.status == 201) {
        this.$swal({
          icon: 'success',
          title: 'เสร็จสิ้น',
          text: 'บันทึกใบอนุญาตเสร็จสิ้น',
        })
        this.Saved = true
        this.v.Saved = true
      } else {
        this.$swal({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถบันทึกใบอนุญาตได้',
        })
      }
    },

    cancel() {
      if (this.Saved) {
        this.select.No = null
        this.select.Year = null
      }

      this.$refs.sign.reset()
      this.v = this.$options.data().v
      this.request = this.$options.data().request

      this.tab = 1
      const self = this
      setTimeout(() => {
        self.select.Check = false
      }, 0)
    },
  },

  watch: {
    'select.Check'(v) {
      if (v) {
        this.Saved = false
        this.v.No = this.select.No
        this.v.Year = this.select.Year
        this.v.RqWrAt = this.select.LRcode
        this.v.RqCC = this.select.FRcode
        this.v.EmpName = this.$store.state.Officer.name
        this.v.EmpPosition = this.$store.state.Officer.position

        this.v.Section = this.select.Section
      }
    },

    SignName(v) {
      if (v) {
        const emp = utils.array(this.v.Sign_Items, 'empFname', v)
        this.SignPid = emp.empPid
        this.SignPosition = emp.empPost
      }
    },
  },
}
</script>
