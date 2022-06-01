<template>
  <el-row
    v-loading="dialogTableVisible"
    element-loading-text="项目正在创建中, 请等待..."
  >
    <el-col :xs="24" :sm="14" :md="12" :lg="4">
      <div style="text-align: center; margin-top: 20px; margin-bottom: 30px">
        <strong :style="`font-size: 30px;`">设计项目模版</strong>
      </div>
      <el-image
        :src="tZeroDCloudProject"
        style="margin-top: 15px; object-fit: contain"
      ></el-image>
    </el-col>
    <el-col :xs="24" :sm="14" :md="12" :lg="10">
      <div style="margin: 30px">
        <el-input
          v-model="projectName"
          placeholder="类型+组号+序号-开发商-地点+项目名"
        />
        <el-alert type="info" show-icon :closable="false">
          <p>类型：拿地简写ND，生产项目简写SC</p>
          <p>组号：一所即1</p>
          <p>示例：以1组第一块拿地为例，ND1001-金地-青岛市XX项目</p>
        </el-alert>
      </div>
      <div style="margin: 30px">
        <el-button type="primary" @click="createDesignProject" round>
          创建设计项目
        </el-button>
      </div>
    </el-col>
    <el-col :xs="0" :sm="0" :md="0" :lg="10">
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
  <el-dialog v-model="dialogVisible" title="请再此确认账号密码" width="30%">
    <span>请再此确认账号密码</span>
    <el-input v-model="nextcloudUid" placeholder="账号" />
    <el-input v-model="nextcloudPass" placeholder="密码" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import tZeroDCloudProject from "@/assets/room/scene_right.jpeg";
import common_utils from "@/utils/common_utils";
import alert_utils from "@/utils/alert_utils";
import type { ElTree } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import Base64 from "base-64";
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
    const nextcloudPass: any = ref(localStorage.getItem("nextcloudPass"));
    const projectName = ref("");
    const dialogTableVisible = ref(false);
    const dialogVisible = ref(false);
    const headers: any = ref({});
    const treeRef = ref<InstanceType<typeof ElTree>>();

    const projectData = ref<any[]>([]);
    const props = {
      value: "id",
      label: "label",
      children: "children",
    };
    const defaultCheckedKeys = ref<string[]>([]);

    const handleError = (e: any) => {
      dialogTableVisible.value = false;
      if (e.response.status === 401) {
        // dialogVisible.value = true;
        // headers.value = {
        //   Authorization: `Basic ${Base64.encode('david:Davin1203!')}`
        // }
        alert_utils.c_alert_e(`项目创建失败 ${e}, 请重试`, 2000);
        // createDesignProject();
      } else {
        alert_utils.c_alert_e(`项目创建失败 ${e}`, 2000);
      }
    };
    const createDesignProject = async () => {
      let selectIds: any[] = [];
      for (var node of treeRef.value!.getCheckedNodes(false, false)) {
        selectIds.push(node.id);
      }

      let parentPath = "";
      let currentPath = `${parentPath}/${projectName.value}`;
      batchCFolder("", currentPath, projectData.value, selectIds);
      let uid = localStorage.getItem("nextcloudUid") || "";
      if (common_utils.isEmpty(uid)) {
        // dialogVisible.value = true;
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
        headers.value,
        async () => {
          await batchCreateFolder(
            uid,
            currentPath,
            headers.value,
            projectData.value,
            selectIds
          );
          setTimeout(() => {
            dialogTableVisible.value = false;
            window.parent.location.replace("/nextcloud/index.php/apps/files");
          }, 1000);
        },
        (e: any) => handleError(e)
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
      nextcloudPass,
      dialogVisible,
      createDesignProject,
    };
  },
});
</script>
