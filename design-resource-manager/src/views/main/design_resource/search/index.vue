<template>
  <el-card body-style="padding: 10px;margin-left: 10px;margin-right: 10px;">
    <div style="display: flex">
      <r-show-res-info-data ref="childShowResInfoData"></r-show-res-info-data>
      <div style="width: 40%" v-if="selectedResInfo">
        <div style="font-size: var(--el-font-size-large); font-weight: bolder">
          资源详情
        </div>
        <div>
          <div
            v-for="item in resTags"
            :key="item.resTagCode"
            style="margin: 5px"
          >
            <el-tag type="success">{{ item.resTagName }}</el-tag>
          </div>
          <el-descriptions :title="selectedResInfo.resInfoName" :column="1">
            <el-descriptions-item label="资源编号">{{
              selectedResInfo.resInfoCode
            }}</el-descriptions-item>
            <el-descriptions-item label="资源类型">{{
              selectedResInfo.resInfoType
            }}</el-descriptions-item>
            <el-descriptions-item label="资源路径">{{
              selectedResInfo.resInfoPath
            }}</el-descriptions-item>
            <el-descriptions-item label="资源归属者">{{
              selectedResInfo.resInfoOwnerId
            }}</el-descriptions-item>
            <el-descriptions-item label="资源所属类型">{{
              selectedResInfo.resInfoOwnerType
            }}</el-descriptions-item>
            <el-descriptions-item label="资源创建时间">{{
              selectedResInfo.createdUserId
            }}</el-descriptions-item>
            <el-descriptions-item label="资源更新时间">{{
              selectedResInfo.updatedTime
            }}</el-descriptions-item>
            <el-descriptions-item
              label="文件类型"
              v-if="selectedResInfo.resInfoType == 'file'"
              >{{ selectedResInfo.resContentType }}</el-descriptions-item
            >
            <el-descriptions-item
              label="文件大小"
              v-if="selectedResInfo.resInfoType == 'file'"
              >{{ selectedResInfo.resInfoSize }}</el-descriptions-item
            >
            <el-descriptions-item
              label="存储路径"
              v-if="selectedResInfo.resInfoType == 'file'"
              >{{ selectedResInfo.resInfoStore }}</el-descriptions-item
            >
          </el-descriptions>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, inject, Ref, ref } from "vue";
import rResInfo from "../r_res_info";
import b_utils from "@/utils/browser_utils";
import d_const from "../constants";
import RShowResInfoData from "../r_table_res_info.vue";

export default defineComponent({
  components: {
    "r-show-res-info-data": RShowResInfoData,
  },
  setup(props, context) {
    const { expose } = context;
    const selectedResInfo = ref();
    const resTags = ref();
    const changeSelectedInfo: any = inject("changeSelectedInfo");
    const childShowResInfoData: Ref = ref();

    const handleClickResInfo = (row: any, column: any, event: any) => {
      selectedResInfo.value = row;
      rResInfo.listResTag(row.resInfoCode, (res) => (resTags.value = res));
    };
    const refreshSearchResInfo = (filters: any) => {
      rResInfo.getSearchResInfos(filters, (res: any) => {
        childShowResInfoData.value.initTableData(res.list, null);
      });
    };

    const refreshRecentResInfo = (filters: any) => {
      rResInfo.refreshRecentResInfo(filters, (res: any) => {
        childShowResInfoData.value.initTableData(res, null);
      });
    };

    expose({
      refreshSearchResInfo,
      refreshRecentResInfo
    });
    return {
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
