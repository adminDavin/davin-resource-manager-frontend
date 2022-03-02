<template>
  <div style="margin: 5px">
    <r-child-add-res-info-operate ref="childAddResInfoOperate" />
    <el-row style="display: flex">
      <el-col :sm="24" :md="16" :lg="19">
        <div style="margin-left: 10px">
          <el-breadcrumb separator="<">
            <el-breadcrumb-item>
              <el-button
                type="text"
                style="margin-bottom: 5px"
                @click="handleToRootResInfo"
              >
                全部文件
              </el-button>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <el-button type="text" style="margin-bottom: 5px">
                搜索中...
              </el-button>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
      <el-col :sm="24" :md="8" :lg="5">
        <div style="display: flex; margin-top: 7px">
          <div style="font-size: var(--el-font-size-base); margin-top: 2px">
            已全部加载 共 {{ resInfoTotal }} 个
          </div>
          <r-child-squared-res-info />
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <r-show-res-info-data ref="childShowResInfoData" />
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, provide, Ref, ref } from "vue";
import rResInfo from "../r_res_info";
import b_utils from "@/utils/browser_utils";
import d_const from "../constants";
import RShowResInfoData from "../RSearchResInfo.vue";
import SquaredResInfo from "../manager/SquaredResInfo.vue";
import ShowBreadcrumbResInfo from "../manager/ShowBreadcrumbResInfo.vue";
import AddResInfoOperate from "../manager/AddResInfoOperate.vue";

export default defineComponent({
  components: {
    "r-show-res-info-data": RShowResInfoData,
    "r-child-squared-res-info": SquaredResInfo,
    "r-child-add-res-info-operate": AddResInfoOperate,
    "r-child-show-breadcrumb-res-info": ShowBreadcrumbResInfo,
  },
  setup(props, context) {
    const { expose } = context;
    const handleToRootResInfo: any = inject("handleToRootResInfo");
    const selectedResInfo = ref();
    const resTags = ref();
    const childShowResInfoData: Ref = ref();
    const resInfoTotal = ref(0);
    const childShowBreadcrumbResInfo: Ref = ref();

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
      childShowBreadcrumbResInfo,
      handleClickResInfo,
      handleToRootResInfo,
      getResourceType: d_const.getResourceType,
      bUtils: b_utils,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0px 0px 0px;
}
</style>
