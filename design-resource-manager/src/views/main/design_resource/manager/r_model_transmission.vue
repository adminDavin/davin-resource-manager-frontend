<template>
  <el-drawer v-model="drawer" size="45%" :with-header="false">
    <el-container style="margin-right: 30px">
      <el-aside width="130px">
        <div style="font-size: var(--el-font-size-base); font-weight: bolder">
          传输列表
        </div>
        <el-menu default-active="0">
          <el-menu-item index="0">
            <template #title>文件上传</template>
          </el-menu-item>
          <el-menu-item index="1">
            <template #title>文件下载</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="margin-top: 30px">
        <el-upload
          v-if="actionType == 'create'"
          drag
          action=""
          :http-request="beforeUpload"
          :show-file-list="false"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            将文件拖动到此处 or <em>点击上传文件</em>
          </div>
        </el-upload>
        <el-progress
          :percentage="resInfoStatus"
          v-if="resInfoStatus !== 0"
        ></el-progress>
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
                {{ item.resTaskStatus == 0 ? "已完成" : "进行中" }}
              </div>
            </div>
            <div>
              <el-button size="small" type="text"> 打开</el-button>
              {{ Math.ceil(item.resInfoSize / 1024) }}
              <text
                style="
                  font-size: var(--el-font-size-small);
                "
                >KB</text
              >
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
    const drawer = ref(false);
    const resInfoStatus = ref(0);
    const taskParams = ref();
    const actionType = ref();
    const pickedResInfo = ref({
      resInfoCode: "",
      resInfoName: "",
    });

    const resTasks = ref();
    const importAction = (rType: string, resInfoCode: string, params: any) => {
      drawer.value = true;
      actionType.value = rType;
      pickedResInfo.value.resInfoCode = resInfoCode;
      taskParams.value = params;
      rResTask.getResTasks(params, resTasks);
    };

    const beforeUpload = (upload: any) => {
      fo.beforeSimpleUpload(
        pickedResInfo.value.resInfoCode,
        upload.file,
        (res: any) => {
          rResTask.getResTasks(taskParams.value, resTasks);
          resInfoStatus.value = Math.ceil(
            (res.data.resTaskStatus / res.data.partCount) * 100
          );
        }
      );
    };

    onMounted(() => rResTask.getResTasks(taskParams.value, resTasks));

    expose({
      importAction,
    });
    return {
      drawer,
      resInfoStatus,
      pickedResInfo,
      resTasks,
      actionType,
      beforeUpload,
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
