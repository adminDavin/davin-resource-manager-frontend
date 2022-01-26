<template>
    <div style="display: flex; margin-top: 0.6rem; margin-left: 0.6rem">
    <el-avatar size="default" :src="userinfo.userDesc['avatar']"></el-avatar>
    <div style="margin-top: 0.6rem; margin-left: 0.6rem">
      <strong :style="`font-size: var(--el-font-size-extra-large)`">
        {{ userinfo.nickName }}, 欢迎您
      </strong>
      <span :style="`font-size: var(--el-font-size-base)`"
        >新的一天，开启设计之旅。</span
      >
    </div>
  </div>
  <el-divider></el-divider>
  <el-tabs stretch v-model="activeName" @tab-click="handleClick">
    <el-tab-pane name="design_news">
    <template #label>
      <strong :style="`font-size: var(--el-font-size-large)`">设计资讯</strong>
    </template>
    </el-tab-pane>
    <el-tab-pane name="design_auxiliary_tools">

    <template #label>
      <strong :style="`font-size: var(--el-font-size-large)`">设计辅助工具</strong>
    </template>
    </el-tab-pane>
    <el-tab-pane name="design_cloud">
      <template #label>
      <strong :style="`font-size: var(--el-font-size-large)`">天友设计云</strong>
    </template>
    </el-tab-pane>
  </el-tabs>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const userinfo = store.state.user.info;

    let paths = route.path.split("/");
    const activeName = paths.length > 2 ? ref(paths[2]) : ref("design_news");

    const handleClick = (tab: any, event: Event) =>
      router.push({ path: tab.paneName });

    return {
      userinfo,
      activeName,
      handleClick,
    };
  },
});
</script>
<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 8px 0;
}
</style>
