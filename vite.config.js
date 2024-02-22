// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
  ],
  define: {
    'process.env': {
      VERSION: require('./package.json').version,
      APP_SYSTEM: 'ระบบทะเบียนเรี่ยไร',
      APP_COLOR: '#EF5350',
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  base: './',
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://dopa-iservice.dopa.go.th',
        changeOrigin: true,
      },
    },
  },
})
