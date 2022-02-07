<template>
  <el-drawer v-model="drawer" size="70%" :with-header="false">
    <el-container>
      <div v-if="pickedResInfo.action == 'rename'">
        <el-descriptions title="修改文件名称" column="1">
          <el-descriptions-item label="新文件名">
            <el-input
              v-model="input"
              :placeholder="pickedResInfo.resInfoName"
            />
          </el-descriptions-item>
        </el-descriptions>
        <el-button @click="renameResInfo">确定</el-button>
      </div>
      <div v-else>
        <div v-for="item in childrenTree" :key="item.id">
          <el-divider></el-divider>
           {{item.resInfoName}} 全路径为: {{item.resInfoPath}}
        </div>

        <el-divider></el-divider>
        <el-button @click="renameResInfo">移动至此处</el-button>
      </div>
    </el-container>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import rResInfo from "../r_res_info";
import b_utils from "@/utils/browser_utils";

export default defineComponent({
  setup(props, context) {
    const { expose } = context;
    const drawer = ref(false);
    const input = ref();
    const childrenTree = ref();
    const rootResInfo = ref();
    const pickedResInfo = ref({
      resInfoCode: "",
      resInfoName: "",
      action: "",
    });
    const refreshResInfos: any = inject("refreshResInfos");
    const importAction = (
      resInfoCode: string,
      resInfoName: string,
      action: string
    ) => {
      drawer.value = true;
      pickedResInfo.value.resInfoCode = resInfoCode;
      pickedResInfo.value.resInfoName = resInfoName;
      pickedResInfo.value.action = action;
      if (action == "move") {
        rResInfo.getRootResInfo(rootResInfo, (res: any) =>
          rResInfo.getChildResInfos(res.resInfoCode, childrenTree)
        );
      }
    };
    const renameResInfo = () => {
      if (!b_utils.isEmpty(input.value)) {
        rResInfo.rename(pickedResInfo.value.resInfoCode, input.value, () => {
          refreshResInfos();
        });
      }
      drawer.value = false;
    };
    expose({
      importAction,
    });
    return {
      input,
      drawer,
      pickedResInfo,
      childrenTree,
      importAction,
      renameResInfo,
    };
  },
});
</script>
