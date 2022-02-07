<template>
  <div v-if="resInfoCode" style="margin-left: 10px">
    <div style="display: flex">
      <div v-for="item in resTags" :key="item.resTagCode" style="margin: 5px">
        <el-tag type="success" @close="handleClose(item)" closable>{{
          item.resTagName
        }}</el-tag>
      </div>
    </div>
    <div style="margin-top: 20px; display: flex">
      <div>
        <text style="font-size: var(--el-font-size-small); font-weight: bolder"
          >搜索标签
        </text>
        <el-select
          v-model="value"
          filterable
          remote
          reserve-keyword
          placeholder="请输入搜索内容"
          :remote-method="remoteMethod"
          :loading="loading"
          size="small"
          @change="addResTag"
        >
          <el-option
            v-for="item in resTagDefs"
            :key="item.resTagCode"
            :label="item.resTagName"
            :value="item.resTagCode"
          >
          </el-option>
        </el-select>
      </div>
      <div style="margin-left: 10px">
        <el-input
          v-if="inputVisible"
          ref="InputRefD"
          v-model="inputValue"
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
          + 添加新的标签
        </el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, nextTick, onMounted, ref } from "vue";
import rResInfo from "../r_res_info";
import type { ElInput } from "element-plus";
import rResTag from "../r_res_tag";

export default defineComponent({
  props: {
    resInfoCode: String,
  },
  setup(props, context) {
    const { expose } = context;
    const refreshResInfos: any = inject("refreshResInfos");
    const changeSelectedInfo: any = inject("changeSelectedInfo");

    const inputValue = ref("");
    const inputVisible = ref(false);
    const resTagDefs = ref([{ resTagName: "", resTagCode: "" }]);
    const resTags = ref([{ resTagName: "", resTagCode: "" }]);

    const InputRefD = ref<InstanceType<typeof ElInput>>();

    const value = ref<string[]>([]);
    const loading = ref(false);

    const enterDetail = (resInfo: any, action: string) => {
      if (action == "download") {
        if (resInfo.resInfoType == "folder") {
          changeSelectedInfo(resInfo, "enter");
        } else {
          rResInfo.downloadResInfo(resInfo.resInfoStore, resInfo.resInfoName);
        }
      } else if (action == "delete") {
        rResInfo.delete(resInfo.resInfoCode, () => refreshResInfos());
      } else {
        changeSelectedInfo(resInfo, action);
      }
    };
    const handleClose = (resTag: any) => {
      if (props.resInfoCode) {
        const resInfoCode: string = props.resInfoCode;
        rResInfo.deleteResTag(resInfoCode, resTag.resTagCode, () =>
          refreshResTags(resInfoCode)
        );
      }
    };

    const showInput = () => {
      inputVisible.value = true;
      nextTick(() => {
        InputRefD.value!.input!.focus();
      });
    };

    const handleInputConfirm = () => {
      if (inputValue.value) {
        rResTag.saveResTag(inputValue.value, (res: any) => {
          addResTag(res.resTagCode);
          inputVisible.value = false;
          inputValue.value = "";
        });
      }
      inputVisible.value = false;
      inputValue.value = "";
    };
    const remoteMethod = () => {
      rResTag.getResTags(resTagDefs, () => {});
    };
    // 添加资源标签
    const addResTag = (val: string) => {
      if (props.resInfoCode && val) {
        const resInfoCode: any = props.resInfoCode;
        rResInfo.addResTag(resInfoCode, val, () => refreshResTags(resInfoCode));
      }
    };
    const refreshResTags = (resInfoCode: string) => {
      rResInfo.listResTag(resInfoCode, (res: any) => {
        resTags.value = res;
      });
    };
    onMounted(() => {
      if (props.resInfoCode) {
        const resInfoCode: any = props.resInfoCode;
        refreshResTags(resInfoCode);
      }
    });

    return {
      enterDetail,
      resTagDefs,
      inputValue,
      inputVisible,
      InputRefD,
      showInput,
      handleClose,
      handleInputConfirm,
      value,
      loading,
      remoteMethod,
      addResTag,
      resTags,
    };
  },
});
</script>
