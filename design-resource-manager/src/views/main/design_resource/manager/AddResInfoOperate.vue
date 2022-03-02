<template>
  <div style="margin-left: 10px; margin-top: 15px">
    <el-button @click="createResourceAction('file', selectedResInfo.resInfoCode)" type="success" size="small"
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

export default defineComponent({
  components: {
  },
  setup(props, context) {
    const { expose } = context;
    const selectedResInfo = ref();
    const visible = ref(false);
    const inputResInfoPath = ref();
    const refreshResInfos: any = inject("refreshResInfos");
    const handleTransmissionDialog: any = inject("handleTransmissionDialog");

    // 创建文件
    const createResourceAction = (resType: string, resInfoCode: string) => {
      if (resType == "file") {
        handleTransmissionDialog("create", resInfoCode);
      }
    };

    // 创建目录
    const inputResInfoConform = () => {
      visible.value = false;
      if (!b_utils.isEmpty(inputResInfoPath.value)) {
        rResInfo.createFolder(
          inputResInfoPath.value,
          selectedResInfo.value.resInfoCode,
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
      selectedResInfo,
      inputResInfoPath,
      createResourceAction,
      inputResInfoConform,
    };
  },
});
</script>
