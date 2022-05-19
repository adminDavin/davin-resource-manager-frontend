<template>
  <div style="width: 98%; height: 99%">
    <div style="margin: 10px; margin-left: 30px; font-size: 20px">项目管理{{nextcloudUid}}</div>
    <div style="display: flex">
      <el-menu
        default-active="/template_info/project"
        class="el-menu-vertical-demo"
        :collapse="false"
        :router="true"
      >
        <el-menu-item index="/template_info/project">
          <el-icon><icon-menu /></el-icon>
          <template #title>项目模版</template>
        </el-menu-item>
        <el-menu-item index="/template_info/material">
          <el-icon><setting /></el-icon>
          <template #title>资料模版</template>
        </el-menu-item>
      </el-menu>
      <el-card shadow="never" style="width: 100%">
      <router-view></router-view>
    </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    Document,
    IconMenu,
    Location,
    Setting,
  },
  setup() {
    const route = useRoute();
    const nextcloudUid: any = ref(localStorage.getItem("nextcloudUid"));
    onMounted(() => {
      console.log(route.query);
      if (route.query.uid) {
        let uid: any = route.query.uid;
        if (localStorage.getItem('nextcloudUid')) {
          let oldUid = localStorage.getItem('nextcloudUid');
          if (oldUid != uid) {
            localStorage.setItem('nextcloudUid', uid);
          }
        } else {
          localStorage.setItem('nextcloudUid', uid);
        }
      }
      nextcloudUid.value = localStorage.getItem(nextcloudUid);
    });
    return {
      nextcloudUid
    };
  },
});
</script>
<style lang="scss" scoped>

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 600px;
  border-right: none;
}
</style>
