<template>
  <div style="width: 98%" class="dropbox">
    <ResInfoSquared v-show="isSquared == 'true'" ref="resInfoSquared" />
    <div v-show="isSquared != 'true'">
      <ResInfoTable v-show="isSquared != 'true'" ref="resInfoTable" />
    </div>
  </div>
  <r-child-tag-dialog ref="rChildTagDialog" />
  <r-child-share-dialog ref="rChildShareDialog" />
  <r-child-restag-setting-dialog ref="rChildResTagSettingDialog" />
  <r-child-res-info-detail-drawer ref="rChildResInfoDetailDrawer" />
  <dialog-show-all-folder ref="dialogShowAllFolder" />
</template>
<script lang="ts">
import { defineComponent, inject, onMounted, provide, Ref, ref } from "vue";
import { fixedData } from "./ResInfoDataFixed";
import { useRouter } from "vue-router";

import RChildTagDialog from "./r_comp/tag_dialog_visible.vue";
import RChildShareDialog from "./r_comp/share_dialog_visible.vue";
import RChildResTagSettingDialog from "./r_comp/DialogResTagSetting.vue";
import DialogShowAllFolder from "./r_show_res_info/DialogShowAllFolder.vue";

import RChildResInfoDetailDrawer from "./r_comp/res_info_detail.vue";
import RResInfoOperate from "./r_comp/r_comp_res_info_operate.vue";
import ResInfoSquared from "./r_show_res_info/ResInfoSquared.vue";
import ResInfoTable from "./r_show_res_info/ResInfoTable.vue";
import { singleCommonOperate } from "./r_show_res_info/SingleOperateResInfo";
import { batchCommonOperate } from "./r_show_res_info/BatchOperateResInfo";

export default defineComponent({
  components: {
    ResInfoSquared: ResInfoSquared,
    ResInfoTable: ResInfoTable,
    "r-res-info-operate": RResInfoOperate,
    "r-child-tag-dialog": RChildTagDialog,
    "r-child-share-dialog": RChildShareDialog,
    "dialog-show-all-folder": DialogShowAllFolder,
    "r-child-restag-setting-dialog": RChildResTagSettingDialog,
    "r-child-res-info-detail-drawer": RChildResInfoDetailDrawer,
  },
  props: {
    resInfoData: [],
  },
  setup(props, context) {
    const router = useRouter();
    const { expose } = context;
    const changeSelectedInfo: any = inject("changeSelectedInfo");
    const handleTransmissionDialog: any = inject("handleTransmissionDialog");
    const refreshResInfos: any = inject("refreshResInfos");

    const parentResInfo = ref();
    const tableData = ref();

    const isSquared = ref();
    const pickedResInfo = ref();
    const resInfoSquared: Ref = ref();
    const resInfoTable: Ref = ref();
    const rChildTagDialog: Ref = ref();
    const rChildShareDialog: Ref = ref();
    const rChildResTagSettingDialog: Ref = ref();
    const dialogShowAllFolder: Ref = ref();
    const rChildResInfoDetailDrawer: Ref = ref();

    const initTableData = (resInfoData: any, parentRInfo: any) => {
      resInfoData = fixedData(resInfoData);
      tableData.value = resInfoData;
      resInfoSquared.value?.initData(resInfoData, parentRInfo);
      resInfoTable.value?.initData(resInfoData, parentRInfo);
      parentResInfo.value = parentRInfo;
    };

    onMounted(() => {
      if (localStorage.getItem("isSquared")) {
        isSquared.value = localStorage.getItem("isSquared");
      } else {
        isSquared.value = "true";
      }
    });

    expose({
      initTableData,
      initRefreshShowFlag: (squared: string) => (isSquared.value = squared),
    });

    provide("handleClickResInfo", (resInfo: any) => {
      pickedResInfo.value = resInfo;
      if (resInfo.resInfoType == "folder") {
        changeSelectedInfo(resInfo, "enter");
      }
    });

    provide("handleSelectedResInfo", (resInfo: any, action: string) => {
      singleCommonOperate(
        action,
        resInfo,
        pickedResInfo,
        router,
        (res: any) => {
          if (action == "enter") {
            pickedResInfo.value = resInfo;
            changeSelectedInfo(resInfo, "enter");
          } else if (action == "detail") {
            rChildResInfoDetailDrawer.value?.initPickedResInfo(res);
          } else if (action == "download") {
            handleTransmissionDialog("download", resInfo.resInfoCode);
          } else if (action == "share") {
            rChildShareDialog.value?.initPickedResInfo(res);
          } else if (action == "share") {
            rChildShareDialog.value?.initPickedResInfo(res);
          } else if (action == "resTagSetting") {
            rChildTagDialog.value?.initPickedResInfo(resInfo);
          }
        }
      );
    });
    provide("handleBatchResInfo", (action: string, data: any) => {
      batchCommonOperate(action, data, (sData: any) => {
        if ("tagManageSelected" == action) {
          // rChildResTagSettingDialog.value?.initResInfos(sData);
          rChildTagDialog.value?.initPickedResInfo(sData[0]);
        } else if ("download" == action) {
          handleTransmissionDialog("download", parentResInfo.value.resInfoCode);
        } else if ("moveSelected" == action) {
          console.log(sData);
          dialogShowAllFolder.value?.init(sData);
        } else if ("deleteSelected" == action) {
          refreshResInfos();
        }
      });
    });

    return {
      tableData,
      isSquared,
      resInfoSquared,
      resInfoTable,
      rChildTagDialog,
      rChildShareDialog,
      rChildResTagSettingDialog,
      dialogShowAllFolder,
      rChildResInfoDetailDrawer,
    };
  },
});
</script>

<style lang="scss" scoped></style>
