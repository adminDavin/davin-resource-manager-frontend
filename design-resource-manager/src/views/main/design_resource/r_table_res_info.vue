<template>
  <div style="width: 100%">
    <div style="width: 100%">
      <div style="text-align: end">
        <el-button
          v-if="!parentResInfo"
          type="text"
          @click="handleToRootResInfo"
          size="small"
          >返回至根路径</el-button
        >
      </div>
    </div>
    <el-table
      :data="tableData"
      :expand-row-keys="expandRowKeys"
      :row-key="getRowKey"
      @row-click="handleClickResInfo"
      @expand-change="expandChange"
    >
      <el-table-column type="expand" prop="id"></el-table-column>
      <el-table-column label="文件名称" prop="resInfoName" sortable>
        <template #default="props">
          <div style="display: flex">
            <div style="margin-right: 5px">
              <el-icon
                :size="40"
                style="vertical-align: middle"
                v-if="props.row.resInfoType == 'folder'"
                ><folder
              /></el-icon>
              <el-icon :size="40" style="vertical-align: middle" v-else
                ><document
              /></el-icon>
            </div>
            <div>
              <div style="font-size: var(--el-font-size-base)">
                {{ props.row.resInfoName }}
              </div>

              <div style="font-size: var(--el-font-size-base)">
                <el-tag
                  type="success"
                  style="margin: 5px"
                  size="small"
                  v-for="item in handleResInfoTags(props.row)"
                  :key="item.resTagCode"
                  >{{ item.resTagName }}</el-tag
                >
              </div>
              <div style="font-size: var(--el-font-size-small)">
                <el-button
                  type="text"
                  @click.stop="handleToRootResInfo"
                  size="small"
                  >评论</el-button
                >
                <el-button
                  type="text"
                  @click.stop="handleToRootResInfo"
                  size="small"
                  >提醒关注 0</el-button
                >
                <el-button
                  type="text"
                  @click.stop="handleResInfoTagManage(props.row)"
                  size="small"
                  >标签管理</el-button
                >
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="类别" prop="resContentType" sortable width="120">
        <template #default="props">
          {{ getResourceType(props.row) }}
        </template>
      </el-table-column>
      <el-table-column label="文件大小" prop="resInfoSize" sortable width="120">
        <template #default="props">
          {{ Math.ceil(props.row.resInfoSize / 1024) }}
          <text
            style="font-size: var(--el-font-size-small); font-weight: bolder"
            >KB</text
          >
        </template>
      </el-table-column>
      <el-table-column
        label="最后一次修改"
        prop="updatedTime"
        sortable
        width="160"
      >
        <template #default="props">
          <div style="font-size: var(--el-font-size-base)">
            {{ props.row.updatedTime }}
          </div>
          <div
            style="font-size: var(--el-font-size-small); font-weight: bolder"
          >
            {{ props.row.updatedUserId }}
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="" width="200">
        <template #default="props">
          <r-res-info-operate :res-info="props.row"></r-res-info-operate>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="标签管理" width="60%">
      <div style="height: 400px">
        <text
          style="
            margin-right: 10px;
            font-size: var(--el-font-size-small);
            margin-top: 4px;
          "
        >
          搜索标签
        </text>
        <el-select
          v-model="selectedTagValue"
          filterable
          remote
          size="small"
          placeholder="搜索标签"
          :remote-method="remoteAllTagMethod"
          @change="handleSelectedTag"
        >
          <el-option
            v-for="item in resTagOptions"
            :key="item.resTagCode"
            :label="item.resTagName"
            :value="item.resTagCode"
          >
          </el-option>
        </el-select>

        <el-divider content-position="right"
          ><el-input
            v-if="newResTagInputVisible"
            ref="InputRef"
            v-model="newResTagName"
            style="width: 100px"
            size="small"
            @keyup.enter="handleAddTagToResInfo"
            @blur="handleAddTagToResInfo"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag ml-1"
            size="small"
            @click="showInput"
          >
            + New Tag
          </el-button></el-divider
        >

        <div style="font-size: var(--el-font-size-base)">
          <el-tag
            type="success"
            style="margin: 5px"
            size="small"
            v-for="item in handleResInfoTags(pickedResInfo)"
            :key="item.resTagCode"
            >{{ item.resTagName }}</el-tag
          >
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, nextTick, Ref, ref } from "vue";
import b_utils from "@/utils/browser_utils";
import d_const from "./constants";
import RResInfoOperate from "./manager/t_res_info_operate.vue";
import rResTag from "./r_res_tag";
import rResInfo from "./r_res_info";
import type { ElInput } from "element-plus";

interface ResTagDef {
  resTagName: string;
  resTagCode: string;
}

export default defineComponent({
  components: {
    "r-res-info-operate": RResInfoOperate,
  },
  props: {
    resInfoData: [],
  },
  setup(props, context) {
    const { expose } = context;
    const parentResInfo = ref();
    const tableData = ref();
    const refreshResInfos: any = inject("refreshResInfos");
    const handleToRootResInfo: any = inject("handleToRootResInfo");
    const expandRowKeys = ref([]);
    const dialogVisible = ref(false);
    const pickedResInfo = ref();
    const resTagOptions: Ref<Array<ResTagDef>> = ref([]);
    const selectedTagValue = ref([]);
    const newResTagName = ref();
    const newResTagInputVisible = ref(false);
    const InputRef = ref<InstanceType<typeof ElInput>>();

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

    const getResourceType = (resInfo: any) => {
      console.log(resInfo.resContentType);
      return b_utils.isEmpty(resInfo.resContentType)
        ? "文件夹"
        : d_const.getResourceType(resInfo.resContentType).label;
    };

    const handleResInfoTags = (resInfo: any) => {
      if (resInfo.tags) {
        return resInfo.tags;
      } else {
        return [];
      }
    };
    const handleResInfoTagManage = (resInfo: any) => {
      console.log(resInfo);
      pickedResInfo.value = resInfo;
      dialogVisible.value = true;
    };

    const remoteAllTagMethod = (query: string) => {
      if (query) {
        rResTag.getResTags(resTagOptions, () => {});
      } else {
        resTagOptions.value = [];
      }
    };
    const handleTagSelect = (item: any) => {
      console.log(item);
    };

    const handleAddTagToResInfo = () => {
      if (newResTagName.value) {
        rResTag.saveResTag(newResTagName.value, (res: any) => handleSelectedTag(res.resTagCode));
      }
    };
    const handleSelectedTag = (val: string) => {
      rResInfo.addResTag(pickedResInfo.value.resInfoCode, val, () => {
        rResInfo.listResTag(
          pickedResInfo.value.resInfoCode,
          (r: any) => (pickedResInfo.value.tags = r)
        );
        refreshResInfos();
      });
    };
    const showInput = () => {
      newResTagInputVisible.value = true;
      nextTick(() => {
        InputRef.value!.input!.focus();
      });
    };
    expose({
      initTableData,
    });

    return {
      tableData,
      parentResInfo,
      handleToRootResInfo,
      expandRowKeys,
      dialogVisible,
      selectedTagValue,
      resTagOptions,
      pickedResInfo,
      newResTagName,
      newResTagInputVisible,
      InputRef,
      handleAddTagToResInfo,
      handleSelectedTag,
      showInput,
      expandChange,
      getRowKey,
      handleClickResInfo,
      getResourceType,
      handleTagSelect,
      handleResInfoTagManage,
      handleResInfoTags,
      remoteAllTagMethod,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-card__body {
  padding: 0px;
}
</style>
