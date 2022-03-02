<template>
  <el-dialog v-model="downloadDialogVisible" title="下载文件" width="60%">
    <el-progress :percentage="downloadProcess"></el-progress>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import rResInfo from "../r_res_info";

export default defineComponent({
  setup(props, context) {
    const { expose } = context;
    const pickedResInfo = ref();
    const downloadDialogVisible = ref(false);
    const shareResInfoDesc = ref();
    const downloadProcess = ref(0);
    
    expose({
      initPickedResInfo: (resInfo: any) => {
        pickedResInfo.value = resInfo;
        downloadDialogVisible.value = true;
        downloadProcess.value = 0;
      },
    });

    return {
      downloadDialogVisible,
      shareResInfoDesc,
      downloadProcess,
    };
  },
});
</script>
