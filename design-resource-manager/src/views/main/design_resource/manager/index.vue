<template>
  <el-card body-style="padding: 0px;margin-left: 10px;">
    <div
      style="margin-top: 10px; display: flex; width: 100%"
      v-if="selectedResInfo"
    >
      <div :xs="24" :sm="8" :md="8" :lg="4">
        <el-button
          @click="createResourceAction('file')"
          type="success"
          size="small"
          >上传文件</el-button
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
            <el-button size="small" type="primary" @click="inputResInfoConform"
              >confirm</el-button
            >
          </div>
          <template #reference>
            <el-button @click="visible = true" size="small">新建目录</el-button>
          </template>
        </el-popover>
      </div>
      <div
        style="margin-top: 8px; margin-left: 30px; display: flex"
        v-if="selectedResInfo"
      >
        <el-icon style="margin-right: 10px"><files /></el-icon>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="(item, index) in selectedResInfo.resInfoPath.split('/')"
            :key="index"
          >
            <div v-if="index == 0">
              <el-link
                v-if="selectedResInfo.resInfoName != '/'"
                @click="backToParent"
                >返回上一级 |
              </el-link>
              <text> 全部文件</text>
            </div>
            <div v-else>{{ item }}</div>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <r-model-transmission ref="childModelTransmission" />
    </div>
    <r-show-res-info-data ref="childShowResInfoData"></r-show-res-info-data>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, provide, Ref, ref } from "vue";
import rResInfo from "../r_res_info";
import RModelTransmission from "./r_model_transmission.vue";
import b_utils from "@/utils/browser_utils";
import RShowResInfoData from "../r_table_res_info.vue";

export default defineComponent({
  components: {
    "r-model-transmission": RModelTransmission,
    "r-show-res-info-data": RShowResInfoData,
  },
  setup(props, context) {
    const { expose } = context;
    const selectedResInfo = ref();
    const inputFlag = ref(false);
    const visible = ref(false);
    const inputResInfoPath = ref();
    const childModelTransmission: Ref = ref();
    const childShowResInfoData: Ref = ref();

    const initTableData = (resInfo: any) => {
      selectedResInfo.value = resInfo;
      initShowResInfoData(resInfo);
    };
    const initShowResInfoData = (resInfo: any) => {
      rResInfo.getResInfoDataByParantCode(resInfo.resInfoCode, (r: any) =>
        childShowResInfoData.value.initTableData(r, resInfo)
      );
    };

    const backToParent = () =>
      initByParentCode(selectedResInfo.value.resInfoParentCode);

    const initByParentCode = (parentCode: string) => {
      rResInfo.getResInfo(parentCode, selectedResInfo, (resInfo: any) =>
        initTableData(resInfo)
      );
    };

    // 创建文件
    const createResourceAction = (resType: string) => {
      if (resType == "file") {
        let resInfo = selectedResInfo.value;
        childModelTransmission.value?.importAction(
          resInfo.resInfoCode,
          resInfo.resInfoPath
        );
      }
    };
    // 创建目录
    const inputResInfoConform = () => {
      visible.value = false;
      if (!b_utils.isEmpty(inputResInfoPath.value)) {
        rResInfo.createFolder(
          inputResInfoPath.value,
          selectedResInfo,
          (resInfo: any) => initShowResInfoData(resInfo)
        );
      }
      inputResInfoPath.value = null;
    };

    provide("refreshResInfos", () => initShowResInfoData(selectedResInfo.value));
    expose({
      initOnMount: (resInfoCode: string) => initByParentCode(resInfoCode),
    });

    return {
      inputFlag,
      inputResInfoPath,
      visible,
      selectedResInfo,
      childModelTransmission,
      childShowResInfoData,
      inputResInfoConform,
      createResourceAction,
      backToParent,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
