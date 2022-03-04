<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item-group>
      <template #title><span>Group One</span></template>
      <el-menu-item index="1-1">item one</el-menu-item>
      <el-menu-item index="1-2">item two</el-menu-item>
    </el-menu-item-group>
  </el-menu>

  <el-row v-if="resInfo" style="margin-top: 30px; margin-left: 10px">
    <div>
      <text
        class="tz-icon-docu"
        :style="getResInfoStyle(resInfo, [20, 20])"
      ></text>
      {{ resInfo }}
    </div>
  </el-row>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import DocuIcon from "@/views/main/design_resource/DocuIcon";

export default defineComponent({
  setup(props, context) {
    const resInfo = ref();
    const isCollapse = ref(false);
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };

    context.expose({
      init: (res: any) => {
        resInfo.value = res;
      },
    });
    return {
      resInfo,
      isCollapse,
      handleOpen,
      handleClose,
      getResInfoStyle: DocuIcon.getResInfoStyle,
    };
  },
});
</script>
