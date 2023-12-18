import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', //  use `--host` to expose
    port: 8080,
    open: true,
    hmr: true
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
  define:{
    'process.env': {
      'BASE_API':"http://localhost:8089"
    }
  }
})
