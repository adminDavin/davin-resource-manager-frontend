<template>
  <el-row>
    <el-col :span="3" v-for="item in appData" :key="item">
      <div style="margin-top: 10px; display: flex">
        <el-tag effect="plain" @click="showDaglog(item)">
          {{ item.tagInfoName }}
        </el-tag>
        <div style="margin-top: 3px; margin-left: 10px">
          <el-icon :size="20" :color="item.tagInfoColor">
            <circle-check-filled />
          </el-icon>
        </div>
      </div>
    </el-col>
    <el-col :span="3">
      <el-tag effect="plain" @click="showDaglog(null)" style="margin-top: 10px">
        新增标签
      </el-tag>
    </el-col>
  </el-row>
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="60%">
    <el-icon :size="20" :color="selectItem.tagInfoColor">
      <circle-check-filled />
    </el-icon>
    <el-descriptions :title="selectItem.tagInfoCode">
      <el-descriptions-item label="标签名称">
        <el-input v-model="selectItem.tagInfoName" placeholder="Please input" />
      </el-descriptions-item>
      <el-descriptions-item label="标签颜色">
        <el-input
          v-model="selectItem.tagInfoColor"
          placeholder="Please input"
        />
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmDaglogChange">
          保存
        </el-button>
        <el-button type="primary" @click="deleteTagInfo"> 删除标签 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import apiCust from "../api_cust";
import ColorPicker from "colorpicker-v3";
export default defineComponent({
  components: {
    ColorPicker: ColorPicker,
  },
  setup() {
    const appData = ref<any[]>([]);
    const dialogVisible = ref(false);
    const dialogTitle = ref();
    const selectItem = ref();
    const showDaglog = (item: any) => {
      dialogVisible.value = true;

      if (item == null) {
        dialogTitle.value = "新增标签";
        selectItem.value = {
          id: null,
          tagInfoType: "NORMAL",
          tagInfoAttrs: {},
          tagInfoName: "",
          tagInfoColor: "#eeeeee",
        };
      } else {
        selectItem.value = item;
        dialogTitle.value = "编辑标签";
      }
    };
    const confirmDaglogChange = () => {
      dialogVisible.value = false;
      if ((selectItem.value.id = null)) {
        apiCust.createTagInfo(selectItem.value, () => {
          alert("保存成功");
          apiCust.listTagInfo((res: any) => (appData.value = res));
        });
      } else {
        apiCust.createTagInfo(selectItem.value, () => {
          alert("保存成功");
          apiCust.listTagInfo((res: any) => (appData.value = res));
        });
      }
    };
    const deleteTagInfo = () => {
      dialogVisible.value = false;
      apiCust.deleteTagInfo(selectItem.value, () => {
        alert("删除成功");
        apiCust.listTagInfo((res: any) => (appData.value = res));
      });
    };
    const tagInfoColorChange = (e: any) => {
      selectItem.value.tagInfoColor = e.rgba;
    };
    onMounted(() => {
      apiCust.listTagInfo((res: any) => (appData.value = res));
    });
    return {
      appData,
      showDaglog,
      dialogTitle,
      dialogVisible,
      selectItem,
      confirmDaglogChange,
      deleteTagInfo,
      tagInfoColorChange,
    };
  },
});
</script>
