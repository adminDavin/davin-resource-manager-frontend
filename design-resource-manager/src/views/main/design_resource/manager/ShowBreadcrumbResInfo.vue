<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in allParentResInfo" :key="index">
      <el-button type="text" @click="initByParentCode(item.resInfoCode)">
        {{ item.resInfoName == "/" ? "全部文件" : item.resInfoName }}
      </el-button>
    </el-breadcrumb-item>
    <el-breadcrumb-item />
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";

export default defineComponent({
  setup(props, context) {
    const { expose } = context;
    const allParentResInfo = ref<any>([]);
    const initByParentCode: any = inject("initByParentCode");
    expose({
      initAllParentResInfo: (resInfos: any) =>
        (allParentResInfo.value = resInfos)
    });
    return {
      allParentResInfo,
      initByParentCode,
    };
  },
});
</script>
