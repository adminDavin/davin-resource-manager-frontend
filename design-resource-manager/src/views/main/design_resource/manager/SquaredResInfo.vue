<template>
  <div>
    <el-dropdown
      type="text"
      placement="bottom"
      @command="handleDropdown"
      style="margin-right: 10px; margin-left: 10px"
    >
      <el-icon :size="20" color="brown"><sort /></el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="res_info_name">文件名称</el-dropdown-item>
          <el-dropdown-item command="res_content_type"
            >文件类型</el-dropdown-item
          >
          <el-dropdown-item command="res_info_size">文件大小</el-dropdown-item>
          <el-dropdown-item command="updated_time">更新时间</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-icon
      v-show="isSquared == 'true'"
      @click="setSquared()"
      :size="20"
      color="cadetblue"
      ><grid
    /></el-icon>
    <el-icon
      v-show="isSquared != 'true'"
      @click="setSquared()"
      :size="20"
      color="cadetblue"
      ><operation
    /></el-icon>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const tempSetSquared: any = inject("setSquared");
    const handleDropdown: any = inject("handleDropdown");
    const isSquared = ref();
    var setSquared = () => {
      if (isSquared.value == "true") {
        isSquared.value = "false";
      } else {
        isSquared.value = "true";
      }
      tempSetSquared(isSquared.value);
      localStorage.setItem("isSquared", isSquared.value);
    };

    onMounted(() => {
      if (localStorage.getItem("isSquared")) {
        isSquared.value = localStorage.getItem("isSquared");
      } else {
        isSquared.value = "true";
      }
      tempSetSquared(isSquared.value);
    });
    return {
      isSquared,
      setSquared,
      handleDropdown,
    };
  },
});
</script>
