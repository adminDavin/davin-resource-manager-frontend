<template>
  <div v-show="isSquared == 'true'">
    <el-row :gutter="10">
      <el-col
        :xs="12"
        :sm="8"
        :md="6"
        :lg="3"
        :xl="2"
        v-for="(item, index) in tableData"
        :key="item.id"
      >
        <el-card
          style="
            --el-card-border-color: rgb(255, 255, 240);
            text-align: center;
            margin-bottom: 5px;
          "
          shadow="hover"
          body-style="padding: 0px;"
          @click="handleSelectedResInfo(item, 'showOperate')"
          @dblclick="handleClickResInfo(item, index, $event)"
        >
          <div
            @mouseenter="handleOnResInfo(item, 'enter')"
            @mouseleave="handleOnResInfo(item, 'leave')"
          >
            <div style="height: 32px">
              <div
                style="font-size: var(--el-font-size-small); text-align: end"
                v-show="focusOnResInfo && focusOnResInfo.id == item.id"
              >
                <el-button
                  type="text"
                  @click.stop="handleSelectedResInfo(item, 'share')"
                  v-if="item.resInfoType == 'file'"
                  ><el-icon><share /></el-icon
                ></el-button>
                <el-button
                  type="text"
                  @click.stop="handleSelectedResInfo(item, 'download')"
                  v-if="item.resInfoType == 'file'"
                  ><el-icon><download /></el-icon
                ></el-button>
                <el-button
                  type="text"
                  @click.stop="handleSelectedResInfo(item, 'preview')"
                  ><el-icon><video-play /></el-icon
                ></el-button>
                <el-button
                  type="text"
                  @click.stop="handleSelectedResInfo(item, 'detail')"
                  ><el-icon><expand /></el-icon
                ></el-button>
              </div>
            </div>
            <div>
              <el-image
                fit="scale-down"
                style="width: 50%"
                v-if="item.resInfoType == 'folder'"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACoCAMAAABDlVWGAAAAwFBMVEUAAAD/2Ur/20z/203/40X//3j/yiX/zCv/3lD/2kv/yib/yiX/yib/2kr/2kr/yiX/2kv/2kv/yyb/2UT/1Tv/20H/yib/2kr/yib/2kr/yiX/20v/2kr/3Uz/5Vj/2kr/ySX/ySX/yiX/2Ur/20v/2Uz/ySj/zSf/20z/ySb/2kv/2Ur/2Ur/2Uv/yiX/0DX/yib/2Uz/yiX/yyf/20v/ySf/2kr/ySf/20z/2Uz/yyb/4k7/////2Ur/ySX/zS9+lhVZAAAAPXRSTlMAr1RGBQKWFw2o9PHt69/YiYBpKyIT+/bLwIFfWDMJ8OPHv7ePbEdBP+DU0tG8uKmnopCEd3duVU02NhoBsiz/2wAAAaxJREFUeNrt1GdSIzEQQOE2nuhsnCNhgWVzDoQW978V8J/CowkSqnrfCV5J3S0AAAAAAAAAXhVdJefDjjlg3vuw/L7+l4ovadI1NoY/b8WDaN0x1oZ/MnEsPTOldH/NxKXJqSmrdxyLM+mpqWA5FUeiM1NJ7724sTYVzY/FhbRjKksiaV5iavC1+dKoa+qQSNOuTD1emNM3+PNP5k3v/rmpSW8qjRqauixjadLzcQpiTE19uqk06KFG39oHXU8yKUedO8m3WRChTxbjLIxQ1f42kFDVURxIqLbiQEJ1FEqobkIJ7WeBhOoolNDFLJBQ3YQS2goldBEHEqp3oYTuQgn9H0roEaGEEkoooYQSSiihhBZHKKGEEkoooYQSSqgNQgkllFBCCSWUUEJtEEoooYQSSiihhBJqg9DD+urVtRT1Wb2aSlHv1Ku9FDVWnz5JYRP1aSzFDdSjnRR3qf6sxELk8UlvxMaR+pKLnQv142MmdmI/t7Q/FVv7XN0bTMTe/VhdW82klN0XdWmwiaWsdn6ijqwu91JF1P47+tFqVn7xezsTAAAAAAAAAK97BM+evOtMrXyJAAAAAElFTkSuQmCC"
              />
              <el-image
                v-else
                style="width: 50%"
                src="data:image/png;base64,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"
              />
            </div>
          </div>
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="item.resInfoName"
            placement="top-start"
          >
            <el-button type="text" style="overflow: hidden">{{
              item.resInfoName
            }}</el-button>
          </el-tooltip>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-show="isSquared == 'false'">
    <el-table :data="tableData" @row-click="handleClickResInfo">
      <el-table-column type="expand" prop="id"></el-table-column>
      <el-table-column label="文件名称" prop="resInfoName" sortable>
        <template #default="props">
          <div style="display: flex">
            <div style="margin-right: 5px">
              <el-icon
                :size="40"
                style="vertical-align: middle"
                v-if="props.row.resInfoType == 'folder'"
                ><folder
              /></el-icon>
              <el-icon :size="40" style="vertical-align: middle" v-else
                ><document
              /></el-icon>
            </div>
            <div>
              <div style="font-size: var(--el-font-size-base)">
                {{ props.row.resInfoName }}
              </div>
              <div style="font-size: var(--el-font-size-small)">
                <el-button
                  type="text"
                  @click.stop="handleResInfoTagManage(props.row)"
                  size="small"
                  >标签管理</el-button
                >
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="类别" prop="resContentType" sortable width="120">
        <template #default="props">
          {{ getResourceType(props.row) }}
        </template>
      </el-table-column>
      <el-table-column label="文件大小" prop="resInfoSize" sortable width="120">
        <template #default="props">
          {{ Math.ceil(props.row.resInfoSize / 1024) }}
          <text
            style="font-size: var(--el-font-size-small); font-weight: bolder"
            >KB</text
          >
        </template>
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
      <el-table-column fixed="right" label="" width="200">
        <template #default="props">
          <r-res-info-operate :res-info="props.row"></r-res-info-operate>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <r-child-tag-dialog ref="rChildTagDialog" />
  <r-child-share-dialog ref="rChildShareDialog" />
  <r-child-download-dialog ref="rChildDownloadDialog" />
  <r-child-res-info-detail-drawer ref="rChildResInfoDetailDrawer" />
</template>
<script lang="ts">
import { defineComponent, inject, onMounted, provide, Ref, ref } from "vue";
import b_utils from "@/utils/browser_utils";
import d_const from "./constants";
import { useRouter } from "vue-router";

import RResInfoOperate from "./manager/t_res_info_operate.vue";
import RChildTagDialog from "./r_comp/tag_dialog_visible.vue";
import RChildShareDialog from "./r_comp/share_dialog_visible.vue";
import RChildDownloadDialog from "./r_comp/download_dialog_visible.vue";
import RChildResInfoDetailDrawer from "./r_comp/res_info_detail.vue";

export default defineComponent({
  components: {
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

    const parentResInfo = ref();
    const tableData = ref();

    const isSquared = ref();
    const pickedResInfo = ref();
    const focusOnResInfo = ref();

    const rChildTagDialog: Ref = ref();
    const rChildShareDialog: Ref = ref();
    const rChildDownloadDialog: Ref = ref();
    const rChildResInfoDetailDrawer: Ref = ref();

    const initTableData = (resInfoData: any, parentRInfo: any) => {
      tableData.value = resInfoData;
      parentResInfo.value = parentRInfo;
    };

    const handleClickResInfo = (resInfo: any, column: any, event: any) => {
      pickedResInfo.value = resInfo;
      if (resInfo.resInfoType == "folder") {
        changeSelectedInfo(resInfo, "enter");
      }
    };

    const handleSelectedResInfo = (resInfo: any, action: string) => {
      if (action == "showOperate") {
        if (
          pickedResInfo.value &&
          resInfo.resInfoCode === pickedResInfo.value.resInfoCode
        ) {
          pickedResInfo.value = null;
        } else {
          pickedResInfo.value = resInfo;
        }
        return;
      }
      pickedResInfo.value = resInfo;
      if (action == "detail") {
        rChildResInfoDetailDrawer.value?.initPickedResInfo(resInfo);
      } else if (action == "download") {
        rChildDownloadDialog.value?.initPickedResInfo(resInfo);
      } else if (action == "preview") {
        const { href } = router.resolve({
          path: "/res_preview",
          query: {
            resInfoCode: resInfo.resInfoCode,
          },
        });
        window.open(href, "_blank");
      } else if (action == "share") {
        rChildShareDialog.value?.initPickedResInfo(resInfo);
      }
    };

    const handleOnResInfo = (resInfo: any, action: string) => {
      focusOnResInfo.value = resInfo;
    };

    const getResourceType = (resInfo: any) =>
      b_utils.isEmpty(resInfo.resContentType)
        ? "文件夹"
        : d_const.getResourceType(resInfo.resContentType).label;

    const handleResInfoTagManage = (resInfo: any) => {
      rChildTagDialog.value?.initPickedResInfo(resInfo);
    };
 
    expose({
      initTableData,
      initRefreshShowFlag: (squared: string) => (isSquared.value = squared),
      handleResInfoTagManage,
      handleSelectedResInfo,
    });

    provide("handleResInfoTagManage", handleResInfoTagManage);
    provide("handleSelectedResInfo", handleSelectedResInfo);

    onMounted(() => {
      if (localStorage.getItem("isSquared")) {
        isSquared.value = localStorage.getItem("isSquared");
      } else {
        isSquared.value = "true";
      }
    });

    return {
      tableData,
      parentResInfo,
      pickedResInfo,
      isSquared,
      focusOnResInfo,

      rChildTagDialog,
      rChildShareDialog,
      rChildDownloadDialog,
      rChildResInfoDetailDrawer,

      handleSelectedResInfo,
      handleOnResInfo,
      handleClickResInfo,
      getResourceType,
      handleResInfoTagManage,
    };
  },
});
</script>

<style lang="scss" scoped></style>
