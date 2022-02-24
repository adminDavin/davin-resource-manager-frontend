<template>
  <div style="margin: 5px">
    <div style="text-align: end; margin-right: 40px">
      <text style="font-size: var(--el-font-size-small); margin-right: 10px"
        >已全部加载 共 {{ resInfoTotal }} 个</text
      >
      <r-child-squared-res-info></r-child-squared-res-info>
    </div>
    <r-show-res-info-data ref="childShowResInfoData"></r-show-res-info-data>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, provide, Ref, ref } from "vue";
import rResInfo from "../r_res_info";
import b_utils from "@/utils/browser_utils";
import d_const from "../constants";
import RShowResInfoData from "../r_table_res_info.vue";
import SquaredResInfo from "../manager/SquaredResInfo.vue";

export default defineComponent({
  components: {
    "r-show-res-info-data": RShowResInfoData,
    "r-child-squared-res-info": SquaredResInfo,
  },
  setup(props, context) {
    const { expose } = context;
    const selectedResInfo = ref();
    const resTags = ref();
    const childShowResInfoData: Ref = ref();
    const resInfoTotal = ref(0);

    const handleClickResInfo = (row: any, column: any, event: any) => {
      selectedResInfo.value = row;
      rResInfo.listResTag(row.resInfoCode, (res) => (resTags.value = res));
    };
    const initShowResInfoData = (filters: any) => {
      rResInfo.getSearchResInfos(filters, (res: any) => {
        resInfoTotal.value = res.list.length;
        childShowResInfoData.value.initTableData(res.list, null);
      });
    };
    const refreshSearchResInfo = (filters: any) => {
      initShowResInfoData(filters);
    };

    const refreshRecentResInfo = (filters: any) => {
      rResInfo.refreshRecentResInfo(filters, (res: any) => {
        resInfoTotal.value = res.length;
        childShowResInfoData.value.initTableData(res, null);
      });
    };

    const initShowSortedResInfoData = (
      sortedFiled: string,
      sortedType: string
    ) => {
      let resInfo = selectedResInfo.value;
      const params = [{ sortedFiled, sortedType }];
      // rResInfo.getResInfoDataByParantCode(
      //   resInfo.resInfoCode,
      //   { sorted: params },
      //   (r: any) => {
      //     resInfoTotal.value = r.length;
      //     console.log(resInfoTotal.value);
      //     childShowResInfoData.value.initTableData(r, resInfo);
      //   }
      // );
    };

    provide("handleDropdown", (dropdownItem: any) =>
      initShowSortedResInfoData(dropdownItem, "desc")
    );
    provide("setSquared", (isSquared: string) =>
      childShowResInfoData.value.initRefreshShowFlag(isSquared)
    );
    expose({
      refreshSearchResInfo,
      refreshRecentResInfo,
    });
    return {
      resInfoTotal,
      selectedResInfo,
      resTags,
      childShowResInfoData,
      handleClickResInfo,
      getResourceType: d_const.getResourceType,
      bUtils: b_utils,
    };
  },
});
</script>

<style lang="scss" scoped></style>
