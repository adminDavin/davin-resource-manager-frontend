<template>
  <div style="display: flex">
    <div style="padding-top: 0px">
      <!-- <el-icon :size="50" color="#409EFC">
        <cloudy />
      </el-icon> -->
    </div>
    <div style="text-align: end; width: 100%; padding-top: 15px;">
        <el-link type="success" style="margin-left: 8px;">我的云存储资源</el-link>
        <el-link type="primary" style="margin-left: 8px;">团队云存储资源</el-link>
        <el-link type="primary" style="margin-left: 8px;">开放云存储资源</el-link>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>
