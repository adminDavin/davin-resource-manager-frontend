<template>
  <el-button size="small" @click="importAction('importSaleGoodsResource')">{{
    actions.importSaleGoodsResource
  }}</el-button>
  <el-button size="small" @click="importAction('importRestGoodsResource')">{{
    actions.importRestGoodsResource
  }}</el-button>
  <el-drawer
    v-model="drawer"
    size="80%"
    :with-header="false"
    :before-close="handleClose"
  >
    <div style="font-size: var(--el-font-size-large); font-weight: bolder">
      {{ actions[importActionType] }}
    </div>
    <el-container>
      <el-main>
        <div
          v-if="!uploadFile || Object.keys(uploadFile).length == 0"
          style="text-align: center; margin-top: 100px"
        >
          <el-upload
            drag
            action=""
            :http-request="submitUpload"
            :on-change="handleChange"
            :show-file-list="false"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              将文件拖动到此处 or <em>点击上传文件</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                一次只能上传一个文件，最新上传的文件会覆盖掉旧的文件
            <el-button @click="downloadTempleteXlsx" size="small">下载模版</el-button>
              </div>
            </template>
          </el-upload>
        </div>
        <div v-else>
          <div style="display: flex">
            <el-upload
              action=""
              :http-request="submitUpload"
              :on-change="handleChange"
              :show-file-list="false"
            >
              <el-button size="small">重新选择文件</el-button>
            </el-upload>
            <div style="font-size: var(--el-font-size-small); margin-top: 3px">
              文件名称: {{ uploadFile.name }} 文件类型: {{ uploadFile.type }}
            </div>
          </div>
          <r-file-preview-xlsx
            ref="getRFilePreviewXlsx"
            :upload-file="uploadFile"
            :import-action-type="importActionType"
            @normal-close-model="handleModelNormalClose"
          ></r-file-preview-xlsx>
        </div>
      </el-main>
    </el-container>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref, Ref } from "vue";
import rFilePreviewXlsx from "./r_file_preview_xlsx.vue";
import { ElMessageBox } from "element-plus";
// import templateRestGoodsResources from '@/assets/r_davin/库存模版-v1.xlsx';

export default defineComponent({
  components: {
    "r-file-preview-xlsx": rFilePreviewXlsx,
  },
  setup() {
    const drawer = ref(false);
    const importActionType = ref();
    const getRFilePreviewXlsx: Ref = ref();
    const uploadFile = ref();
    // const tempLateDownloadResource = reactive({
    //   importRestGoodsResource: templateRestGoodsResources
    // });
    const refreshGoodsResources: any = inject("refreshGoodsResources");
    const importAction = (actionType: string) => {
      drawer.value = true;
      importActionType.value = actionType;
      uploadFile.value = null;
      getRFilePreviewXlsx.value?.renderImportActionType(actionType);
    };
    const handleClose = (done: () => void) => {
      ElMessageBox.confirm("确定放弃导入?").then(() => {
        uploadFile.value = null;
        done();
      });
    };
    const handleModelNormalClose = () => {
      drawer.value = false;
      refreshGoodsResources();
    };
    const submitUpload = (upload: any) => {
      let file: File = upload.file;
      uploadFile.value = file;
      console.log(file);
    };
    const downloadTempleteXlsx = () => {
      if (importActionType.value == 'importRestGoodsResource') {
        window.open('./库存模版-v1.xlsx');
      } else {
        window.open('./销售模版-v1.xlsx');
      }
    };
    return {
      getRFilePreviewXlsx,
      actions: {
        importSaleGoodsResource: "导入销售数量",
        importRestGoodsResource: "导入库存存量",
      },
      drawer,
      handleClose,
      handleModelNormalClose,
      importAction,
      importActionType,
      submitUpload,
      uploadFile,
      downloadTempleteXlsx,
      handleChange: (files: any, fileList: any) => {
        if (fileList.length > 1) {
          fileList.splice(0, 1);
        }
      },
    };
  },
});
</script>
<style lang="scss" scoped>
.el-drawer__header {
  margin-bottom: 0px;
}
</style>
