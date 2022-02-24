<template>
  <div style="margin-right: 20px; margin-top: 3px">
    <el-button @click="createResourceAction('file')" type="success" size="small"
      >上传文件</el-button
    >
    <r-model-transmission ref="childModelTransmission" />
    <el-popover v-model:visible="visible" placement="bottom" :width="200">
      <el-input
        v-model="inputResInfoPath"
        size="small"
        placeholder="请输入目录名"
      />
      <div style="text-align: right; margin-top: 10px">
        <el-button size="small" type="text" @click="visible = false"
          >取消</el-button
        >
        <el-button size="small" type="primary" @click="inputResInfoConform"
          >确定</el-button
        >
      </div>
      <template #reference>
        <el-button @click="visible = true" size="small">新建文件夹</el-button>
      </template>
    </el-popover>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, provide, Ref, ref } from "vue";
import b_utils from "@/utils/browser_utils";
import rResInfo from "../r_res_info";
import RModelTransmission from "./r_model_transmission.vue";

export default defineComponent({
  components: {
    "r-model-transmission": RModelTransmission,
  },
  setup(props, context) {
    const { expose } = context;
    const selectedResInfo = ref();
    const inputFlag = ref(false);
    const visible = ref(false);
    const inputResInfoPath = ref();
    const childModelTransmission: Ref = ref();
    const refreshResInfos: any = inject("refreshResInfos");
    // const initShowSortedResInfoData: any = inject("initShowSortedResInfoData");
    
    // 创建文件
    const createResourceAction = (resType: string) => {
      if (resType == "file") {
        let resInfo = selectedResInfo.value;
        childModelTransmission.value.importAction(
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
          (resInfo: any) => refreshResInfos(selectedResInfo.value)
        );
      }
      inputResInfoPath.value = null;
    };

    expose({
      initSelectedResInfo: (resInfo: any) => (selectedResInfo.value = resInfo),
    });

    return {
      visible,
      inputResInfoPath,
      childModelTransmission,
      createResourceAction,
      inputResInfoConform,
    };
  },
});
</script>
