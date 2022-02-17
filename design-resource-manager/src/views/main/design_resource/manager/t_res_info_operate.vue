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
    <el-popover v-model:visible="visible" placement="bottom" :width="200">
      <el-input
        v-model="inputResInfoPath"
        size="small"
        placeholder="请输入目录名"
      />
      <div style="text-align: right; margin-top: 10px">
        <el-button size="small" type="text" @click="visible = false"
          >cancel</el-button
        >
        <el-button
          size="small"
          type="primary"
          @click="inputResInfoConform(resInfo)"
          >confirm</el-button
        >
      </div>
      <template #reference>
        <el-button type="text" size="small" @click="visible = true">重命名</el-button>
      </template>
    </el-popover>
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
import { useRouter } from "vue-router";
import { officeOnlineShow, previewUrl } from "@/config/index";
import constants from "../constants";

export default defineComponent({
  props: {
    resInfo: Object,
  },
  setup(props, context) {
    const { expose } = context;
    const router = useRouter();
    const refreshResInfos: any = inject("refreshResInfos");
    const changeSelectedInfo: any = inject("changeSelectedInfo");
    const visible = ref(false);
    const inputResInfoPath = ref();
    const inputResInfoConform = (resInfo: any) => {
      rResInfo.rename(resInfo.resInfoCode, inputResInfoPath.value, () => {
        refreshResInfos();
        visible.value = false;
      });
    };

    const enterDetail = (resInfo: any, action: string) => {
      if (action == "download") {
        if (resInfo.resInfoType == "folder") {
          changeSelectedInfo(resInfo, "enter");
        } else {
          rResInfo.downloadResInfo(resInfo.resInfoCode, resInfo.resInfoName);
        }
      } else if (action == "delete") {
        rResInfo.delete(resInfo.resInfoCode, () => refreshResInfos());
      } else if (action == "preview") {
        if (
          constants.resourceTypes[3].rTypes.indexOf(resInfo.resContentType) > -1
        ) {
          let url = `${officeOnlineShow}${previewUrl}?resInfoCode=${resInfo.resInfoCode}`;
          window.open(url);
        } else {
          const { href } = router.resolve({
            path: "/res_preview",
            query: {
              resInfoStore: resInfo.resInfoStore,
              resInfoName: resInfo.resInfoName,
              resInfoCode: resInfo.resInfoCode,
              resContentType: resInfo.resContentType,
            },
          });
          window.open(href, "_blank");
        }
      } else {
        changeSelectedInfo(resInfo, action);
      }
    };
    expose({enterDetail});
    return {
      visible,
      inputResInfoPath,
      inputResInfoConform,
      enterDetail,
    };
  },
});
</script>
