<template>
  <div
    style="
      font-size: var(--el-font-size-large);
      font-weight: bolder;
      text-align: center;
      margin-top: 50px;
    "
    v-if="resInfo"
  >
    
    抱歉!
    <div>文件: {{ resInfo.resInfoName }}的格式: {{ resInfo.resContentType }} </div>
    该文件格式{{ resInfo.resContentType }}暂不支持预览，研发正在努力更新中
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const resInfo = ref();
    onMounted(() => {
      resInfo.value = route.query;
      console.log(resInfo.value.resContentType);
    });
    return {
      resInfo,
    };
  },
});
</script>
