<template>
  <el-card>
    <div style="display: flex; margin-left: 10px">
      <el-table :data="tableData" @row-click="handleClickResInfo">
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
      </el-table>
      <div style="width: 40%;" v-if="selectedResInfo"> 
        <div style="font-size: var(--el-font-size-large); font-weight: bolder">资源详情</div>
        <div>
          <div v-for="item in resTags" :key="item.resTagCode" style="margin: 5px">
            <el-tag type="success">{{ item.resTagName }}</el-tag>
          </div>
          <el-descriptions :title="selectedResInfo.resInfoName" :column="1">
            <el-descriptions-item label="资源编号">{{selectedResInfo.resInfoCode}}</el-descriptions-item>
            <el-descriptions-item label="资源类型">{{selectedResInfo.resInfoType}}</el-descriptions-item>
            <el-descriptions-item label="资源路径">{{selectedResInfo.resInfoPath}}</el-descriptions-item>
            <el-descriptions-item label="资源归属者">{{selectedResInfo.resInfoOwnerId}}</el-descriptions-item>
            <el-descriptions-item label="资源所属类型">{{selectedResInfo.resInfoOwnerType}}</el-descriptions-item>
            <el-descriptions-item label="资源创建时间">{{selectedResInfo.createdUserId}}</el-descriptions-item>
            <el-descriptions-item label="资源更新时间">{{selectedResInfo.updatedTime}}</el-descriptions-item>
            <el-descriptions-item label="文件类型" v-if="selectedResInfo.resInfoType == 'file'">{{selectedResInfo.resContentType}}</el-descriptions-item>
            <el-descriptions-item label="文件大小" v-if="selectedResInfo.resInfoType == 'file'">{{selectedResInfo.resInfoSize}}</el-descriptions-item>
            <el-descriptions-item label="存储路径" v-if="selectedResInfo.resInfoType == 'file'">{{selectedResInfo.resInfoStore}}</el-descriptions-item>
          </el-descriptions>
          <el-button
            type="text"
            size="small"
            @click="enterDetail(selectedResInfo, 'download')"
            ><text v-if="selectedResInfo.resInfoType == 'folder'">进入</text
            ><text v-else>下载</text>
          </el-button>
          <el-button
            v-if="selectedResInfo.resInfoType == 'file'"
            type="text"
            size="small"
            @click="enterDetail(selectedResInfo, 'preview')"
            >预览</el-button
          >
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

interface ResInfoDef { 
  resInfoCode: String,
  resInfoName: String,
  resInfoPath: String,
  resInfoStore: String
}


export default defineComponent({
  components: {
  },
  setup(props, context) {
    const { expose } = context;
    const tableData = ref([]);
    const selectedResInfo = ref();
    const resTags = ref();
    const changeSelectedInfo: any = inject("changeSelectedInfo");

    const handleClickResInfo = (row: any, column: any, event: any) => {
      console.log(row, column, event);
      selectedResInfo.value = row;
      rResInfo.listResTag(row.resInfoCode, (res) => resTags.value = res);
    };
    const refreshSearchResInfo = (filters: any) => {
        console.log(filters, 'child');
        rResInfo.getSearchResInfos(filters, (res: any) => {
          tableData.value = res.list;
        });
    };
    const enterDetail = (resInfo: any, action: string) => {
      if (action == "download") {
        if (resInfo.resInfoType == "folder") {
          changeSelectedInfo(resInfo, 'enter');
        } else {
          rResInfo.downloadResInfo(resInfo.resInfoStore, resInfo.resInfoName);
        }
      }
    };
    expose({
        refreshSearchResInfo
    })
    return {
      tableData,
      selectedResInfo,
      resTags,
      handleClickResInfo,
      enterDetail,
      getResourceType: d_const.getResourceType,
      bUtils: b_utils,
    //   childResInfoOpModel,
    };
  },
});
</script>

<style lang="scss" scoped></style>
