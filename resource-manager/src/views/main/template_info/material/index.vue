<template>
  <div
    style="
      font-size: var(--el-font-size-extra-large);
      font-family: 'Helvetica Neue', Helvetica, 'PingFang SC',
        'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    "
  >
    <h2>{{ templateTypeName }}</h2>
  </div>
  <el-descriptions :title="item.id + ` ` + item.templateInfoName" v-for="item in templateInfos" :key="item.id">
    <el-descriptions-item label="文件名称">{{item.templateFileName}}</el-descriptions-item>
    <el-descriptions-item label="文件存放地址">{{item.templateFileAddress}}</el-descriptions-item>
    <el-descriptions-item label="上传时间">{{item.createdTime}}</el-descriptions-item>
    <el-descriptions-item label="操作">
        <el-tag size="small">下载</el-tag>
        <el-tag size="small">预览</el-tag>
    </el-descriptions-item>
  </el-descriptions>
</template>
<script lang="ts">
import { defineComponent, onBeforeUpdate, onMounted, onUpdated, ref } from "vue";
import { useRoute } from "vue-router";
import tService from "../TemplateService";

export default defineComponent({
  setup() {
    const route = useRoute();
    const templateTypeCode = ref();
    const templateTypeName = ref();
    const templateInfos = ref<any[]>([]);

    const inittemplateTypeCode = () => {
      if (route.query.templateTypeCode) {
        templateTypeCode.value = route.query.templateTypeCode;
      }
      if (route.query.templateTypeName) {
        templateTypeName.value = route.query.templateTypeName;
      }

      tService.loadTemplateInfos(templateTypeCode.value, (data: any) => {
        templateInfos.value = data;
      });
    };
    onMounted(() => {
      inittemplateTypeCode();
    });
    return {
      templateTypeCode,
      templateTypeName,
      templateInfos,
    };
  },
});
</script>
