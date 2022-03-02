<template>
  <div>
    <div style="margin: 0px 5px 0px 5px; background-color: floralwhite">
      <el-checkbox
        v-model="allSelectedFlag"
        @click="handleBatchOperate('allSelected')"
      />
      <el-button type="text" style="margin-bottom: 2px; margin-left: 10px"
        >已选择{{ data.filter((item) => item.selected).length }}个</el-button
      >
      <el-button size="small" @click="handleBatchOperate('moveSelected')"
        >移动</el-button
      >
      <el-button size="small" @click="handleBatchOperate('download')"
        >下载</el-button
      >
      <el-button size="small" @click="handleBatchOperate('shareSelected')"
        >分享</el-button
      >
      <el-button size="small" @click="handleBatchOperate('deleteSelected')"
        >删除</el-button
      >
      <el-button size="small" @click="handleBatchOperate('tagManageSelected')"
        >设置标签</el-button
      >
      <dialog-show-all-folder ref="dialogShowAllFolder" />
    </div>
    <el-row :gutter="5">
      <el-col :sm="12" :md="6" :lg="3">
        <el-card
          style="text-align: center; margin-bottom: 5px"
          shadow="hover"
          @click="handleUploadResource"
          body-style="padding: 0px;"
        >
          <div @drop="onDrag($event, null, 'drop')" @dragover.prevent>
            <div style="font-size: 72px; margin-top: 15px; color: darkviolet">
              +
            </div>
            <el-button type="text">点击“上传”按钮</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col
        :sm="8"
        :md="6"
        :lg="3"
        v-for="(item, index) in data"
        :key="item.id"
      >
        <el-card
          style="text-align: center; margin-bottom: 5px"
          shadow="never"
          body-style="padding: 0px;"
          @click.stop="handleSelectedResInfo($event, item, 'showOperate')"
          @dblclick.stop="handleClickResInfo(item, index, $event)"
        >
          <div
            :draggable="true"
            @dragstart="onDrag($event, item, 'dragstart')"
            @drop="onDrag($event, item, 'drop')"
            @dragover.prevent
          >
            <div
              @mouseenter="handleResInfoMouseOver(item)"
              @mouseleave="handleResInfoMouseOver(item)"
            >
              <div style="height: 32px; display: flex">
                <el-checkbox
                  v-model="item.selected"
                  class="ml20r10"
                  @click.stop=""
                />
                <div v-show="focusOnResInfo && focusOnResInfo.id == item.id">
                  <r-res-info-operate :item="item" />
                </div>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <text
                  class="tz-icon-docu"
                  :style="getResInfoStyle(item, [76, 76])"
                ></text>
              </div>
            </div>
            <el-tooltip :content="item.resInfoName" placement="bottom">
              <el-button type="text" style="overflow: hidden">{{
                item.resInfoName
              }}</el-button>
            </el-tooltip>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, onMounted, Ref, ref } from "vue";
import RResInfoOperate from "../r_comp/r_comp_res_info_operate.vue";
import dh from "./DragActionHandle";
import DialogShowAllFolder from "./DialogShowAllFolder.vue";
import DocuIcon from "../DocuIcon";
import { batchCommonOperate } from "./BatchOperateResInfo";

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
          dh.dropForUpload(event.dataTransfer, resInfo, () => {
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
      batchCommonOperate(action, data, allSelectedFlag.value, (sData: any) => {
        if ("tagManageSelected" == action) {
        } else if ("download" == action) {
          handleTransmissionDialog("download", pResInfo.value.resInfoCode);
        } else if ("moveSelected" == action) {
          dialogShowAllFolder.value?.init(sData);
          refreshResInfos();
        } else {
          refreshResInfos();
        }
        
      });
    };

    const handleUploadResource = () => {
      handleTransmissionDialog("create", pResInfo.value.resInfoCode);
    };
    
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
