<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import "@/assets/iconfont/iconfont.css";
import "@/assets/fonts/font.css";
import Header from "./Header.vue";

export default defineComponent({
  components: {
    Header,
  },
  setup() {

    onMounted(() => { 
    });
    return {
    };
  },
});
</script>
<style scoped>
.ant-menu-horizontal {
  border-bottom: none;
}
</style>
