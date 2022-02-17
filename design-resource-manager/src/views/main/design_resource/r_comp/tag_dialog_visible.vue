<template>
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
          v-for="item in resInfoTags"
          :key="item.resTagCode"
          >{{ item.resTagName }}</el-tag
        >
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, inject, nextTick, Ref, ref } from "vue";
import type { ElInput } from "element-plus";
import rResTag from "../r_res_tag";
import rResInfo from "../r_res_info";

interface ResTagDef {
  resTagName: string;
  resTagCode: string;
}

export default defineComponent({
  setup(props, context) {
    const { expose } = context;
    const dialogVisible = ref(false);
    const selectedTagValue = ref([]);
    const newResTagName = ref();
    const pickedResInfo = ref();
    const resInfoTags = ref<any[]>([]);
    const resTagOptions: Ref<Array<ResTagDef>> = ref([]);
    const newResTagInputVisible = ref(false);
    const InputRef = ref<InstanceType<typeof ElInput>>();

    const showInput = () => {
      newResTagInputVisible.value = true;
      nextTick(() => {
        InputRef.value!.input!.focus();
      });
    };

    /**
     * 按关键字搜索标签
     */
    const remoteAllTagMethod = (query: string) => {
      if (query) {
        rResTag.getResTags(resTagOptions, () => {});
      } else {
        resTagOptions.value = [];
      }
    };
    /**
     * 添加标签 并将标签给资源
     */
    const handleAddTagToResInfo = () => {
      if (newResTagName.value) {
        rResTag.saveResTag(newResTagName.value, (tag: any) =>
          handleSelectedTag(tag.resTagCode)
        );
      }
    };

    /**
     * 将搜索到标签给资源
     */
    const handleSelectedTag = (val: string) =>
      rResInfo.addResTag(pickedResInfo.value.resInfoCode, val, () =>
        handleResInfoTags(pickedResInfo.value)
      );
      
    /**
     * 刷新资源所拥有的标签
     */
    const handleResInfoTags = (resInfo: any) => {
      rResInfo.listResTag(
        resInfo.resInfoCode,
        (r: any) => (resInfoTags.value = r)
      );
    };

    expose({
      initPickedResInfo: (resInfo: any) => {
        pickedResInfo.value = resInfo;
        dialogVisible.value = true;
        handleResInfoTags(resInfo);
      },
    });

    return {
      InputRef,
      pickedResInfo,
      newResTagName,
      dialogVisible,
      resTagOptions,
      selectedTagValue,
      handleSelectedTag,
      resInfoTags,
      newResTagInputVisible,
      showInput,
      handleResInfoTags,
      remoteAllTagMethod,
      handleAddTagToResInfo,
    };
  },
});
</script>
