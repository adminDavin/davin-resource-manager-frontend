import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import copy from 'rollup-plugin-copy';
import { resolve } from 'path';

const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      '@': pathResolve("./src"),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  server: {
    proxy: { // 代理配置
      '/api': {
        target: "https://to0-ai.com",
        ws: false,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
  },
  
  plugins: [vue(),
  // copy({
  //   targets: [
  //     { src: './public/WW_verify_9PkI9rwGg36Volpv.txt', dest: './WW_verify_9PkI9rwGg36Volpv.txt' }, //执行拷贝
  //   ]
  // })
  ],
  build: {
    // terserOptions:{
    //     compress:{
    //         drop_console:true // 移除console 再生产环境
    //     }
    // },
    // outDir:'public',
    // assetsDir: "static",
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
