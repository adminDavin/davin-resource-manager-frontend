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
        <!-- <el-upload
          drag
          action=""
          :http-request="submitUpload"
          :before-upload="beforeUpload"
          :show-file-list="false"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            将文件拖动到此处 or <em>点击上传文件</em>
          </div>
          <template #tip>
            <div class="el-upload__tip" style="color: red">
              支持小于2M的文件
            </div>
          </template>
        </el-upload> -->

        <uploader :options="options" class="uploader-example">
          <uploader-unsupport></uploader-unsupport>
          <uploader-drop>
            <p>Drop files here to upload or</p>
            <uploader-btn>select files</uploader-btn>
            <uploader-btn>select images</uploader-btn>
            <uploader-btn :directory="true">select folder</uploader-btn>
          </uploader-drop>
          <uploader-list></uploader-list>
        </uploader>

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
        </div>
      </el-main>
    </el-container>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";
import rResTask from "../r_res_task";
import { useStore } from "vuex";
import bUtils from "@/utils/browser_utils";
import uploader from "vue-simple-uploader";

export default defineComponent({
  components: {
    uploader: uploader,
  },
  setup(props, context) {
    const store = useStore();
    const { expose } = context;
    const drawer = ref(false);
    const uploadFile = ref();
    const resTaskCode = ref();
    const pickedResInfo = ref({
      resInfoCode: "",
      resInfoName: "",
    });
    const refreshResInfos: any = inject("refreshResInfos");
    const resTasks = ref();
    const importAction = (resInfoCode: string, resInfoName: string) => {
      drawer.value = true;
      uploadFile.value = null;
      pickedResInfo.value.resInfoCode = resInfoCode;
      pickedResInfo.value.resInfoName = resInfoName;
      rResTask.getResTasks(resTasks);
    };
    const submitUpload = (upload: any) => {
      console.log(resTaskCode.value);
      if (resTaskCode.value) {
        let file: File = upload.file;
        var totalsize = file.size; //总大小
        if (totalsize > 1024 * 1024) {
          var tosize =
            (Math.round((totalsize * 100) / (1024 * 1024)) / 100).toString() +
            "M";
        } else {
          var tosize =
            (Math.round((totalsize * 100) / 1024) / 100).toString() + "KB";
        }
        var rndstr = bUtils.randomString(16);
        rResTask.uploadRes(resTaskCode.value, file, () => {
          rResTask.getResTasks(resTasks);
          refreshResInfos();
        });
      }
    };
    const beforeUpload = (file: File) => {
      return rResTask.createResTasks(
        {
          resInfoParentCode: pickedResInfo.value.resInfoCode,
        },
        resTaskCode
      );
    };

    onMounted(() => {
      sessionStorage.setItem("tenantId", store.state.user.info.tenantId);
      sessionStorage.setItem("userId", store.state.user.info.userId);
      rResTask.getResTasks(resTasks);
    });
    expose({
      importAction,
    });
    return {
      drawer,
      pickedResInfo,
      resTasks,
      importAction,
      submitUpload,
      beforeUpload,
      options: {
        target: "http://xxxxx/xx",
        chunkSize: "2048000", //分块大小
        fileParameterName: "file", //上传文件时文件的参数名，默认file
        maxChunkRetries: 3, //最大自动失败重试上传次数
        testChunks: true, //是否开启服务器分片校验
      },
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

.uploader-example {
  width: 880px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
