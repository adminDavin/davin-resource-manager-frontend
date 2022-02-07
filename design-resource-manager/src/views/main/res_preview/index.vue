<template>
  <div style="margin: 5px">
      <div style="text-align: end">
        <el-button size="small">下载文件</el-button>
      </div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import d_const from '@/views/main/design_resource/constants';

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const resInfo = ref();
    onMounted(() => {
        resInfo.value = route.query;
        let resType = d_const.getResourceType(resInfo.value.resContentType);
        router.push({path: '/res_preview/' + resType.key, query: resInfo.value });
    });
    return {
        resInfo
    };
  },
});
</script>
