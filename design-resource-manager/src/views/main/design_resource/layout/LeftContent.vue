<template>
  <el-aside style="overflow-x: hidden">
    <el-button style="margin-top: 5px;margin-left: 15px;font-size: 20px;" type="text" @click="handleToRootResInfo">我的文件</el-button>
    <el-menu
      style="width: min-content"
      @select="handleActiveMenuAction"
      :default-openeds="[`-1`]"
    >
      <el-menu-item
        :index="item.index"
        v-for="item in resourceTypes"
        :key="item.index"
      >
        <el-icon><component :is="item.icon"></component></el-icon>
        <template #title>{{ item.label }}</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import constants from "../constants";

export default defineComponent({
  setup() {
    const handleSearchContentAction: any = inject("handleSearchContentAction");
    const handleToRootResInfo: any = inject("handleToRootResInfo");
    const resourceType = ref("-1");
    const resourceTypes = constants.resourceTypes;
    const handleActiveMenuAction = (index: any) => {
      resourceType.value = index;
      handleSearchContentAction(null, constants.getResourceTypeByIndex(index));
    };
    
    return {
      resourceType,
      resourceTypes,
      handleToRootResInfo,
      handleActiveMenuAction,
    };
  },
});
</script>
