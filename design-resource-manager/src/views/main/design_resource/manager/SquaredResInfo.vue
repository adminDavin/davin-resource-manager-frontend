<template>
  <el-dropdown
    type="text"
    placement="top"
    @command="handleDropdown"
    style="margin-top: 6px; margin-right: 10px"
  >
    <el-icon :size="20" style="background-color: lavenderblush"
      ><sort
    /></el-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="res_info_name">文件名称</el-dropdown-item>
        <el-dropdown-item command="res_info_size">文件大小</el-dropdown-item>
        <el-dropdown-item command="updated_time">更新时间</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <el-button v-show="isSquared == 'true'" type="text">
    <el-icon
      @click="setSquared()"
      :size="20"
      style="background-color: lavenderblush"
      ><grid
    /></el-icon>
  </el-button>
  <el-button v-show="isSquared != 'true'" type="text">
    <el-icon
      @click="setSquared()"
      :size="20"
      style="background-color: lavenderblush"
      ><operation
    /></el-icon>
  </el-button>
</template>
<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const tempSetSquared: any = inject("setSquared");
    const handleDropdown: any = inject('handleDropdown');
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
      handleDropdown
    };
  },
});
</script>
