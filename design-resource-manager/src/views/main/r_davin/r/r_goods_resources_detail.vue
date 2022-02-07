<template>
  <div v-if="row">
    <el-descriptions :title="row.goodsCode" :column="1">
      <el-descriptions-item label="品类名称"
        >{{ row.goodsName }}
        <el-tag style="margin-left: 30px" size="small">{{
          row.goodsType
        }}</el-tag>
        <el-tag type="success" style="margin-left: 30px" size="small">{{
          row.warehouseName
        }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <el-row>
          <el-col :span="4">当前库存: {{ row.quantity }}</el-col>
          <el-col :span="4">
            <el-radio v-model="operateType" label="INPUT" size="small"
              >增加库存</el-radio
            >
            <el-radio v-model="operateType" label="OUTPUT" size="small"
              >减少库存</el-radio
            >
          </el-col>
          <el-col :span="3">
            <el-input-number size="small" v-model="quantity"></el-input-number>
          </el-col>
        </el-row>
      </el-descriptions-item>
    </el-descriptions>
    <div>
      <el-button @click="handleAction('update')" type="success" sise="small"
        >保存</el-button
      ><el-button @click="handleAction('delete')" sise="small">删除</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import r_davin from "./r_davin";

export default defineComponent({
  props: {
    row: Object,
  },
  setup(props) {
    const operateType = ref("INPUT");
    const quantity = ref(0);
    const refreshGoodsResources: any = inject("refreshGoodsResources");
    const handleAction = (action: string) => {
      if (props.row) {
        console.log(action === 'delete', operateType.value, quantity.value, props.row.goodsCode);
        r_davin.updateGoodsResource(action === 'delete', operateType.value, quantity.value, props.row.goodsCode, () => refreshGoodsResources());
      }
    };
    return {
        operateType,
      quantity,
      handleAction,
    };
  },
});
</script>
