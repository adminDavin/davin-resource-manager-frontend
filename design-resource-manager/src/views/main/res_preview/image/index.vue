<template>
  <div style="text-align: center">
    <el-image :src="filePreviewUrl"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const resInfo = ref();
    const filePreviewUrl = ref();
    onMounted(() => {
      resInfo.value = route.query;
      console.log(resInfo.value.resContentType);
      filePreviewUrl.value = "/api/res_m/res_info/preview?resInfoStore=" + resInfo.value.resInfoStore;
    });
    return {
      resInfo,
      filePreviewUrl
    };
  },
});
</script>
