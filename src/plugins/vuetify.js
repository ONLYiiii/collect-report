import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'
import * as Facade from 'vue-input-facade'
import { th, en } from 'vuetify/locale'

export default createVuetify({
  directives: {
    mask: Facade.facade,
  },
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  VBtn: {
    style: 'text-transform: none;',
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: colors.blue.darken2,
          secondary: colors.grey.darken3,
          'app-color': process.env.APP_COLOR,
        },
      },
    },
  },
  locale: {
    locale: 'th',
    fallback: 'th',
    messages: { th, en },
  },
})
