<template>
  <el-container style="width: 100%;">
    <el-main>
      <el-config-provider :locale="locale">
        <router-view></router-view>
      </el-config-provider>
    </el-main>
    <!-- <el-footer style="text-align: center;" :height=30>天友设计-方案中心数字化平台</el-footer> -->
  </el-container>
</template>

<script lang="ts">
import { ElConfigProvider } from "element-plus";
import { defineComponent, computed, ref } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import {} from "vue";

export default defineComponent({
  name: "App",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  setup() {
    let scrollerHeight = computed(() => {
      return window.innerHeight - 20 + "px";
    });
    return {
      locale: zhCn,
      scrollerHeight,
    };
  },
});
</script>