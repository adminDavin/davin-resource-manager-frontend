<template>
  <el-table :data="goodsResources" style="width: 90%">
    <!-- <el-table-column prop="id" label="序号" width="60" /> -->
    <el-table-column
      prop="goodsCode"
      label=""
      width="20"
      sortable
      type="expand"
    >
      <template #default="props">
        <r-goods-resources-detail :row="props.row"></r-goods-resources-detail>
      </template>
    </el-table-column>
    <el-table-column
      prop="warehouseName"
      label="所在仓库"
      width="160"
      column-key="warehouseName"
      :filters="warehousesFilters"
      :filter-method="filterHandler"
    />
    <el-table-column prop="goodsCode" label="品类编号" width="120" sortable />
    <el-table-column prop="goodsName" label="品类名称" width="200" />
    <el-table-column prop="goodsType" label="品类类型" width="80" />
    <el-table-column prop="quantity" label="剩余库存" width="100" />
    <el-table-column
      prop="updatedTime"
      label="最近一次更新时间"
      sortable
      width="160"
    />
    <el-table-column prop="createdTime" label="添加时间" sortable width="160" />
    <el-table-column prop="createdTime" label="添加时间" sortable width="160" />
  </el-table>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import RGoodsResourcesDetail from './r_goods_resources_detail.vue';

export default defineComponent({
  props: {
    goodsResources: Object,
    warehousesFilters: Object,
  },
  components: {
    'r-goods-resources-detail': RGoodsResourcesDetail
  },
  setup() {
    const filterHandler = (
      value: string,
      row: any,
      column: TableColumnCtx<any>
    ) => {
      const property = column["property"];
      return row[property] === value;
    };
    return {
      filterHandler,
    };
  },
});
</script>
