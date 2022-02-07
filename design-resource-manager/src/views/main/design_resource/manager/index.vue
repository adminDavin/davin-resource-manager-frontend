<template>
  <el-card body-style="padding: 0px;">
    <div style="margin-top: 10px; margin-left: 10px" v-if="selectedResInfo">
      <div :xs="24" :sm="8" :md="8" :lg="4">
        <el-button
          @click="createResourceAction('file')"
          type="success"
          size="small"
          >上传文件</el-button
        >
        <el-popover v-model:visible="visible" placement="bottom" :width="200">
          <el-input
            v-model="inputResInfoPath"
            size="small"
            placeholder="请输入目录名"
          />
          <div style="text-align: right; margin-top: 10px">
            <el-button size="small" type="text" @click="visible = false"
              >cancel</el-button
            >
            <el-button size="small" type="primary" @click="inputResInfoConform"
              >confirm</el-button
            >
          </div>
          <template #reference>
            <el-button @click="visible = true" size="small">新建目录</el-button>
          </template>
        </el-popover>
      </div>
      <r-model-transmission ref="childModelTransmission" />
    </div>

    <div style="margin-top: 10px; margin-left: 10px" v-if="selectedResInfo">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="(item, index) in selectedResInfo.resInfoPath.split('/')"
          style=""
          :key="index"
        >
          <div v-if="index == 0">
            <el-link
              v-if="selectedResInfo.resInfoName != '/'"
              @click="backToParent"
              >返回上一级 |
            </el-link>
            <text> 全部文件</text>
          </div>
          <div v-else>{{ item }}</div>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="display: flex; margin-left: 10px" v-if="selectedResInfo">
      <el-table
        :data="tableData"
        style="width: 95%"
        :expand-row-keys="expandRowKeys"
        :row-key="getRowKey"
        @expand-change="expandChange"
      >
        <el-table-column type="expand" prop="id">
          <template #default="props">
            <r-res-info-small-detail
              :res-info-code="props.row.resInfoCode"
            ></r-res-info-small-detail>
          </template>
        </el-table-column>
        <el-table-column label="文件名称" prop="resInfoName" sortable>
          <template #default="props">
            <div style="display: flex">
              <div style="margin-right: 5px">
                <el-icon style="vertical-align: middle;" v-if="props.row.resInfoType == 'folder'"
                  ><folder
                /></el-icon>
                <el-icon style="vertical-align: middle;" v-else><document /></el-icon>
              </div>
              <div>{{ props.row.resInfoName }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="文件类型"
          prop="resContentType"
          width="130px"
          sortable
        >
          <template #default="props">
            <text>{{
              bUtils.isEmpty(props.row.resContentType)
                ? ""
                : getResourceType(props.row.resContentType).label
            }}</text>
          </template>
        </el-table-column>
        <el-table-column label="修改时间" prop="updatedTime" sortable />
        <el-table-column label="文件大小" prop="resInfoSize" sortable>
          <template #default="props">
            {{ Math.ceil(props.row.resInfoSize / 1024) }}
            <text
              style="font-size: var(--el-font-size-small); font-weight: bolder"
              >KB</text
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="">
          <template #default="props">
            <r-res-info-operate :res-info="props.row"></r-res-info-operate>
          </template>
        </el-table-column>
      </el-table>
      <r-res-info-op-model ref="childResInfoOpModel"></r-res-info-op-model>
    </div>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, onMounted, provide, Ref, ref } from "vue";
import rResInfo from "../r_res_info";
import RModelTransmission from "./r_model_transmission.vue";
import TResInfoOperate from "./t_res_info_operate.vue";
import RResInfoOpModel from "./t_res_info_model.vue";
import t_res_info_small_detail from "./t_res_info_small_detail.vue";
import b_utils from "@/utils/browser_utils";
import d_const from "../constants";

export default defineComponent({
  components: {
    "r-model-transmission": RModelTransmission,
    "r-res-info-operate": TResInfoOperate,
    "r-res-info-op-model": RResInfoOpModel,
    "r-res-info-small-detail": t_res_info_small_detail,
  },
  setup(props, context) {
    const { expose } = context;
    const selectedResInfo = ref();
    const tableData = ref([]);
    const inputFlag = ref(false);
    const visible = ref(false);
    const inputResInfoPath = ref();
    const childModelTransmission: Ref = ref();
    const childResInfoOpModel: Ref = ref();
    const expandRowKeys = ref([]);

    const initTableData = (resInfo: any) => {
      selectedResInfo.value = resInfo;
      rResInfo.getChildResInfos(selectedResInfo.value.resInfoCode, tableData);
    };

    const createResourceAction = (resType: string) => {
      if (resType == "file") {
        let resInfo = selectedResInfo.value;
        childModelTransmission.value?.importAction(
          resInfo.resInfoCode,
          resInfo.resInfoPath
        );
      }
    };
    const backToParent = () => {
      console.log(selectedResInfo.value.resInfoParentCode);
      rResInfo.getResInfo(
        selectedResInfo.value.resInfoParentCode,
        selectedResInfo,
        (resInfo: any) =>
          rResInfo.getChildResInfos(resInfo.resInfoCode, tableData)
      );
    };
    const enterDetail = (resInfo: any, action: string) => {
      if (action == "download") {
        if (resInfo.resInfoType == "folder") {
          selectedResInfo.value = resInfo;
          rResInfo.getChildResInfos(
            selectedResInfo.value.resInfoCode,
            tableData
          );
        } else {
          rResInfo.downloadResInfo(resInfo.resInfoStore, resInfo.resInfoName);
        }
      } else if (action == "rename") {
        rResInfo.rename(resInfo.resInfoCode, "davin", () =>
          rResInfo.getChildResInfos(
            selectedResInfo.value.resInfoCode,
            tableData
          )
        );
      } else if (action == "delete") {
        rResInfo.delete(resInfo.resInfoCode, () =>
          rResInfo.getChildResInfos(
            selectedResInfo.value.resInfoCode,
            tableData
          )
        );
      }
    };
    const inputResInfoConform = () => {
      visible.value = false;
      if (b_utils.isEmpty(inputResInfoPath.value)) {
        return;
      }
      rResInfo.createFolder(
        inputResInfoPath.value,
        selectedResInfo,
        (resInfo) => {
          rResInfo.getChildResInfos(resInfo.resInfoCode, tableData);
        }
      );
      inputResInfoPath.value = null;
    };
    const handleClickResInfo = (row: any, column: any, event: any) => {
      console.log(row, column, event);
    };
    const getRowKey = (row: any) => {
      return row.resInfoCode;
    };
    const expandChange = (row: any, expandedRows: any) => {
      if (expandedRows.length > 0) {
      } else if (expandedRows.length > 1) {
        if (row.resInfoCode) {
          expandRowKeys.value.slice(-1);
        }
      }

      console.log(row.resInfoCode, expandedRows.length);
    };

    provide("refreshResInfos", () =>
      rResInfo.getChildResInfos(selectedResInfo.value.resInfoCode, tableData)
    );
    provide("changeSelectedInfo", (resInfo: any, action: string) => {
      if ("enter" == action) {
        selectedResInfo.value = resInfo;
        rResInfo.getChildResInfos(resInfo.resInfoCode, tableData);
      } else {
        childResInfoOpModel.value?.importAction(
          resInfo.resInfoCode,
          resInfo.resInfoName,
          action
        );
      }
    });

    expose({
      initTableData,
      initOnMount: (resInfoCode: string) => {
        rResInfo.getResInfo(resInfoCode, selectedResInfo, (resInfo: any) =>
          rResInfo.getChildResInfos(resInfo.resInfoCode, tableData)
        );
      },
    });
    return {
      tableData,
      selectedResInfo,
      childModelTransmission,
      childResInfoOpModel,
      inputFlag,
      inputResInfoPath,
      visible,
      expandRowKeys,
      expandChange,
      getRowKey,
      handleClickResInfo,
      inputResInfoConform,
      createResourceAction,
      backToParent,
      enterDetail,
      getResourceType: d_const.getResourceType,
      bUtils: b_utils,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-card__body {
  padding: 0px;
}
</style>
