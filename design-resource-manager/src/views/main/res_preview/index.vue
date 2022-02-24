<template>
  <div style="text-align: center; margin: 5px；" v-if="resInfo">
    <el-button type="text">{{ resInfo.resInfoName }}</el-button>
    <el-button size="small">下载文件</el-button>
  </div>
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
      if (!resInfo.value.resInfoCode) {
        router.push({
          path: "/res_preview/others",
          query: resInfo.value,
        });
      }
      rResInfo.shareResInfo(resInfo.value.resInfoCode, resInfo, (res: any) => {
        if (d_const.resourceTypes[3].rTypes.indexOf(res.resContentType) > -1) {
          router.push({ path: "/res_preview/doc", query: resInfo.value });
        } else if (
          d_const.resourceTypes[2].rTypes.indexOf(res.resContentType) > -1
        ) {
          router.push({ path: "/res_preview/text", query: resInfo.value });
        } else {
          var fileExtension = resInfo.value.resInfoName.split('.').pop().toLowerCase();
          if (fileExtension == 'ppt' || fileExtension == 'pptx') {
            router.push({ path: "/res_preview/doc", query: resInfo.value });
          } else if (fileExtension == 'pdf') {
            router.push({ path: "/res_preview/pdf", query: resInfo.value });
          } else {
            router.push({
            path: "/res_preview/others",
            query: resInfo.value,
          });
          }
        }
      });
    });
    return {
      resInfo,
    };
  },
});
</script>
