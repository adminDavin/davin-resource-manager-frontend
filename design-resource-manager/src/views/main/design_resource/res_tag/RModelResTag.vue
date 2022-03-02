<template>
  <div style="display: flex">
    <text
      style="
        font-size: var(--el-font-size-base);
        font-weight: bolder;
        margin-top: 8px;
      "
      >常用标签:
    </text>
    <div style="width: 70%">
      <el-tag
        v-for="item in resTags"
        :key="item.resTagCode"
        style="margin: 5px"
        type="success"
        @click="handleTagSeleted(item)"
        >{{ item.resTagName }}</el-tag
      >
    </div>
    <el-button
      size="small"
      type="primary"
      style="margin-left: 10px; margin-top: 5px"
      @click="actionManageResTag"
      >标签管理</el-button
    >
  </div>
  <el-drawer v-model="drawer" size="50%" :with-header="false">
    <div style="font-size: var(--el-font-size-large); font-weight: bolder">
      资源标签管理
    </div>
    <el-divider content-position="right">我的自定义标签</el-divider>
    <div>
      <div style="margin-top: 20px">
        <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button
          v-else
          class="button-new-tag ml-1"
          size="small"
          @click="showInput"
        >
          + 添加标签
        </el-button>
      </div>
      <div>
        <div
          v-for="item in resTags"
          :key="item.resTagCode"
          style="margin: 5px; display: flex"
        >
          <el-tag type="success" @close="handleClose(item)" closable>{{
            item.resTagName
          }}</el-tag>
          <text
            style="
              margin: 5px;
              padding-bottom: 2px;
              font-size: var(--el-font-size-small);
            "
            >添加时间: {{ item.createdTime }}</text
          >
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from "vue";
import rResTag from "../r_res_tag";
import type { ElInput } from "element-plus";

export default defineComponent({
  setup(props, context) {
    const { expose } = context;
    const drawer = ref(false);
    const resTags = ref([
      { resTagName: "", resTagCode: "", createdTime: undefined },
    ]);

    const inputValue = ref("");
    const inputVisible = ref(false);
    const InputRef = ref<InstanceType<typeof ElInput>>();

    const handleClose = (resTag: any) => {
      rResTag.deleteResTag(resTag.resTagCode, () => {
        rResTag.getResTags(resTags, () => {});
      });
    };

    const showInput = () => {
      inputVisible.value = true;
      nextTick(() => {
        InputRef.value!.input!.focus();
      });
    };

    const handleInputConfirm = () => {
      if (inputValue.value) {
        rResTag.saveResTag(inputValue.value, () => {
          inputVisible.value = false;
          inputValue.value = "";
          rResTag.getResTags(resTags, () => {});
        });
      }
      inputVisible.value = false;
      inputValue.value = "";
    };
    const importAction = () => {
      drawer.value = true;
      rResTag.getResTags(resTags, () => {});
    };
    const actionManageResTag = () => {
      importAction();
    };
    const handleTagSeleted = (resTag: any) => {
      console.log(resTag);
    };
    onMounted(() => rResTag.getResTags(resTags, () => {}));
    expose({
      importAction,
    });
    return {
      drawer,
      resTags,
      inputValue,
      inputVisible,
      showInput,
      handleClose,
      handleInputConfirm,
      actionManageResTag,
      handleTagSeleted,
    };
  },
});
</script>
<style lang="scss" scoped>
.el-divider--horizontal {
  margin-top: 10px;
  margin-bottom: 15px;
}
</style>
