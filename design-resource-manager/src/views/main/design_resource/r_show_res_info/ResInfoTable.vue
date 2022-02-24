<template>
  <div>
    <div style="margin: 0px 5px 0px 5px">
      <el-checkbox
        v-model="allSelectedFlag"
        @click="handleBatchOperate('allSelected')"
      />
      <el-button type="text" style="margin-bottom: 8px; margin-left: 10px"
        >已选择{{ data.filter((item) => item.selected).length }}个</el-button
      >
      <el-button
        size="small"
        style="margin-bottom: 8px"
        @click="handleBatchOperate('moveSelected')"
        >移动</el-button
      >
      <el-button
        size="small"
        style="margin-bottom: 8px"
        @click="handleBatchOperate('deleteSelected')"
        >删除</el-button
      >
      <el-button
        size="small"
        style="margin-bottom: 8px"
        @click="handleBatchOperate('tagManageSelected')"
        >设置标签</el-button
      >
      <dialog-show-all-folder ref="dialogShowAllFolder" />
    </div>
    <el-table :data="data" @row-dblclick="handleClickResInfo">
      <el-table-column label="文件名称" prop="resInfoName" sortable>
        <template #default="props">
          <div
            style="display: flex"
            :draggable="true"
            @dragstart="onDrag($event, props.row, 'dragstart')"
            @drop="onDrag($event, props.row, 'drop')"
            @dragover.prevent
            @mouseenter="handleResInfoMouseOver(props.row)"
            @mouseleave="handleResInfoMouseOver(props.row)"
          >
            <el-checkbox
              v-model="props.row.selected"
              class="ml20r10"
              @click.stop=""
            />
            <el-image
              fit="scale-down"
              style="width: 55px"
              :src="props.row.image"
            />
            <div>
              <div style="font-size: var(--el-font-size-base)">
                {{ props.row.resInfoName }}
              </div>
              <div v-show="focusOnResInfo && focusOnResInfo.id == props.row.id">
                <r-res-info-operate :item="props.row" />
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="类别"
        prop="category"
        width="120"
      ></el-table-column>
      <el-table-column label="大小" prop="size" sortable width="120">
      </el-table-column>
      <el-table-column
        label="最后一次修改"
        prop="updatedTime"
        sortable
        width="160"
      >
        <template #default="props">
          <div style="font-size: var(--el-font-size-base)">
            {{ props.row.updatedTime }}
          </div>
          <div
            style="font-size: var(--el-font-size-small); font-weight: bolder"
          >
            {{ props.row.updatedUserId }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-card
      style="text-align: center; margin-bottom: 5px"
      shadow="hover"
      @click="handleUploadResource"
      body-style="padding: 0px;"
    >
      <div @drop="onDrag($event, null, 'drop')" @dragover.prevent>
        <div style="font-size: 20px; margin-top: 5px; color: darkviolet">+</div>
        <el-button type="text">点击“上传”按钮</el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, onMounted, provide, Ref, ref } from "vue";
import RResInfoOperate from "../r_comp/r_comp_res_info_operate.vue";
import dh from "./DragActionHandle";
import DialogShowAllFolder from "./DialogShowAllFolder.vue";
import { ElNotification } from "element-plus";
import rResInfo from "../r_res_info";

export default defineComponent({
  components: {
    "r-res-info-operate": RResInfoOperate,
    "dialog-show-all-folder": DialogShowAllFolder,
  },

  setup(props, context) {
    const { expose } = context;
    const parentHandleSelectedResInfo: any = inject("handleSelectedResInfo");
    const handleClickResInfo: any = inject("handleClickResInfo");
    const refreshResInfos: any = inject("refreshResInfos");
    const handleTransmissionDialog: any = inject("handleTransmissionDialog");

    const data: Ref<any[]> = ref([]);
    const pResInfo = ref();
    const focusOnResInfo = ref();
    const sourceResInfos: Ref<any> = ref([]);
    const targetResInfo: any = ref();
    const dialogShowAllFolder: Ref = ref();
    const allSelectedFlag = ref(false);

    const onDrag = (event: any, resInfo: any, action: string) => {
      resInfo = resInfo ? resInfo : pResInfo.value;
      if ("dragstart" == action) {
        sourceResInfos.value = [resInfo];
      } else if ("drop" == action) {
        if (event.dataTransfer.files.length == 0) {
          targetResInfo.value = resInfo;
          dh.dropForMove(sourceResInfos.value, resInfo, () =>
            refreshResInfos()
          );
        } else {
          dh.dropForUpload(event.dataTransfer.files, resInfo, () => {
            refreshResInfos();
            handleTransmissionDialog("show", pResInfo.value.resInfoCode);
          });
        }
      }
    };

    const handleSelectedResInfo = (e: any, resInfo: any, action: string) => {
      resInfo.selected = resInfo.selected ? false : true;
      parentHandleSelectedResInfo(resInfo, action);
    };

    const handleBatchOperate = (action: string) => {
      if ("allSelected" == action) {
        for (let item of data.value) {
          item.selected = !allSelectedFlag.value;
        }
      } else if ("moveSelected" == action) {
        let seletedData = data.value.filter((item) => item.selected);
        if (seletedData.length > 0) {
          dialogShowAllFolder.value?.init(seletedData);
        } else {
          ElNotification({
            message: "请选择文件",
            type: "warning",
            duration: 3000,
          });
        }
      } else if ("deleteSelected" == action) {
        let seletedData = data.value.filter((item) => item.selected);
        if (seletedData.length == 0) {
          ElNotification({
            message: "请选择文件",
            type: "warning",
            duration: 3000,
          });
        } else {
          for (let item of seletedData) {
            rResInfo.delete(item.resInfoCode, () => refreshResInfos());
          }
        }
      } else if ("tagManageSelected" == action) {
        let seletedData = data.value.filter((item) => item.selected);
      }
    };

    const handleUploadResource = () =>
      handleTransmissionDialog("create", pResInfo.value.resInfoCode);
    onMounted(() => dh.disableDefaultDrag(document.querySelector("body")));
    expose({
      initData: (d: any, temPResInfo: any) => (
        (data.value = d), (pResInfo.value = temPResInfo)
      ),
    });
    return {
      data,
      onDrag,
      allSelectedFlag,
      handleSelectedResInfo,
      handleClickResInfo,
      focusOnResInfo,
      sourceResInfos,
      targetResInfo,
      handleBatchOperate,
      dialogShowAllFolder,
      handleUploadResource,
      handleResInfoMouseOver: (resInfo: any) =>
        (focusOnResInfo.value = resInfo),
    };
  },
});
</script>
<style scoped>
.ml20r10 {
  margin-right: 20px;
  margin-left: 10px;
}
</style>
