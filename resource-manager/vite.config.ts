import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  resolve: {
    alias: {
      '@': pathResolve("./src"),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  server: {
    proxy: { // 代理配置
      '/api': {
        target: "http://localhost:11200",
        ws: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/qywx': {
        target: "https://qyapi.weixin.qq.com",
        ws: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/qywx/, '')
      },
      '/wx': {
        target: "https://open.weixin.qq.com",
        ws: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wx/, '')
      }
    },
  },
  plugins: [vue()]
})
