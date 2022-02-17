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
          :http-request="submitUpload"
          :before-upload="beforeUpload"
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
import SparkMD5 from "spark-md5";

export default defineComponent({
  components: {},
  setup(props, context) {
    const store = useStore();
    const { expose } = context;
    const drawer = ref(false);
    const uploadFile = ref();
    const resTaskCode = ref();
    const partCount = ref();
    const resInfoStatus = ref(0);
    
    const isNeedPartUpload = ref(false);
    const pickedResInfo = ref({
      resInfoCode: "",
      resInfoName: "",
      resInfoStatus: 90,
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
      let file: File = upload.file;
      let dataFile = file;

      if (isNeedPartUpload.value) {
        // 不用分片上传
        rResTask.uploadRes(resTaskCode.value, file, 0, (res: any) => {
          rResTask.getResTasks(resTasks);
          refreshResInfos();
        });
      } else {
        let spark = new SparkMD5();
        let fileReader = new FileReader();
        if (dataFile.size > 1024 * 1024 * 5) {
          let data1 = dataFile.slice(0, 1024 * 1024 * 5);
          fileReader.readAsBinaryString(data1);
        } else {
          fileReader.readAsBinaryString(dataFile);
        }
        fileReader.onload = function (e: any) {
          spark.appendBinary(e.target.result);
          let md5 = spark.end();
          uploadPart(file, 0, md5);
        };
      }
    };
    const uploadPart = (file: File, num: number, md5: any) => {
      let bytesPerPiece = 5 * 1024 * 1024;
      let start = num * bytesPerPiece;
      let end = start + bytesPerPiece;
      if (start >= file.size) return;
      if (end > file.size) {
        end = file.size;
      }
      rResTask.uploadRes(
        resTaskCode.value,
        file.slice(start, end),
        num + 1,
        (res: any) => {
          rResTask.getResTasks(resTasks);
          let task = res.data;
          resInfoStatus.value = Math.ceil(task.resTaskStatus/task.partCount * 100);
          uploadPart(file, ++num, md5);
          refreshResInfos();
          rResTask.getResTasks(resTasks);
        }
      );
    };
    const beforeUpload = (file: File) => {
      // 计算总片数
      let bytesPerPiece = 5 * 1024 * 1024; // 每个文件切片大小定为50MB
      partCount.value = Math.ceil(file.size / bytesPerPiece); // 总片数
      return rResTask.createResTasks(
        {
          resInfoParentCode: pickedResInfo.value.resInfoCode,
          filename: file.name,
          partCount: partCount.value,
          fileSize: file.size,
          contentType: "application/octet-stream",
        },
        (res: any) => {
          resTaskCode.value = res.resTask.resTaskCode;
          isNeedPartUpload.value = res.partUploadId == null;
        }
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
      resInfoStatus,
      pickedResInfo,
      resTasks,
      importAction,
      submitUpload,
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
