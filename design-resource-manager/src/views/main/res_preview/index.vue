<template>
  <div style="text-align: start; margin: 5px" v-if="resInfo">
    <el-button size="small">下载文件</el-button>
    <el-button type="text">{{ resInfo.resInfoName }}</el-button>
  </div>
  <!-- {{resInfo}} -->
  <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import d_const from "@/views/main/design_resource/constants";
import rResInfo from "@/views/main/design_resource/r_res_info";
import { officeOnlineShow, previewUrl } from "@/config/index";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const resInfo = ref();

    onMounted(() => {
      resInfo.value = route.query;
      let resType = d_const.getResourceType(resInfo.value.resInfoCode);
      rResInfo.getResInfo(resInfo.value.resInfoCode, resInfo, (res: any) => {
        if (d_const.resourceTypes[3].rTypes.indexOf(res.resContentType) > -1) {
          let url = `${officeOnlineShow}${previewUrl}?resInfoCode=${res.resInfoCode}`;
          window.open(url);
        } else if (
          d_const.resourceTypes[2].rTypes.indexOf(res.resContentType) > -1
        ) {
          router.push({ path: "/res_preview/text", query: resInfo.value });
        } else {
          router.push({
            path: "/res_preview/others",
            query: resInfo.value,
          });
        }
      });
    });
    return {
      resInfo,
    };
  },
});
</script>
