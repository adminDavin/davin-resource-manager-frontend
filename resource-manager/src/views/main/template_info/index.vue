<template>
  <div style="width: 98%; height: 99%">
    <div style="margin: 10px; margin-left: 30px; font-size: 20px">
      <h3>项目管理</h3>
    </div>
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
        <el-divider  content-position="left">相关资料模版</el-divider>
        <el-menu-item
            :index="`/template_info/material?templateTypeCode=` + item.templateTypeCode + `&templateTypeName=` + item.templateTypeName"
            v-for="item in templateTypes"
            :key="item.id"
          >
            {{ item.templateTypeName }}
          </el-menu-item>
      </el-menu>
      <el-card shadow="never" style="width: 100%">
        <router-view :key="$route.fullPath"></router-view>
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
import tService from "./TemplateService";

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
    const templateTypes = ref<any[]>([]);
    const initNextcloudUid = () => {
      if (route.query.uid) {
        let uid: any = route.query.uid;
        if (localStorage.getItem("nextcloudUid")) {
          let oldUid = localStorage.getItem("nextcloudUid");
          if (oldUid != uid) {
            localStorage.setItem("nextcloudUid", uid);
          }
        } else {
          localStorage.setItem("nextcloudUid", uid);
        }
      }
      nextcloudUid.value = localStorage.getItem(nextcloudUid);
    };
    onMounted(() => {
      initNextcloudUid();
      tService.loadTemplateTypes((data: any) => {
        templateTypes.value = data;
      });
    });
    return {
      nextcloudUid,
      templateTypes,
    };
  },
});
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 600px;
  border-right: none;

  .el-sub-menu__icon-arrow {
    display: no;
  }
}
</style>
