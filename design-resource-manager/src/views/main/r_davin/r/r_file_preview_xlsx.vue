<template>
  <div v-if="uploadFile">
    <el-descriptions title="关键列映射" :column="3">
      <el-descriptions-item
        :label="item.label"
        v-for="item in defaultImportColumns"
        :key="item.label"
      >
        第
        <el-input-number size="small" :controls="false" v-model="item.index"></el-input-number> 列
      </el-descriptions-item>
    </el-descriptions>
    <div>
      <el-button @click="handleImportAction" type="success">确定导入</el-button>
    </div>
    <el-table :data="excelContent['tableData']" border>
      <el-table-column
        :prop="item"
        :label="item"
        v-for="item in excelContent['tableColum']"
        :key="item"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import xlsx_utils from "@/utils/preview/xlsx";
import XLSX, { WorkBook } from "xlsx";
import constants from "./constants";
import r_davin from "./r_davin";

export default defineComponent({
  props: {
    uploadFile: File,
    importActionType: String,
  },
  setup(props, context) {
    const { expose } = context;
    const excelContent = ref({});
    const defaultImportColumns = ref();
    const renderImportActionType = (importActionType: string) => {
      excelContent.value = { tableColum: [], tableData: [] };
      defaultImportColumns.value = JSON.parse(
        JSON.stringify(constants.defaultImportColumns[importActionType])
      );
    };
    const renderFile = (uploadFile: File) => {
      xlsx_utils.file2Xce(uploadFile, (wb: WorkBook) => {
        let sheetNames = wb.SheetNames;
        let result = {};
        for (let item in sheetNames) {
          result[sheetNames[item]] = XLSX.utils.sheet_to_json(
            wb.Sheets[sheetNames[item]]
          );
        }
        let tempTesult = result[sheetNames[0]];
        let tableColum: Array<string> = [];
        if (tempTesult.length > 0) {
          tableColum = Object.keys(tempTesult[0]);
        }
        excelContent.value = { tableColum: tableColum, tableData: tempTesult };
      });
    };
    const handleImportAction = () => {
      console.log(excelContent.value, defaultImportColumns.value);
      if (props.importActionType) {
        r_davin.importAction(
        props.importActionType,
        excelContent.value,
        defaultImportColumns.value,
        (res: any) => {
          console.log(res);
          context.emit("normalCloseModel");
        }
      );
      }
      
    };
    expose({
      renderImportActionType,
    });
    onMounted(() => {
      if (props.importActionType) {
        defaultImportColumns.value = JSON.parse(
          JSON.stringify(constants.defaultImportColumns[props.importActionType])
        );
      }
      if (props.uploadFile) {
        renderFile(props.uploadFile);
      }
    });
    watch(
      () => props.uploadFile,
      (newValue, oldValue) => {
        if (newValue && oldValue) {
          if (newValue.name !== oldValue.name) {
            renderFile(newValue);
          }
        }
      }
    );
    return {
      defaultImportColumns,
      excelContent,
      handleImportAction,
    };
  },
});
</script>
