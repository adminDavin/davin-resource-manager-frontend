<template>
  <el-dialog v-model="dialogVisible" title="移动文件" width="60%">
    <div style="margin-left: 50px">
      <r-child-show-breadcrumb-res-info ref="childShowBreadcrumbResInfo" />
      <el-divider></el-divider>
      <li
        v-for="item in allChildResInfo"
        @click="handleDbClickFolder(item)"
        :key="item.id"
      >
        <el-button type="text">{{ item.resInfoName }}</el-button>
      </li>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleClickFolder()"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, inject, Ref, ref } from "vue";
import rResInfo from "../r_res_info";
import ShowBreadcrumbResInfo from "../manager/ShowBreadcrumbResInfo.vue";
import b_utils from "@/utils/browser_utils";
import { ElNotification } from "element-plus";

export default defineComponent({
  components: {
    "r-child-show-breadcrumb-res-info": ShowBreadcrumbResInfo,
  },
  setup(props, context) {
    const getRootResInfo: any = inject("getRootResInfo");
    const refreshResInfos: any = inject("refreshResInfos");
    const childShowBreadcrumbResInfo: Ref = ref();
    const rootResInfo = ref();
    const seletedData = ref();
    const sResInfoCodes: Ref<string[]> = ref([]);
    const dialogVisible = ref(false);
    const allChildResInfo = ref();
    const selectedResInfo = ref();
    const initTableData = (resInfo: any) => {
      selectedResInfo.value = resInfo;
      rResInfo.getResInfoDataByParantCode(resInfo.resInfoCode, {}, (r: any) => {
        allChildResInfo.value = r.filter(
          (item: any) => item.resInfoType == "folder"
        );
      });
    };

    const initByParentCode = (parentCode: string) => {
      if (
        b_utils.isObjEmpty(selectedResInfo) &&
        selectedResInfo.value.resInfoCode == parentCode
      ) {
        initTableData(selectedResInfo.value);
      } else {
        rResInfo.getResInfo(parentCode, selectedResInfo, (resInfo: any) => {
          initTableData(selectedResInfo.value);
          rResInfo.getAllParent(resInfo.resInfoCode, (res: any) =>
            childShowBreadcrumbResInfo.value.initAllParentResInfo(res.data)
          );
        });
      }
    };

    const handleClickFolder = () => {
      rResInfo.move(
        {
          sResInfoCodes: sResInfoCodes.value,
          tResInfoCode: selectedResInfo.value.resInfoCode,
        },
        () => {
          dialogVisible.value = false;
          refreshResInfos();
        }
      );
    };
    const handleDbClickFolder = (resInfo: any) => {
      if (sResInfoCodes.value.indexOf(resInfo.resInfoCode) < 0) {
        initByParentCode(resInfo.resInfoCode);
      } else {
        ElNotification({
          message: "不能将文件自己移动到自己内部",
          type: "warning",
          duration: 3000,
        });
      }
    };

    context.expose({
      init: (data: any) => {
        seletedData.value = data;
        for (let item of seletedData.value) {
          sResInfoCodes.value.push(item.resInfoCode);
        }
        dialogVisible.value = true;
        getRootResInfo(rootResInfo, (res: any) => {
          initByParentCode(res.resInfoCode);
        });
      },
    });
    return {
      dialogVisible,
      seletedData,
      allChildResInfo,
      childShowBreadcrumbResInfo,
      handleDbClickFolder,
      handleClickFolder,
      initByParentCode,
    };
  },
});
</script>

<style scoped>

.el-divider--horizontal {
  margin-top: 5px;
  margin-bottom: 10px;
}
</style>
