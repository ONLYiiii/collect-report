import vuetify from './vuetify'
import router from '../router'
import './axios.js'
import './pdfmake-style.js'
import DatePicker from '@cdglib/vue3-datepicker'
import Requestor from '@cdglib/ilab-requestor'
import DocumentsView from '@cdglib/ilab-documents'
import MapLatLong from '@cdglib/vue3-map'
import { createPinia } from 'pinia'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import Vidle from 'v-idle-3'
const options = {
  confirmButtonColor: '#1976D2',
  confirmButtonText: 'ตกลง',
  cancelButtonText: 'ยกเลิก',
}
const pinia = createPinia()

export function registerPlugins(app) {
  app.use(vuetify)
  app.use(router)
  app.use(pinia)
  app.use(VueSweetalert2, options)
  app.use(DatePicker)
  app.use(Requestor)
  app.use(DocumentsView)
  app.use(Vidle)
  app.use(MapLatLong)
}
