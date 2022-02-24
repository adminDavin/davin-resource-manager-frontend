<template>
  <el-dialog v-model="shareDialogVisible" title="分享文件" width="60%">
    <div>{{ shareResInfoDesc }}</div>
    <el-button type="text" @click="handleCopyShareResInfoDesc(shareResInfoDesc)"
      >点击复制</el-button
    >
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { currentDomain } from "@/config/index";

export default defineComponent({
  setup(props, context) {
    const { expose } = context;
    const pickedResInfo = ref();
    const shareDialogVisible = ref(false);
    const shareResInfoDesc = ref();

    const handleCopyShareResInfoDesc = (t: string) => {
      navigator.clipboard.writeText(t).then(() => alert("复制成功"));
    };

    expose({
      initPickedResInfo: (resInfo: any) => {
        pickedResInfo.value = resInfo;
        shareResInfoDesc.value = `${currentDomain}#/res_preview?resInfoCode=${resInfo.resInfoCode}`;
        shareDialogVisible.value = true;
      },
    });

    return {
      shareDialogVisible,
      shareResInfoDesc,
      handleCopyShareResInfoDesc,
    };
  },
});
</script>
