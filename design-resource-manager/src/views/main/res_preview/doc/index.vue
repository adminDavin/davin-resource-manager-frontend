<template>
  <div
    style="
      font-size: var(--el-font-size-large);
      font-weight: bolder;
      text-align: center;
    "
    v-if="resInfo"
  >
    <iframe frameborder="0" width="100%" height="800px" :src="fileUrl"></iframe>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { officeOnlineShow, previewUrl } from "@/config/index";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const resInfo = ref();
    const fileUrl = ref();
    onMounted(() => {
      resInfo.value = route.query;
      
      let url = `${officeOnlineShow}${previewUrl}?resInfoCode=${resInfo.value.resInfoCode}`;
      console.log(resInfo.value.resContentType);
      fileUrl.value = url;
    });
    return {
      resInfo,
      fileUrl
    };
  },
});
</script>
