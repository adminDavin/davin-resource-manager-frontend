<template>
  <el-card>
    <div
      style="margin-top: 5px; display: flex; width: 100%"
      v-if="selectedResInfo"
    >
      <div :xs="24" :sm="8" :md="8" :lg="4">
        <el-button
          @click="createResourceAction('file')"
          type="success"
          size="small"
          >上传文件</el-button
        >
        <el-popover v-model:visible="visible" placement="bottom" :width="200">
          <el-input
            v-model="inputResInfoPath"
            size="small"
            placeholder="请输入目录名"
          />
          <div style="text-align: right; margin-top: 10px">
            <el-button size="small" type="text" @click="visible = false"
              >cancel</el-button
            >
            <el-button size="small" type="primary" @click="inputResInfoConform"
              >confirm</el-button
            >
          </div>
          <template #reference>
            <el-button @click="visible = true" size="small"
              >新建文件夹</el-button
            >
          </template>
        </el-popover>
      </div>
      <div style="margin-left: 30px; display: flex" v-if="selectedResInfo">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="(item, index) in allParentResInfo"
            :key="index"
          >
            <el-button type="text" @click="initByParentCode(item.resInfoCode)">
              {{ item.resInfoName == "/" ? "全部文件" : item.resInfoName }}
            </el-button>
          </el-breadcrumb-item>
          <el-breadcrumb-item />
        </el-breadcrumb>
      </div>
      <r-model-transmission ref="childModelTransmission" />
    </div>

    <div style="width: 100%; margin: 10px">
      <div style="text-align: end; margin-right: 10px">
        <text style="font-size: var(--el-font-size-small); margin-right: 10px"
          >已全部加载 共 {{ resInfoTotal }} 个</text
        >
        <el-dropdown
          type="text"
          placement="top"
          @command="handleDropdown"
          style="margin-top: 6px; margin-right: 10px"
        >
          <el-icon :size="20" style="background-color: lavenderblush"
            ><sort
          /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="res_info_name"
                >文件名称</el-dropdown-item
              >
              <el-dropdown-item command="res_info_size"
                >文件大小</el-dropdown-item
              >
              <el-dropdown-item command="updated_time"
                >更新时间</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button v-show="isSquared == 'true'" type="text">
          <el-icon
            @click="setSquared()"
            :size="20"
            style="background-color: lavenderblush"
            ><grid
          /></el-icon>
        </el-button>
        <el-button v-show="isSquared != 'true'" type="text">
          <el-icon
            @click="setSquared()"
            :size="20"
            style="background-color: lavenderblush"
            ><operation
          /></el-icon>
        </el-button>
      </div>
    </div>
    <r-show-res-info-data ref="childShowResInfoData"></r-show-res-info-data>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, onMounted, provide, Ref, ref } from "vue";
import rResInfo from "../r_res_info";
import RModelTransmission from "./r_model_transmission.vue";
import b_utils from "@/utils/browser_utils";
import RShowResInfoData from "../r_table_res_info.vue";

export default defineComponent({
  components: {
    "r-model-transmission": RModelTransmission,
    "r-show-res-info-data": RShowResInfoData,
  },
  setup(props, context) {
    const { expose } = context;
    const selectedResInfo = ref();
    const inputFlag = ref(false);
    const visible = ref(false);
    const inputResInfoPath = ref();
    const childModelTransmission: Ref = ref();
    const childShowResInfoData: Ref = ref();
    const allParentResInfo = ref<any[]>([]);
    const isSquared = ref();
    const resInfoTotal = ref();

    var setSquared = () => {
      if (isSquared.value == "true") {
        isSquared.value = "false";
      } else {
        isSquared.value = "true";
      }
      childShowResInfoData.value.initRefreshShowFlag(isSquared.value);
      localStorage.setItem("isSquared", isSquared.value);
    };
    const initTableData = (resInfo: any) => {
      selectedResInfo.value = resInfo;
      initShowResInfoData(resInfo);
    };
    const initShowResInfoData = (resInfo: any) => {
      rResInfo.getResInfoDataByParantCode(resInfo.resInfoCode, {}, (r: any) => {
        resInfoTotal.value = r.length;
        console.log(resInfoTotal.value);
        childShowResInfoData.value.initTableData(r, resInfo);
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
          console.log(resInfoTotal.value);
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
          rResInfo.getAllParent(resInfo.resInfoCode, (res: any) => {
            allParentResInfo.value = res.data;
          });
        });
      }
    };

    // 创建文件
    const createResourceAction = (resType: string) => {
      if (resType == "file") {
        let resInfo = selectedResInfo.value;
        childModelTransmission.value?.importAction(
          resInfo.resInfoCode,
          resInfo.resInfoPath
        );
      }
    };
    // 创建目录
    const inputResInfoConform = () => {
      visible.value = false;
      if (!b_utils.isEmpty(inputResInfoPath.value)) {
        rResInfo.createFolder(
          inputResInfoPath.value,
          selectedResInfo,
          (resInfo: any) => initShowResInfoData(selectedResInfo.value)
        );
      }
      inputResInfoPath.value = null;
    };

    const handleDropdown = (dropdownItem: any) => {
      initShowSortedResInfoData(dropdownItem, "desc");
    };

    provide("refreshResInfos", () =>
      initShowResInfoData(selectedResInfo.value)
    );
    expose({
      initOnMount: (resInfoCode: string) => initByParentCode(resInfoCode),
    });

    onMounted(() => {
      if (localStorage.getItem("isSquared")) {
        isSquared.value = localStorage.getItem("isSquared");
      } else {
        isSquared.value = "true";
      }
    });
    return {
      inputFlag,
      inputResInfoPath,
      visible,
      allParentResInfo,
      selectedResInfo,
      childModelTransmission,
      childShowResInfoData,
      resInfoTotal,
      isSquared,
      handleDropdown,
      setSquared,
      initByParentCode,
      inputResInfoConform,
      createResourceAction,
      backToParent,
    };
  },
});
</script>

<style lang="scss" scoped></style>
