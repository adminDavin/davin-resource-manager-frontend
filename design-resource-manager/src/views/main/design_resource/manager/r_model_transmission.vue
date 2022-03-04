<template>
  <el-drawer v-model="drawer" size="45%" :with-header="false">
    <el-container style="margin-right: 30px">
      <el-aside width="130px">
        <div style="font-size: var(--el-font-size-base); font-weight: bolder">
          传输列表
        </div>
        <el-menu
          style="width: min-content"
          :default-active="defaultActiveMenu"
          @select="handleActiveMenuAction"
        >
          <el-menu-item index="UPLOAD">
            <template #title>文件上传</template>
          </el-menu-item>
          <el-menu-item index="DOWNLOAD">
            <template #title>文件下载</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="margin-top: 30px">
        <el-upload
          v-if="actionType == 'create' && defaultActiveMenu == 'UPLOAD'"
          drag
          action=""
          :http-request="beforeUpload"
          webkitdirectory
          :show-file-list="false"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            将文件拖动到此处 or <em>点击上传文件</em>
          </div>
        </el-upload>
        <div style="font-size: var(--el-font-size-base); font-weight: bolder">
          任务列表
        </div>
        <el-divider></el-divider>
        <div style="margin-right: 80px">
          <div v-for="item in resTasks" :key="item.id">
            <div style="display: flex; width: 100%">
              <div
                style="
                  font-size: var(--el-font-size-small);
                  font-weight: bolder;
                "
              >
                {{ item.resInfoName }}
              </div>
              <div
                style="
                  margin-left: auto;
                  font-size: var(--el-font-size-small);
                  font-weight: bolder;
                "
              >
                <el-button size="small" @click="deleteTask(item)" type="text"
                  >删除记录</el-button
                >
              </div>
            </div>
            <el-progress
              :percentage="
                Math.ceil((item.resTaskStatus / item.partCount) * 100)
              "
              v-if="item.resTaskStatus !== 0"
            ></el-progress>
            <div v-if="item.resTaskStatus == 0">
              {{ Math.ceil(item.resInfoSize / 1024) }}
              <text style="font-size: var(--el-font-size-small)">KB</text>
            </div>
            <el-divider></el-divider>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";
import rResTask from "../r_res_task";
import fo from "./FileOperate";

export default defineComponent({
  components: {},
  setup(props, context) {
    const { expose } = context;
    const refreshResInfos: any = inject("refreshResInfos");
    const drawer = ref(false);
    const resInfoStatus = ref(0);
    const taskParams = ref();
    const actionType = ref();
    const defaultActiveMenu = ref("UPLOAD");
    const pickedResInfoCode = ref();

    const resTasks = ref();
    const importAction = (rType: string, resInfoCode: string, params: any) => {
      drawer.value = true;
      actionType.value = rType;
      if (rType == "download") {
        defaultActiveMenu.value = "DOWNLOAD";
      }
      pickedResInfoCode.value = resInfoCode;
      taskParams.value = params;
      refreshTask(params);
    };

    const refreshTask = (params: string) => {
      params["resTaskType"] = defaultActiveMenu.value;
      rResTask.getResTasks(params, resTasks);
    };

    const handleActiveMenuAction = (index: any) => {
      defaultActiveMenu.value = index;
      refreshTask(taskParams.value);
    };

    const beforeUpload = (upload: any) => {
      fo.beforeSimpleUpload(
        pickedResInfoCode.value,
        upload.file,
        (res: any) => {
          refreshTask(taskParams.value);
          refreshResInfos();
        }
      );
    };

    const deleteTask = (resTask: any) => {
      rResTask.deleteTask([resTask.id], () => {
        refreshTask(taskParams.value);
      });
    };

    expose({
      importAction,
    });
    return {
      drawer,
      handleActiveMenuAction,
      resInfoStatus,
      defaultActiveMenu,
      resTasks,
      actionType,
      beforeUpload,
      deleteTask,
    };
  },
});
</script>
<style lang="scss" scoped>
.el-drawer__header {
  margin-bottom: 0px;
}
.el-divider--horizontal {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
