<template>
  <div ref="threeDxfRender">
    <!-- <DxfViewer :dxfUrl="filePreviewUrl"></DxfViewer> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import rResInfo from "@/views/main/design_resource/r_res_info";
import DxfViewer from "./DxfViewer.vue";

export default defineComponent({
  components: {
    DxfViewer
  },
  setup() {
    const route = useRoute();
    const resInfo = ref();
    const filePreviewUrl = ref();
    const threeDxfRender = ref();

    onMounted(() => {
      resInfo.value = route.query;
      // rResInfo.previewResInfo(resInfo.value.resInfoCode, (res: any) => {
      //     console.log(res.data);
      //     var parser = new window.DxfParser();
      // });
      // ThreeDxf.Viewer();
      filePreviewUrl.value =
        "/api/res_m/res_info/preview?resInfoCode=" + resInfo.value.resInfoCode;
    });
    return {
      resInfo,
      filePreviewUrl,
      threeDxfRender
    };
  },
});
</script>
