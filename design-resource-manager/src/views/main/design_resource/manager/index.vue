<template>
  <div style="margin: 5px">
    <el-row>
      <el-col :sm="24" :md="5" :lg="4"
        ><r-child-add-res-info-operate ref="childAddResInfoOperate"
      /></el-col>
      <el-col :sm="12" :md="14" :lg="16">
        <r-child-show-breadcrumb-res-info ref="childShowBreadcrumbResInfo" />
      </el-col>
      <el-col :sm="24" :md="3" :lg="4">
        <div style="display: flex">
          <div style="margin: 7px">
            <text
              style="font-size: var(--el-font-size-small)"
              >已全部加载 共 {{ resInfoTotal }} 个</text
            >
          </div>
          <r-child-squared-res-info />
        </div>
      </el-col>
    </el-row>

    <r-show-res-info-data ref="childShowResInfoData" />
  </div>
</template>
<script lang="ts">
import { defineComponent, provide, Ref, ref } from "vue";
import rResInfo from "../r_res_info";
import b_utils from "@/utils/browser_utils";
import RShowResInfoData from "../r_table_res_info.vue";
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

<style lang="scss" scoped></style>
