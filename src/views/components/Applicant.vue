<template>
  <v-sheet class="my-6" elevation="1">
    <v-tabs v-model="tab" color="red" grow>
      <v-tab :value="1">ผู้ยืนคำขอ</v-tab>
      <v-tab :value="2">แบบคำขอ</v-tab>
      <v-tab :value="3">ภาพถ่าย</v-tab>
      <v-tab
        :value="4"
        v-if="['signedLicense', 'distributeLicense'].includes($route.name)"
      >
        บันทึกผลการลงนาม
      </v-tab>
    </v-tabs>
    <v-divider />
    {{ request }}
    <v-sheet class="px-4" min-height="300px">
      <v-window v-model="tab">
        <v-window-item :value="1" class="py-6 ma-n6">
          <Requestor
            v-model="request"
            :listApplicant="[1, 2]"
            :listGrantFlag="[1, 2, 3, 4, 5]"
            :listIdentify="[0, 1, 2]"
            :businessGrant="true"
            :readonly="false"
          />
        </v-window-item>

        <v-window-item :value="2" class="py-6">
          <v-row>
            <v-col
              class="d-flex d-flex flex-wrap"
              cols="12"
              sm="6"
              md="8"
              lg="4"
            >
              <p class="mr-4 mt-2">คำขอเลขที่</p>
              <v-text-field
                class="mr-4"
                variant="outlined"
                density="compact"
                append-icon="mdi-slash-forward"
                hide-details="auto"
              />
              <v-text-field
                variant="outlined"
                density="compact"
                hide-details="auto"
              />
            </v-col>
          </v-row>
          <v-divider class="my-6" />
          <v-row>
            <v-col cols="12" sm="4" md="3">
              <v-text-field
                label="เขียนที่"
                variant="outlined"
                density="compact"
                hide-details="auto"
              />
            </v-col>
            <v-spacer />
            <v-col cols="12" sm="6" md="3">
              <DatePicker
                label="วันที่"
                density="compact"
                variant="outlined"
                hide-details
              />
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                density="compact"
                variant="underlined"
                hide-details
                readonly
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex flex-wrap" cols="12">
              <p class="mt-2 mr-3">ยื่นคำขอต่อพนักงานเจ้าหน้าที่ :</p>
              <v-radio-group hide-details="auto" :inline="!$vuetify.display.xs">
                <v-radio class="mr-2" :value="1" label="กรุงเทพมหานคร" />
                <v-sheet class="d-flex flex-wrap">
                  <v-radio class="mr-2" :value="2" label="อำเภอ" />
                  <v-sheet class="ml-3" width="400px" min-width="100px">
                    <v-text-field
                      label="จังหวัด"
                      variant="outlined"
                      density="compact"
                      hide-details="auto"
                    />
                  </v-sheet>
                </v-sheet>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex flex-wrap" cols="12">
              <p class="mt-2 mr-3">ซึ่งผู้ขออนุญาตจัดให้มีการเรี่ยไร :</p>
              <v-radio-group :inline="!$vuetify.display.xs">
                <v-radio
                  class="mr-2"
                  :value="1"
                  label="เคยได้รับอนุญาตมาแล้ว"
                />
                <v-radio
                  class="mr-2"
                  :value="2"
                  label="ยังไม่เคยได้รับอนุญาต"
                />
              </v-radio-group>
            </v-col>
          </v-row>
          <v-textarea
            label="มีวัตถุประสงค์เพื่อ"
            variant="outlined"
            auto-grow
          />
          <v-textarea
            label="เป็นจำนวนเงินหรือทรัพย์สินอื่นอย่างสูงที่ขออนุญาตเรี่ยไร"
            variant="outlined"
            auto-grow
            hide-details="auto"
          />
          <v-divider class="my-6" />
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-text-field
                label="สถานที่ที่จะทำการเรี่ยไร"
                variant="outlined"
                density="compact"
                hide-details="auto"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-text-field
                label="ตั้งแต่วันที่"
                variant="outlined"
                density="compact"
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-text-field
                label="ถึงวันที่"
                variant="outlined"
                density="compact"
                hide-details="auto"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex" cols="12" sm="6" lg="4">
              <v-text-field
                label="ระหว่างเวลา"
                type="number"
                max="24"
                min="0"
                variant="outlined"
                density="compact"
                rounded="0 s"
                suffix="นาฬิกา"
                hide-details="auto"
              />
              <v-text-field
                type="number"
                max="60"
                min="0"
                variant="outlined"
                density="compact"
                rounded="0 e"
                suffix="นาที"
                hide-details="auto"
              />
            </v-col>
            <v-col class="d-flex" cols="12" sm="6" lg="4">
              <v-text-field
                label="ถึงเวลา"
                type="number"
                max="24"
                min="0"
                variant="outlined"
                density="compact"
                rounded="0 s"
                suffix="นาฬิกา"
                hide-details="auto"
              />
              <v-text-field
                type="number"
                max="60"
                min="0"
                variant="outlined"
                density="compact"
                rounded="0 e"
                suffix="นาที"
                hide-details="auto"
              />
            </v-col>
          </v-row>
          <v-textarea
            label="วิธีเก็บรักษาและทำบัญชีเงินหรือทรัพย์สินที่เรี่ยไรได้"
            class="mt-6"
            variant="outlined"
            auto-grow
          />
          <v-textarea label="วิธีทำการเรี่ยไร" variant="outlined" auto-grow />
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-text-field
                label="เจ้าพนักงาน"
                variant="outlined"
                density="compact"
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-text-field
                label="ตำแหน่ง"
                variant="outlined"
                density="compact"
                hide-details="auto"
              />
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item :value="3" class="py-6">
          <v-sheet align="center">
            <h3>รูปภาพของผู้ได้รับอนุญาต</h3>
            <v-img
              class="mt-4"
              width="300"
              height="400"
              cover
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            ></v-img>
          </v-sheet>
        </v-window-item>

        <v-window-item :value="4" class="py-6">
          <v-sheet class="pa-4" color="app-color">
            <h3>บันทึกผลการลงนาม</h3>
          </v-sheet>
          <v-sheet class="pa-4">
            <h4 class="head">รายการใบอนุญาต</h4>
            <v-row>
              <v-col cols="12" md="4" lg="3">
                <v-text-field
                  label="ใบอนุญาตเลขที่"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </v-col>
              <v-spacer />
              <v-col cols="12" sm="6" md="3">
                <DatePicker
                  label="วันที่"
                  density="compact"
                  variant="outlined"
                  hide-details
                />
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  density="compact"
                  variant="underlined"
                  hide-details
                  readonly
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="ผู้รับใบอนุญาต"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="ชื่อสถานที่ประกอบอาชีพ"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </v-col>
            </v-row>
            <v-divider class="my-6" />
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <DatePicker
                  label="วันที่"
                  density="compact"
                  variant="outlined"
                  hide-details
                />
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
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
                  label="ผู้ลงนาม"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="ตำแหน่ง"
                  variant="outlined"
                  density="compact"
                  hide-details="auto"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex justify-end">
                <v-btn
                  rounded
                  color="primary"
                  size="large"
                  prepend-icon="mdi-content-save-outline"
                  class="mx-1"
                >
                  บันทึกผลการลงนาม
                </v-btn>
              </v-col>
            </v-row>
          </v-sheet>
        </v-window-item>
      </v-window>
    </v-sheet>
  </v-sheet>
</template>
<script>
export default {
  props: {
    data: {},
  },

  data() {
    return {
      tab: 1,
      value: {
        test: null,
        test2: null,
      },
      request: { applicantType: 2, business: {}, requestor: [] },
    }
  },

  mounted() {
    this.value = this.data
  },
}
</script>
<style scoped>
.head {
  border-left: 3px solid #ef5350;
  padding-left: 5px;
  margin-bottom: 16px;
}
</style>
