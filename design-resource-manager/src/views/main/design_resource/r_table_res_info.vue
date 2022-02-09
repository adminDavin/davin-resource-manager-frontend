<template>
  <div style="width:100%">
    <el-table
      :data="tableData"
      :expand-row-keys="expandRowKeys"
      :row-key="getRowKey"
      @expand-change="expandChange"
    >
      <el-table-column type="expand" prop="id"></el-table-column>
      <el-table-column label="文件名称" prop="resInfoName" sortable>
        <template #default="props">
          <div style="display: flex">
            <div style="margin-right: 5px">
              <el-icon
                style="vertical-align: middle"
                v-if="props.row.resInfoType == 'folder'"
                ><folder
              /></el-icon>
              <el-icon style="vertical-align: middle" v-else
                ><document
              /></el-icon>
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
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, Ref, ref } from "vue";
import b_utils from "@/utils/browser_utils";
import d_const from "./constants";
import RResInfoOperate from "./manager/t_res_info_operate.vue";

export default defineComponent({
  components: {
    "r-res-info-operate": RResInfoOperate,
  },
  props: {
    resInfoData: [],
  },
  setup(props, context) {
    const { expose } = context;
    const selectedResInfo = ref();
    const parentResInfo = ref();
    const tableData = ref();
    const childResInfoOpModel: Ref = ref();
    const expandRowKeys = ref([]);

    const initTableData = (resInfoData: any, parentRInfo: any) => {
      tableData.value = resInfoData;
      parentResInfo.value = parentRInfo;
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

    expose({
      initTableData,
    });

    return {
      tableData,
      selectedResInfo,
      childResInfoOpModel,
      expandRowKeys,
      expandChange,
      getRowKey,
      handleClickResInfo,
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
