<template>
  <div style="width: 98%" class="dropbox">
    <ResInfoSquared v-show="isSquared == 'true'" ref="resInfoSquared" />
    <div v-show="isSquared != 'true'">
      <ResInfoTable v-show="isSquared != 'true'" ref="resInfoTable" />
    </div>
  </div>
  <r-child-tag-dialog ref="rChildTagDialog" />
  <r-child-share-dialog ref="rChildShareDialog" />
  <r-child-download-dialog ref="rChildDownloadDialog" />
  <r-child-res-info-detail-drawer ref="rChildResInfoDetailDrawer" />
</template>
<script lang="ts">
import { defineComponent, inject, onMounted, provide, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { fixedData } from "./ResInfoDataFixed";

import RChildTagDialog from "./r_comp/tag_dialog_visible.vue";
import RChildShareDialog from "./r_comp/share_dialog_visible.vue";
import RChildDownloadDialog from "./r_comp/download_dialog_visible.vue";
import RChildResInfoDetailDrawer from "./r_comp/res_info_detail.vue";
import RResInfoOperate from "./r_comp/r_comp_res_info_operate.vue";
import ResInfoSquared from "./r_show_res_info/ResInfoSearchSquared.vue";
import ResInfoTable from "./r_show_res_info/ResInfoSearchTable.vue";
import { singleCommonOperate } from "./r_show_res_info/SingleOperateResInfo";

export default defineComponent({
  components: {
    ResInfoSquared: ResInfoSquared,
    ResInfoTable: ResInfoTable,
    "r-res-info-operate": RResInfoOperate,
    "r-child-tag-dialog": RChildTagDialog,
    "r-child-share-dialog": RChildShareDialog,
    "r-child-download-dialog": RChildDownloadDialog,
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
    const parentResInfo = ref();
    const tableData = ref();

    const isSquared = ref();
    const pickedResInfo = ref();
    const focusOnResInfo = ref();

    const resInfoSquared: Ref = ref();
    const resInfoTable: Ref = ref();
    const rChildTagDialog: Ref = ref();
    const rChildShareDialog: Ref = ref();
    const rChildDownloadDialog: Ref = ref();
    const rChildResInfoDetailDrawer: Ref = ref();

    const initTableData = (resInfoData: any, parentRInfo: any) => {
      resInfoData = fixedData(resInfoData);
      tableData.value = resInfoData;
      resInfoSquared.value?.initData(resInfoData, parentRInfo);
      resInfoTable.value?.initData(resInfoData, parentRInfo);
      parentResInfo.value = parentRInfo;
    };

    const handleClickResInfo = (resInfo: any, column: any, event: any) => {
      pickedResInfo.value = resInfo;
      if (resInfo.resInfoType == "folder") {
        changeSelectedInfo(resInfo, "enter");
      }
    };

    const handleSelectedResInfo = (resInfo: any, action: string) => {
      singleCommonOperate(
        action,
        resInfo,
        pickedResInfo,
        router,
        (res: any) => {
          if (action == "enter") {
            changeSelectedInfo(resInfo, "enter");
          } else if (action == "detail") {
            rChildResInfoDetailDrawer.value?.initPickedResInfo(res);
          } else if (action == "download") {
            handleTransmissionDialog("download", resInfo.resInfoCode);
          } else if (action == "share") {
            rChildShareDialog.value?.initPickedResInfo(res);
          }
        }
      );
    };

    const handleOnResInfo = (resInfo: any, action: string, event) => {
      focusOnResInfo.value = resInfo;
    };

    const handleResInfoTagManage = (resInfo: any) => {
      rChildTagDialog.value?.initPickedResInfo(resInfo);
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
      handleResInfoTagManage,
    });
    provide("handleClickResInfo", handleClickResInfo);
    provide("handleResInfoTagManage", handleResInfoTagManage);
    provide("handleSelectedResInfo", handleSelectedResInfo);

    return {
      tableData,
      parentResInfo,
      pickedResInfo,
      isSquared,
      focusOnResInfo,

      resInfoSquared,
      resInfoTable,
      rChildTagDialog,
      rChildShareDialog,
      rChildDownloadDialog,
      rChildResInfoDetailDrawer,
      handleSelectedResInfo,
      handleOnResInfo,
      handleClickResInfo,
      handleResInfoTagManage,
    };
  },
});
</script>

<style lang="scss" scoped></style>
