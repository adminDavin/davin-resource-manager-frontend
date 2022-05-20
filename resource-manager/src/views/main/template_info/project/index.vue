<template>
  <el-row
    v-loading="dialogTableVisible"
    element-loading-text="项目正在创建中, 请等待..."
  >
    <el-col :span="4">
      <el-image
        :src="tZeroDCloudProject"
        style="margin-top: 15px; object-fit: contain"
      ></el-image>
      <div style="text-align: center; margin-top: 20px; margin-bottom: 30px">
        <strong :style="`font-size: 30px;`">设计项目模版</strong>
      </div>
    </el-col>
    <el-col :span="20">
      <div style="margin: 30px">
        <el-input v-model="projectName" placeholder="项目名称" />
      </div>
      <div style="margin: 30px">
        <el-button type="primary" @click="createDesignProject" round
          >创建设计项目</el-button
        >
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import tZeroDCloudProject from "@/assets/room/scene_right.jpeg";
import common_utils from "@/utils/common_utils";
import alert_utils from "@/utils/alert_utils";
import { projectTemplate, projectCreate, batchCreateFolder } from "./project01";

export default defineComponent({
  setup() {
    const nextcloudUid: any = ref(localStorage.getItem("nextcloudUid"));
    const projectName = ref("");
    const dialogTableVisible = ref(false);

    const createDesignProject = async () => {
      let uid = localStorage.getItem("nextcloudUid") || "";
      if (common_utils.isEmpty(uid)) {
        alert_utils.c_alert_e("请联系管理员进行排查", 2000);
        return;
      }

      if (common_utils.isEmpty(projectName.value)) {
        alert_utils.c_alert_e("项目名称不可以为空", 2000);
        return;
      }

      let parentPath = "";
      let currentPath = `${parentPath}/${projectName.value}`;
      dialogTableVisible.value = true;
      projectCreate(uid, currentPath, async (data: any) => {
        await batchCreateFolder(uid, currentPath, projectTemplate);
        window.parent.location.replace("/nextcloud/index.php/apps/files");
        dialogTableVisible.value = false;
      }, () => {
        dialogTableVisible.value = false;
        alert_utils.c_alert_e("项目创建失败", 2000);
      });
    };

    return {
      tZeroDCloudProject,
      projectName,
      dialogTableVisible,
      nextcloudUid,
      createDesignProject,
    };
  },
});
</script>
