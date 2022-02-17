<template>
  <embed :src="filePreviewUrl" width="100%" height="800px"/>
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
      filePreviewUrl.value = "/pdfjs-2.12.313-dist/web/viewer.html?file=/api/res_m/res_info/preview?resInfoCode=" + resInfo.value.resInfoCode;
    });
    return {
      resInfo,
      filePreviewUrl
    };
  },
});
</script>
