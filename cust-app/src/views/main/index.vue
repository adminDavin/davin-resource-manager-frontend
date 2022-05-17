<template>
  <!-- <el-tabs stretch v-model="activeName" @tab-click="handleClick">
    <el-tab-pane name="design_news">
      <template #label>
      </template>
    </el-tab-pane>
  </el-tabs> -->
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
      activeName: paths.length > 2 ? ref(paths[2]) : ref("design_news"),
      handleClick: (tab: any, event: Event) =>
        router.push({ path: tab.paneName }),
    };
  },
});
</script>
