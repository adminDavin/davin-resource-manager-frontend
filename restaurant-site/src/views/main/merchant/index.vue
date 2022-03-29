<template>
  <a-row type="flex" justify="center" v-if="marchant">
    <a-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
      <div style="padding: 20px; background: #f6faf0">
        <a-row type="flex" justify="space-between">
          <a-col :span="10">
            <div style="font-size: 24px;font-weight: bolder;">{{ marchant.merchantName }}</div>
          </a-col>
          <a-col :span="6">
            <a-button type="primary">{{
              $t("message.reserve.appoint")
            }}</a-button></a-col
          >
        </a-row>
        <a-divider></a-divider>
        
        {{ marchant }}
      </div>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import NewsAndTopic from "../home/NewsAndTopic.vue";
import { useRouter, useRoute } from "vue-router";
import { getMerchantInfo } from "@/views/main/server/index";

export default defineComponent({
  components: {
    NewsAndTopic,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const marchant = ref();
    onMounted(() => {
      let marchantId = route.query["id"];
      if (marchantId) {
        getMerchantInfo(marchantId, (res: any) => (marchant.value = res));
      }
    });
    return {
      marchant,
    };
  },
});
</script>
<style lang="less" scoped>

</style>
