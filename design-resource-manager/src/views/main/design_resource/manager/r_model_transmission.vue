<template>
  <el-drawer v-model="drawer" size="70%" :with-header="false">
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
        <div style="font-size: var(--el-font-size-base); font-weight: bolder">
          上传至目标路径: <el-link>{{ pickedResInfo.resInfoName }}</el-link>
        </div>
        <el-upload
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
                <el-button size="small" type="success"> 打开所在目录</el-button>
              </div>
            </div>
            <div>
              {{ Math.ceil(item.resInfoSize / 1024) }}
              <text
                style="
                  font-size: var(--el-font-size-small);
                  font-weight: bolder;
                "
                >KB</text
              >
            </div>
          </div>
          {{ resTasks }}
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
    const refreshResInfos: any = inject("refreshResInfos");
    const { expose } = context;
    const drawer = ref(false);
    const resInfoStatus = ref(0);
    const pickedResInfo = ref({
      resInfoCode: "",
      resInfoName: "",
    });

    const resTasks = ref();
    const importAction = (resInfoCode: string, resInfoName: string) => {
      drawer.value = true;
      pickedResInfo.value.resInfoCode = resInfoCode;
      pickedResInfo.value.resInfoName = resInfoName;
      rResTask.getResTasks(resTasks);
    };

    const beforeUpload = (upload: any) => {
      fo.beforeSimpleUpload(
        pickedResInfo.value.resInfoCode,
        upload.file,
        (res: any) => {
          refreshResInfos();
          rResTask.getResTasks(resTasks);
          resInfoStatus.value = Math.ceil(
            (res.data.resTaskStatus / res.data.partCount) * 100
          );
        }
      );
    };

    onMounted(() => rResTask.getResTasks(resTasks));
    
    expose({
      importAction,
    });
    return {
      drawer,
      resInfoStatus,
      pickedResInfo,
      resTasks,
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
