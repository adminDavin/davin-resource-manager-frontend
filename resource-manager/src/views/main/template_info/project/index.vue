<template>
  <el-row
    v-loading="dialogTableVisible"
    element-loading-text="项目正在创建中, 请等待..."
  >
    <el-col :span="4">
      <div style="text-align: center; margin-top: 20px; margin-bottom: 30px">
        <strong :style="`font-size: 30px;`">设计项目模版</strong>
      </div>
      <el-image
        :src="tZeroDCloudProject"
        style="margin-top: 15px; object-fit: contain"
      ></el-image>
    </el-col>
    <el-col :span="8">
      <div style="margin: 30px">
        <el-input v-model="projectName" placeholder="项目名称" />
      </div>
      <div style="margin: 30px">
        <el-button type="primary" @click="createDesignProject" round
          >创建设计项目</el-button
        >
      </div>
    </el-col>
    <el-col :span="12">
      <el-card shadow="never">
        <h4>模版结构</h4>
        <el-tree
          ref="treeRef"
          :data="projectData"
          :height="400"
          :props="props"
          node-key="id"
          default-expand-all
          :default-checked-keys="defaultCheckedKeys"
        />
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import tZeroDCloudProject from "@/assets/room/scene_right.jpeg";
import common_utils from "@/utils/common_utils";
import alert_utils from "@/utils/alert_utils";
import type { ElTree } from "element-plus";
import {
  projectTemplate,
  projectCreate,
  batchCreateFolder,
  batchFolder,
  batchCFolder,
} from "./project01";

interface Tree {
  id: string;
  label: string;
  children?: Tree[];
}

export default defineComponent({
  setup() {
    const nextcloudUid: any = ref(localStorage.getItem("nextcloudUid"));
    const projectName = ref("");
    const dialogTableVisible = ref(false);
    const treeRef = ref<InstanceType<typeof ElTree>>();

    const projectData = ref<any[]>([]);
    const props = {
      value: "id",
      label: "label",
      children: "children",
    };
    const defaultCheckedKeys = ref<string[]>([]);
    const createDesignProject = async () => {
      let selectIds: any[] = [];
      for (var node of treeRef.value!.getCheckedNodes(false, false)) {
        selectIds.push(node.id);
      }

      let parentPath = "";
      let currentPath = `${parentPath}/${projectName.value}`;
      batchCFolder('', currentPath, projectData.value, selectIds);
      let uid = localStorage.getItem("nextcloudUid") || "";
      if (common_utils.isEmpty(uid)) {
        alert_utils.c_alert_e("请联系管理员进行排查", 2000);
        return;
      }

      if (common_utils.isEmpty(projectName.value)) {
        alert_utils.c_alert_e("项目名称不可以为空", 2000);
        return;
      }
      dialogTableVisible.value = true;
      projectCreate(
        uid,
        currentPath,
        async () => {
          await batchCreateFolder(uid, currentPath, projectData.value, selectIds);
          setTimeout(() => {
            dialogTableVisible.value = false;
            window.parent.location.replace("/nextcloud/index.php/apps/files");
          }, 1000);
        },
        () => {
          dialogTableVisible.value = false;
          alert_utils.c_alert_e("项目创建失败", 2000);
        }
      );
    };

    onMounted(() => {
      let data = batchFolder("", projectTemplate);
      projectData.value = data;
      for (let i of data) {
        defaultCheckedKeys.value.push(i.id);
      }
    });
    return {
      tZeroDCloudProject,
      projectName,
      dialogTableVisible,
      projectTemplate,
      projectData,
      props,
      treeRef,
      defaultCheckedKeys,
      nextcloudUid,
      createDesignProject,
    };
  },
});
</script>
