<template>
  <el-row style="margin-left: 10px; margin-top: 10px">
    <el-col :xs="22" :sm="14" :md="16" :lg="12">
      <el-input
        v-model="input"
        placeholder="请输入搜索内容"
        @keyup.enter="handleInputConfirm"
      >
        <template #prepend>
          <el-select v-model="select" style="width: 100px" size="small">
            <el-option label="按资源名" value=""></el-option>
            <el-option label="按标签名" value="resTag"></el-option>
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="handleInputConfirm"></el-button>
        </template>
      </el-input>
      <!-- <el-radio-group v-model="radio" @change="handleRadioChange">
        <el-radio label="" size="small">全部</el-radio>
        <el-radio label="folder" size="small">仅目录</el-radio>
        <el-radio label="file" size="small">仅文件</el-radio>
      </el-radio-group> -->
    </el-col>
    <el-col :sm="8" :md="6" :lg="4">
      <el-button
        style="margin-top: 7px;margin-left: 20px"
        size="small"
        type="info"
        @click="handleTransmissionDialog"
        >传输列表</el-button
      ><el-button
        style="margin-top: 7px"
        size="small"
        type="success"
        @click="handleTransmissionDialog"
        >标签管理</el-button
      >
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent, inject, Ref, ref } from "vue";
import { Search } from "@element-plus/icons-vue";

export default defineComponent({
  setup(props, context) {
    const input = ref("");
    const select = ref("");
    const radio = ref("");
    const selectedTag: Ref<string[]> = ref([]);
    const handleTransmissionDialog: any = inject("handleTransmissionDialog");
    const handleSearchContentAction: any = inject("handleSearchContentAction");

    const handleInputConfirm = () => {
      handleSearchContentAction(initSearchData(), null);
    };

    const handleRadioChange = (val: any) => {
      let filters = initSearchData();
      filters.resInfoType = val;
      handleSearchContentAction(filters, null);
    };

    const initSearchData = () => {
      return {
        searchKey: input.value,
        searchType: select.value,
        resInfoType: radio.value,
        resTagCodes: selectedTag.value,
      };
    };

    context.expose({"init": initSearchData});

    return {
      Search,
      radio,
      select,
      input,
      handleTransmissionDialog,
      handleInputConfirm,
      handleRadioChange,
    };
  },
});
</script>
