<template>
  <el-table :data="appData" @row-click="showDaglog">
    <el-table-column fixed prop="id" label="序号" width="80" />
    <!-- <el-table-column prop="appInfoCode" label="应用编码" /> -->
    <el-table-column prop="appInfoName" label="应用名称" />
    <el-table-column prop="appInfoLogo" label="应用logo">
      <template #default="scope">
        <div v-if="scope.row.appInfoLogo">
          <el-image style="width: 40px" :src="scope.row.appInfoLogo"></el-image>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="appInfoLink" label="应用链接" />
    <el-table-column prop="appInfoType" label="应用类型" />
    <el-table-column prop="ownerId" label="应用负责人" />
    <el-table-column label="标签">
      <template #default="scope">
        <div v-if="scope.row.custTagInfos">
          <el-tag
            style="margin-left: 10px"
            v-for="item in scope.row.custTagInfos"
            :key="item.id"
            >{{ item.tagInfoName }}</el-tag
          >
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="updatedTime" label="更新时间" width="180" />
  </el-table>
  <el-button class="mt-4" style="width: 100%" @click="showDaglog(null)">
    添加应用
  </el-button>
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="60%">
    <el-descriptions :column="1" :title="selectItem.tagGroupCode">
      <el-descriptions-item label="应用名称">
        <el-input v-model="selectItem.appInfoName" placeholder="应用名称" />
      </el-descriptions-item>
      <el-descriptions-item label="应用logo">
        <div style="display:flex">
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
              </div>
            </template>
          </el-upload>
          <el-image
            style="height:100px"
            :src="selectItem.appInfoLogo"
          ></el-image>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="应用链接">
        <el-input v-model="selectItem.appInfoLink" placeholder="应用链接" />
      </el-descriptions-item>
      <el-descriptions-item label="应用类型">
        <el-input v-model="selectItem.appInfoType" placeholder="应用类型" />
      </el-descriptions-item>
      <el-descriptions-item label="应用负责人">
        <el-input v-model="selectItem.ownerId" placeholder="应用负责人" />
      </el-descriptions-item>
    </el-descriptions>
    <div>关联标签</div>
    <el-select
      v-model="selectItem.tagInfoCodes"
      multiple
      placeholder="添加标签"
      style="width: 100%"
      size="small"
    >
      <el-option
        v-for="item in tagInfos"
        :key="item.tagInfoCode"
        :label="item.tagInfoName"
        :value="item.tagInfoCode"
      />
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmDaglogChange">
          保存
        </el-button>
        <el-button type="primary" @click="deleteTagInfo"> 删除应用 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import apiCust from "../api_cust";
import apiCustApp from "../api_cust_app";
import ColorPicker from "colorpicker-v3";
export default defineComponent({
  components: {
    ColorPicker: ColorPicker,
  },
  setup() {
    const appData = ref<any[]>([]);
    const tagInfos = ref<any>([]);

    const dialogVisible = ref(false);
    const dialogTitle = ref();
    const selectItem = ref();
    const showDaglog = (item: any) => {
      dialogVisible.value = true;

      if (item == null) {
        dialogTitle.value = "新增标签组";
        selectItem.value = {
          id: null,
          appInfoAttrs: {},
          appInfoLink: "",
          appInfoLogo: "",
          appInfoName: "",
          appInfoType: "",
          ownerId: localStorage.getItem("userId"),
        };
      } else {
        selectItem.value = item;
        if (!selectItem.value.appInfoAttrs) {
          selectItem.value.appInfoAttrs = {};
        }
        if (selectItem.value.custTagInfos) {
          selectItem.value.tagInfoCodes = selectItem.value.custTagInfos.map(
            (i: any) => {
              return i.tagInfoCode;
            }
          );
        } else {
          selectItem.value.tagInfoCodes = [];
        }

        dialogTitle.value = "编辑标签组";
      }
    };
    const confirmDaglogChange = () => {
      dialogVisible.value = false;
      if (selectItem.value.id == null) {
        apiCustApp.createAppInfo(selectItem.value, (r: any) => {
          if (selectItem.value.tagInfoCodes.length > 0) {
            selectItem.value.id = r.id;
            let params = {
              id: r.id,
              tagInfoCodes: selectItem.value.tagInfoCodes,
            };
            apiCustApp.addToTagApp(params, () => {
              alert("保存成功");
              apiCustApp.listAppInfo((res: any) => (appData.value = res));
            });
          } else {
            alert("保存成功");
            apiCustApp.listAppInfo((res: any) => (appData.value = res));
          }
        });
      } else {
        apiCustApp.modifyAppInfo(selectItem.value, () => {
          let params = {
            id: selectItem.value.id,
            tagInfoCodes: selectItem.value.tagInfoCodes,
          };
          apiCustApp.addToTagApp(params, () => {
            alert("保存成功");
            apiCustApp.listAppInfo((res: any) => (appData.value = res));
          });
        });
      }
    };
    const deleteTagInfo = () => {
      dialogVisible.value = false;
      apiCustApp.deleteAppInfo(selectItem.value, () => {
        alert("删除成功");
        apiCustApp.listAppInfo((res: any) => (appData.value = res));
      });
    };
    const submitUpload = (upload: any) => {
      let file: File = upload.file;
      apiCustApp.uploadRes(file, (res: any) => {
        console.log(res);
        selectItem.value.appInfoLogo = `/api/cust/cust/file/download?resInfoStore=${res.data}`;
      });
    };
    onMounted(() => {
      apiCustApp.listAppInfo((res: any) => (appData.value = res));
      apiCust.listTagInfo((res: any) => (tagInfos.value = res));
    });
    return {
      appData,
      showDaglog,
      dialogTitle,
      dialogVisible,
      selectItem,
      confirmDaglogChange,
      deleteTagInfo,
      tagInfos,
      submitUpload,
      handleChange: (files: any, fileList: any) => {
        if (fileList.length > 1) {
          fileList.splice(0, 1);
        }
      },
    };
  },
});
</script>
