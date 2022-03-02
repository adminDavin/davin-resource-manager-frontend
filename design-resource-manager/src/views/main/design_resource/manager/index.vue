<template>
  <div style="margin: 5px">
    <r-child-add-res-info-operate ref="childAddResInfoOperate"/>
    <el-row style="display: flex">
      <el-col :sm="24" :md="16" :lg="19">
        <div style="margin-left: 10px; display: flex" v-if="selectedResInfo">
          <el-button type="text" style="margin-top: 5px;margin-right: 20px;" @click="initByParentCode(selectedResInfo.resInfoParentCode)" v-if="selectedResInfo.resInfoParentCode">回到上一步</el-button>
          <r-child-show-breadcrumb-res-info ref="childShowBreadcrumbResInfo" />
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
import { defineComponent, provide, Ref, ref } from "vue";
import rResInfo from "../r_res_info";
import b_utils from "@/utils/browser_utils";
import RShowResInfoData from "../RManagerResInfo.vue";
import SquaredResInfo from "./SquaredResInfo.vue";
import AddResInfoOperate from "./AddResInfoOperate.vue";
import ShowBreadcrumbResInfo from "./ShowBreadcrumbResInfo.vue";

export default defineComponent({
  components: {
    "r-show-res-info-data": RShowResInfoData,
    "r-child-squared-res-info": SquaredResInfo,
    "r-child-add-res-info-operate": AddResInfoOperate,
    "r-child-show-breadcrumb-res-info": ShowBreadcrumbResInfo,
  },
  setup(props, context) {
    const { expose } = context;
    const selectedResInfo = ref();
    const childShowResInfoData: Ref = ref();
    const childAddResInfoOperate: Ref = ref();
    const childShowBreadcrumbResInfo: Ref = ref();
    const allParentResInfo = ref<any[]>([]);
    const resInfoTotal = ref(0);

    const initTableData = (resInfo: any) => {
      selectedResInfo.value = resInfo;
      childAddResInfoOperate.value?.initSelectedResInfo(resInfo);
      initShowResInfoData(resInfo);
    };
    const initShowResInfoData = (resInfo: any) => {
      rResInfo.getResInfoDataByParantCode(resInfo.resInfoCode, {}, (r: any) => {
        resInfoTotal.value = r.length;
        childShowResInfoData.value?.initTableData(r, resInfo);
      });
    };

    const initShowSortedResInfoData = (
      sortedFiled: string,
      sortedType: string
    ) => {
      let resInfo = selectedResInfo.value;
      const params = [{ sortedFiled, sortedType }];
      rResInfo.getResInfoDataByParantCode(
        resInfo.resInfoCode,
        { sorted: params },
        (r: any) => {
          resInfoTotal.value = r.length;
          childShowResInfoData.value.initTableData(r, resInfo);
        }
      );
    };

    const backToParent = () =>
      initByParentCode(selectedResInfo.value.resInfoParentCode);

    const initByParentCode = (parentCode: string) => {
      if (
        b_utils.isObjEmpty(selectedResInfo) &&
        selectedResInfo.value.resInfoCode == parentCode
      ) {
        initTableData(selectedResInfo.value);
      } else {
        rResInfo.getResInfo(parentCode, selectedResInfo, (resInfo: any) => {
          initTableData(resInfo);
          rResInfo.getAllParent(resInfo.resInfoCode, (res: any) =>
            childShowBreadcrumbResInfo.value.initAllParentResInfo(res.data)
          );
        });
      }
    };

    provide("refreshResInfos", () =>
      initShowResInfoData(selectedResInfo.value)
    );

    provide("initByParentCode", (parentCode: string) =>
      initByParentCode(parentCode)
    );

    provide("handleDropdown", (dropdownItem: any) =>
      initShowSortedResInfoData(dropdownItem, "desc")
    );

    provide("setSquared", (isSquared: string) =>
      childShowResInfoData.value.initRefreshShowFlag(isSquared)
    );

    expose({
      initOnMount: (resInfoCode: string) => initByParentCode(resInfoCode),
    });
    return {
      allParentResInfo,
      selectedResInfo,
      childShowResInfoData,
      childShowBreadcrumbResInfo,
      childAddResInfoOperate,
      resInfoTotal,
      initByParentCode,
      backToParent,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0px 0px 0px;
}
</style>
