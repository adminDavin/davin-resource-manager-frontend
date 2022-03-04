<template>
  <div>
    <div style="padding-top: 8px; padding-left: 20px; background-color: floralwhite">
      <el-checkbox
        v-model="allSelectedFlag"
        size="small"
        @change="handleBatchOperate('allSelected')"
      />
      <el-button type="text" style="margin-bottom: 6px; margin-left: 10px"
        >已选择{{ data.filter((item) => item.selected).length }}个</el-button
      >
      <el-button size="small" style="margin-bottom: 6px;" @click="handleBatchOperate('moveSelected')"
        >移动</el-button
      >
      <el-button size="small" style="margin-bottom: 6px;" @click="handleBatchOperate('download')"
        >下载</el-button
      >
      <el-button size="small" style="margin-bottom: 6px;" @click="handleBatchOperate('shareSelected')"
        >分享</el-button
      >
      <el-button size="small" style="margin-bottom: 6px;" @click="handleBatchOperate('deleteSelected')"
        >删除</el-button
      >
      <el-button size="small" style="margin-bottom: 6px;" @click="handleBatchOperate('tagManageSelected')"
        >设置标签</el-button
      >
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
              style="width: 55px; height: 55px"
              v-if="props.row.preImageSrc"
              :src="props.row.preImageSrc"
              :preview-src-list="[props.row.preImageSrc]"
            ></el-image>
            <text
              v-else
              class="tz-icon-docu"
              :style="getResInfoStyle(props.row, [55, 55])"
            ></text>
            <div style="margin-left: 5px">
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
import { defineComponent, inject, onMounted, Ref, ref } from "vue";
import RResInfoOperate from "../r_comp/r_comp_res_info_operate.vue";
import dh from "./DragActionHandle";
import DocuIcon from "../DocuIcon";

export default defineComponent({
  components: {
    "r-res-info-operate": RResInfoOperate,
  },

  setup(props, context) {
    const { expose } = context;
    const parentHandleSelectedResInfo: any = inject("handleSelectedResInfo");
    const handleClickResInfo: any = inject("handleClickResInfo");
    const refreshResInfos: any = inject("refreshResInfos");
    const handleTransmissionDialog: any = inject("handleTransmissionDialog");
    const handleBatchResInfo: any = inject("handleBatchResInfo");

    const data: Ref<any[]> = ref([]);
    const pResInfo = ref();
    const focusOnResInfo = ref();
    const sourceResInfos: Ref<any> = ref([]);
    const targetResInfo: any = ref();
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
      if (action == "allSelected") {
        for (let item of data.value) {
          item.selected = allSelectedFlag.value;
        }
      } else {
        handleBatchResInfo(action, data);
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
      getResInfoStyle: DocuIcon.getResInfoStyle,
      allSelectedFlag,
      handleSelectedResInfo,
      handleClickResInfo,
      focusOnResInfo,
      sourceResInfos,
      targetResInfo,
      handleBatchOperate,
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
