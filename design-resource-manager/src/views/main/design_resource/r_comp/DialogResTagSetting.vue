<template>
  <el-dialog v-model="downloadDialogVisible" title="下载文件" width="60%">
    {{ pickedResInfo }}
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(props, context) {
    const { expose } = context;
    const pickedResInfo = ref();
    const downloadDialogVisible = ref(false);
    const shareResInfoDesc = ref();
    const downloadProcess = ref(0);

    expose({
      initResInfos: (resInfos: any) => {
        pickedResInfo.value = resInfos;
        downloadDialogVisible.value = true;
        downloadProcess.value = 0;
      },
    });

    return {
      downloadDialogVisible,
      shareResInfoDesc,
      pickedResInfo,
    };
  },
});
</script>
