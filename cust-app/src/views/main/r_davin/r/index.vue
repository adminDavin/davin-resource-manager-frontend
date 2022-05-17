<template>
  <el-tabs
    v-model="activeName"
    @tab-click="handleClick"
    style="margin-right: 20px; margin-left: 20px"
  >
    <el-tab-pane label="品类列表" name="first">
      <el-row>
        <el-col
          :xs="24"
          :sm="6"
          :md="5"
          :lg="5"
          :xl="4"
          style="text-align: left"
        >
          <r-model-import ref="rModelImportComp" />
        </el-col>
        <el-col :xs="24" :sm="18" :md="19" :lg="19" :xl="20">
          <div style="text-align: right">
            <el-button
              size="small"
              :loading="loadingFlag"
              @click="refreshGoodsResources"
              >刷新</el-button
            >
          </div>
          <r-goods-resources
            :goods-resources="goodsResources"
            :warehouses-filters="warehousesFilters"
          ></r-goods-resources>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="仓库列表" name="second">
      <el-table :data="warehouses" style="width: 90%">
        <el-table-column prop="id" label="仓库ID" width="120" sortable />
        <el-table-column
          prop="warehouseCode"
          label="仓库编码"
          width="200"
        /><el-table-column prop="warehouseName" label="仓库名称" width="200" />
        <el-table-column
          prop="createdTime"
          label="添加时间"
          width="200"
        /> </el-table
    ></el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
import { defineComponent, onMounted, provide, ref } from "vue";
import type { ElTable } from "element-plus";
import r_davin from "./r_davin";
import rModelMmport from "./r_model_import.vue";
import rGoodsResources from "./r_goods_resources.vue";

export default defineComponent({
  components: {
    "r-model-import": rModelMmport,
    "r-goods-resources": rGoodsResources,
  },
  setup() {
    const activeName = ref("first");

    const warehouses: any = ref([]);
    const warehousesFilters: any = ref([]);
    const goodsResources = ref<InstanceType<typeof ElTable>>();

    onMounted(() => {
      r_davin.loadWarehouses(warehouses, warehousesFilters);
      r_davin.loadGoods(goodsResources, {});
    });

    const loadingFlag = ref(false);
    provide("refreshGoodsResources", () =>
      r_davin.loadGoods(goodsResources, { loadingFlag: loadingFlag })
    );
    return {
      activeName,
      handleClick: (tab: string, event: Event) => console.log(tab, event),

      warehouses,
      warehousesFilters,
      goodsResources,

      loadingFlag,
      refreshGoodsResources: () =>
        r_davin.loadGoods(goodsResources, { loadingFlag: loadingFlag }),
    };
  },
});
</script>
