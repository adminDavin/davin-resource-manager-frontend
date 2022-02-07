<template>
  <el-tabs stretch v-model="activeName" @tab-click="handleClick">
    <el-tab-pane name="design_resource">
      <template #label>
        <strong :style="`font-size: var(--el-font-size-large)`"
          >我的云存储空间</strong
        >
      </template>
    </el-tab-pane>
    <el-tab-pane name="design_resource/group">
      <template #label>
        <strong :style="`font-size: var(--el-font-size-large)`"
          >团队云存储空间</strong
        >
      </template>
    </el-tab-pane>
    <el-tab-pane name="design_resource/public">
      <template #label>
        <strong :style="`font-size: var(--el-font-size-large)`"
          >开放云存储空间</strong
        >
      </template>
    </el-tab-pane>
  </el-tabs>
  <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    let paths = route.path.split("/");
    return {
      activeName: paths.length > 2 ? ref(paths[2]) : ref("design_resource"),
      handleClick: (tab: any, event: Event) =>
        router.push({ path: tab.paneName }),
    };
  },
});
</script>
