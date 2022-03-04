<template>
  <el-container>
    <!-- <el-aside width="150">
      <Header ref="header"></Header>
    </el-aside> -->
    <el-main>
      <div style="text-align: center; margin: 10px;" v-if="resInfo">
        <el-button type="text" @click="downloadFile(resInfo)">{{ resInfo.resInfoName }}</el-button>
      </div> 
      <router-view></router-view>
    </el-main>
    <el-dialog v-model="dialogTableVisible" title="文件下载中">
      <el-progress
              :percentage="percentage"
      ></el-progress>
  </el-dialog>
  </el-container>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import d_const from "@/views/main/design_resource/constants";
import rResInfo from "@/views/main/design_resource/r_res_info";
import { officeOnlineShow, previewUrl } from "@/config/index";
import Header from "./Header.vue";
import { fixedData } from "@/views/main/design_resource/ResInfoDataFixed";
import { judgeRoute } from './JudgeRoute';
import {singleCommonOperate} from '@/views/main/design_resource/r_show_res_info/SingleOperateResInfo';

export default defineComponent({
  components: {
    Header,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const resInfo = ref();
    const header: Ref = ref();
    const dialogTableVisible = ref(false);
    const percentage = ref(0);
    const downloadFile = (res: any) => {
      dialogTableVisible.value = true;
      percentage.value = 0;
      singleCommonOperate("download", res, null, null, () => {
        percentage.value = percentage.value + 1
      });
    }
    onMounted(() => {
      resInfo.value = route.query;
      if (!resInfo.value.resInfoCode) {
        router.push({
          path: "/res_preview/others",
          query: resInfo.value,
        });
      }

      rResInfo.shareResInfo(resInfo.value.resInfoCode, resInfo, (res: any) => {
        let ress = fixedData([res]);
        res = ress[0]
        header.value?.init(res);
        judgeRoute(router, res);
      });
    });
    return {
      resInfo,
      header,
      dialogTableVisible,
      percentage,
      downloadFile,
    };
  },
});
</script>
