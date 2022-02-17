<template>
    <el-tabs stretch v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="d3_force_graph">
        <template #label>
          <strong :style="`font-size: var(--el-font-size-large)`"
            >热力图</strong
          >
        </template>
      </el-tab-pane>
      <el-tab-pane name="troisjs">
        <template #label>
          <strong :style="`font-size: var(--el-font-size-large)`"
            >troisjs</strong
          >
        </template>
      </el-tab-pane>
      <el-tab-pane name="pathfinding">
        <template #label>
          <strong :style="`font-size: var(--el-font-size-large)`"
            >pathfinding</strong
          >
        </template>
      </el-tab-pane><el-tab-pane name="threejs_vue">
        <template #label>
          <strong :style="`font-size: var(--el-font-size-large)`"
            >threejs-demo</strong
          >
        </template>
      </el-tab-pane>
      <el-tab-pane name="threejs_ar">
        <template #label>
          <strong :style="`font-size: var(--el-font-size-large)`"
            >threejs_ar</strong
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