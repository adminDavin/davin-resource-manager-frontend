<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useUserStore } from "./store/user";
export default defineComponent({
  setup() {
    const userStore = useUserStore();
    onMounted(() => {
      console.log(userStore);
    });
    return { userStore };
  },
});
</script>

<template>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: NotoSansJP-Medium;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
