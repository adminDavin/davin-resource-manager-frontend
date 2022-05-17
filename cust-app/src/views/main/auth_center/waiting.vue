<template>
    <div class="container">
      正在登录中,  请稍等
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter, useRoute, RouteLocationRaw } from 'vue-router';
  import browser_utils from '@/utils/browser_utils';
  import c_alert from '@/utils/alert_utils';
  
  export default defineComponent({
    setup() {
      const store = useStore();
      const router = useRouter();
      const route = useRoute();
      onMounted(() => {
        let params = browser_utils.queryParams(document.location.toString(), true); 
        
        if (!browser_utils.isEmpty(params['code'])) {
        store.dispatch('user/login', {
          name: "QYWX:" + params['code'],
          password: "123456"
          }
        )
        .then(async () => {
          c_alert.c_alert_s('登录成功', 'success', true, 1000);
          await router.push(route.query.redirect as RouteLocationRaw || '/dashboard');
        }).catch(
          () => {
            router.push('/login');
          }
        );
      }
      });
  
      return {
      }
    }
  })
  </script>
  <style lang="scss" scoped>
  </style>
  