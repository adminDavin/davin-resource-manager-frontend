<template>
  <el-container>
    <el-header style="padding: 0px">
      <el-row justify="space-between" style="background-color: gray">
        <el-col :span="3">
          <div style="display: flex; margin-top: 10px; margin-left: 50px">
            <el-image style="height: 40px" :src="logo1"></el-image>
            <div style="margin-top: 10px">
              <strong :style="`font-size: var(--el-font-size-large)`">
                后台管理
              </strong>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <el-avatar :size="50" :src="circleUrl" />
        </el-col>
      </el-row>
    </el-header>
    <el-main style="padding-top: 10px; padding-left: 50px; padding-right: 50px; min-height: 500px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="design_news">
          <template #label>
            <strong :style="`font-size: var(--el-font-size-large)`">
              应用管理
            </strong>
          </template>
        </el-tab-pane>
        <el-tab-pane name="design_auxiliary_tools">
          <template #label>
            <strong :style="`font-size: var(--el-font-size-large)`">
              标签管理
            </strong>
          </template>
        </el-tab-pane>
        <el-tab-pane name="design_cloud">
          <template #label>
            <strong :style="`font-size: var(--el-font-size-large)`">
              标签组管理
            </strong>
          </template>
        </el-tab-pane>
      </el-tabs>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute, RouteLocationRaw } from "vue-router";
import c_alert from "@/utils/alert_utils";
import tempLogo from "@/assets/logos/logo1.png";
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const userinfo = store.state.user.info;
    const circleUrl = ref(
      "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    );
    const logo1 = ref(tempLogo);

    let paths = route.path.split("/");
    const activeName = paths.length > 2 ? ref(paths[2]) : ref("design_news");

    const handleClick = (tab: any, event: Event) =>
      router.push({ path: tab.paneName });

    const loginout = () => {
      console.log(store);
      store.dispatch("user/loginOut", {}).then(async () => {
        c_alert.c_alert_s("登录成功", "success", true, 1000);
        await router.push(
          (route.query.redirect as RouteLocationRaw) || "/login"
        );
      });
    };

    return {
      loginout,
      userinfo,
      activeName,
      handleClick,
      circleUrl,
      logo1,
    };
  },
});
</script>
<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 8px 0;
}
</style>
