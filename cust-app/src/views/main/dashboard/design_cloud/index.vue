<template>
  <el-table :data="appData" @row-click="showDaglog">
    <el-table-column fixed prop="id" label="序号" width="80" />
    <el-table-column prop="tagGroupCode" label="标签组编码" />
    <el-table-column prop="tagGroupName" label="标签组名称" />
    <el-table-column label="标签">
      <template #default="scope">
        <div v-if="scope.row.custTagInfos">
          <el-tag
            style="margin-left: 10px"
            v-for="item in scope.row.custTagInfos"
            :key="item.id"
            >{{ item.tagInfoName }}</el-tag
          >
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="updatedUserId" label="更新人" width="100" />
    <el-table-column prop="updatedTime" label="更新时间" width="180" />
  </el-table>
  <el-button class="mt-4" style="width: 100%" @click="showDaglog(null)">
    添加标签组
  </el-button>
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="60%">
    <el-descriptions :title="selectItem.tagGroupCode">
      <el-descriptions-item label="标签组名称">
        <el-input v-model="selectItem.tagGroupName" placeholder="标签组名称" />
      </el-descriptions-item>
    </el-descriptions>
    <div>关联标签</div>
    <el-select
      v-model="selectItem.tagInfoCodes"
      multiple
      placeholder="添加标签"
      style="width: 100%"
      size="small"
    >
      <el-option
        v-for="item in tagInfos"
        :key="item.tagInfoCode"
        :label="item.tagInfoName"
        :value="item.tagInfoCode"
      />
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmDaglogChange">
          保存
        </el-button>
        <el-button type="primary" @click="deleteTagInfo">
          删除标签组
        </el-button>
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
    const tagInfos = ref<any>([]);

    const dialogVisible = ref(false);
    const dialogTitle = ref();
    const selectItem = ref();
    const showDaglog = (item: any) => {
      dialogVisible.value = true;

      if (item == null) {
        dialogTitle.value = "新增标签组";
        selectItem.value = {
          id: null,
          tagGroupAttrs: {},
          tagGroupName: "",
          custTagInfos: [],
          tagInfoCodes: [],
        };
      } else {
        selectItem.value = item;
        if (selectItem.value.custTagInfos) {
          selectItem.value.tagInfoCodes = selectItem.value.custTagInfos.map(
            (i: any) => {
              return i.tagInfoCode;
            }
          );
        } else {
          selectItem.value.tagInfoCodes = [];
        }

        dialogTitle.value = "编辑标签组";
      }
    };
    const confirmDaglogChange = () => {
      dialogVisible.value = false;
      if (selectItem.value.id == null) {
        apiCust.createTagGroup(selectItem.value, (r: any) => {
          if (selectItem.value.tagInfoCodes.length > 0) {
            selectItem.value.id = r.id;
            let params = {
              id: r.id,
              tagInfoCodes: selectItem.value.tagInfoCodes,
            };
            apiCust.addToTagGroup(params, () => {
              alert("保存成功");
              apiCust.listTagGroup((res: any) => {
                appData.value = res;
              });
            });
          } else {
            alert("保存成功");
            apiCust.listTagGroup((res: any) => {
              appData.value = res;
            });
          }
        });
      } else {
        apiCust.modifyTagGroup(selectItem.value, () => {
          let params = {
            id: selectItem.value.id,
            tagInfoCodes: selectItem.value.tagInfoCodes,
          };
          apiCust.addToTagGroup(params, () => {
            alert("保存成功");
            apiCust.listTagGroup((res: any) => (appData.value = res));
          });
        });
      }
    };
    const deleteTagInfo = () => {
      dialogVisible.value = false;
      apiCust.deleteTagGroup(selectItem.value, () => {
        alert("删除成功");
        apiCust.listTagGroup((res: any) => (appData.value = res));
      });
    };
    onMounted(() => {
      apiCust.listTagGroup((res: any) => (appData.value = res));
      apiCust.listTagInfo((res: any) => (tagInfos.value = res));
    });
    return {
      appData,
      showDaglog,
      dialogTitle,
      dialogVisible,
      selectItem,
      confirmDaglogChange,
      deleteTagInfo,
      tagInfos,
    };
  },
});
</script>
