<template>
  <div v-if="resInfo">
    <el-button
      type="text"
      size="small"
      @click="enterDetail(resInfo, 'download')"
      ><text v-if="resInfo.resInfoType == 'folder'">进入</text
      ><text v-else>下载</text>
    </el-button>
    <el-button
      v-if="resInfo.resInfoType == 'file'"
      type="text"
      size="small"
      @click="enterDetail(resInfo, 'preview')"
      >预览</el-button
    >
    <el-button type="text" size="small" @click="enterDetail(resInfo, 'rename')"
      >重命名</el-button
    >
    <!-- <el-button type="text" size="small" @click="enterDetail(resInfo, 'move')"
      >移动</el-button
    > -->
    <el-button type="text" size="small" @click="enterDetail(resInfo, 'delete')"
      >删除</el-button
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import rResInfo from "../r_res_info";
import { useRouter, useRoute } from "vue-router";
import { officeOnlineShow, previewUrl } from '@/config/index';
import constants from '../constants';


export default defineComponent({
  props: {
    resInfo: Object,
  },
  setup() {
    const router = useRouter();
    const refreshResInfos: any = inject("refreshResInfos");
    const changeSelectedInfo: any = inject("changeSelectedInfo");

    const enterDetail = (resInfo: any, action: string) => {
      if (action == "download") {
        if (resInfo.resInfoType == "folder") {
          changeSelectedInfo(resInfo, "enter");
        } else {
          rResInfo.downloadResInfo(resInfo.resInfoStore, resInfo.resInfoName);
        }
      } else if (action == "delete") {
        rResInfo.delete(resInfo.resInfoCode, () => refreshResInfos());
      } else if (action == "preview") {
        
          if (constants.resourceTypes[3].rTypes.indexOf(resInfo.resContentType) > -1) {
            let url = `${officeOnlineShow}${previewUrl}${resInfo.resInfoStore}`
            window.open(url);
          } else {

            // alert(`${resInfo.resContentType}文件不支持预览`);
            const { href } = router.resolve({
              path: "/res_preview",
              query: {
                resInfoStore: resInfo.resInfoStore,
                resInfoName: resInfo.resInfoName,
                resInfoCode: resInfo.resInfoCode,
                resContentType: resInfo.resContentType
              },
            });
            window.open(href, "_blank");
          }
        
      } else {
        changeSelectedInfo(resInfo, action);
      }
    };
    return {
      enterDetail,
    };
  },
});
</script>
