<template>
  <div>
    <div style="margin: 5px">
      <el-button size="small" type="text"
        >已选择{{ data.filter((item) => item.selected).length }}个</el-button
      >
      <el-button size="small" @click="handleBatchOperate('cancelSelected')"
        >取消</el-button
      >
      <el-button size="small" @click="handleBatchOperate('allSelected')"
        >全选</el-button
      >
      <el-button size="small" @click="handleBatchOperate('moveSelected')"
        >移动</el-button
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
          shadow="never"
          body-style="padding: 0px;"
        >
          <div style="height: 32px; display: flex"></div>
          <div>
            <el-image
            draggable="false"
            fit="scale-down"
            style="width: 45%"
            src="https://nd-static.bdstatic.com/m-static/v20-main/img/empty-folder.55c81ea2.png"
          />
          </div>
          <el-button type="text" style="overflow: hidden">点击“上传”按钮</el-button>
        </el-card>
      </el-col>
      <el-col
        :sm="12"
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
              <el-image
                draggable="false"
                fit="scale-down"
                style="width: 50%"
                :src="item.image"
              />
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
    const focusOnResInfo = ref();
    const sourceResInfos: Ref<any> = ref([]);
    const targetResInfo: any = ref();
    const dialogShowAllFolder: Ref = ref();

    const onDrag = (event: any, resInfo: any, action: string) => {
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
            handleTransmissionDialog();
          });
        }
      }
    };

    const handleSelectedResInfo = (e: any, resInfo: any, action: string) => {
      resInfo.selected = resInfo.selected ? false : true;
      parentHandleSelectedResInfo(resInfo, action);
    };

    const handleBatchOperate = (action: string) => {
      if ("cancelSelected" == action) {
        for (let item of data.value) {
          item.selected = false;
        }
      } else if ("allSelected" == action) {
        for (let item of data.value) {
          item.selected = true;
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

    onMounted(() => {
      dh.disableDefaultDrag(document.querySelector("body"));
    });

    expose({
      initData: (d: any) => (data.value = d),
    });
    return {
      data,
      onDrag,
      handleSelectedResInfo,
      handleClickResInfo,
      focusOnResInfo,
      sourceResInfos,
      targetResInfo,
      handleBatchOperate,
      dialogShowAllFolder,
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
