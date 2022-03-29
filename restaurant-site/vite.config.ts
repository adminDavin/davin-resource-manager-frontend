import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

const pathResolve = (dir: string): any => resolve(__dirname, ".", dir);

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      '@': pathResolve("./src"),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  css: {
    preprocessorOptions: {
       less: {
         modifyVars: {
           hack: `true; @import (reference) "${resolve('src/assets/styles/base.less')}";`,
         },
         javascriptEnabled: true
       }
    }
  },
  server: {
    proxy: { // 代理配置
      '/api': {
        // target: "http://localhost:11205",
        target: "http://160.251.123.93:8086/",
        ws: false,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
  },
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) { // 分包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})
