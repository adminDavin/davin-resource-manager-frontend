<template>
  <div class="container">正在登录中, 请稍等</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import browser_utils from "@/utils/browser_utils";
import apiUserAuth from "./ServiceUserAuth";

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute(),
      router = useRouter();
    onMounted(() => {
      let params = browser_utils.queryParams(
        document.location.toString(),
        true
      );

      if (!browser_utils.isEmpty(params["code"])) {
        let loginInfo = {
          name: "QYWX:" + params["code"],
          password: "123456",
        };
        apiUserAuth.wecomLogin(loginInfo, (res: any) => {
          store.dispatch("userInfo/storeUserInfo", res.data);
          router.push({ path: "/" });
        });
      }
    });
    return {};
  },
});
</script>
<style lang="scss" scoped></style>
