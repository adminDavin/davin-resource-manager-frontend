<template>
  <a-row type="flex" justify="center">
    <a-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
      <a-row type="flex" justify="center">
        <a-col :span="6">
          <div>
            <div style="font-size: 50px; font-family: 'Parisienne-Regular'">
              {{ $t("message.home.aboveNewsAndTopic") }}
            </div>
            <a-divider></a-divider>
            <div style="font-size: 20px;">
              {{ $t("message.home.belowNewsAndTopic") }}
            </div>
          </div>
        </a-col>
      </a-row>
      <NewsAndTopic :show-title="false"></NewsAndTopic>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import NewsAndTopic from "../home/NewsAndTopic.vue";

export default defineComponent({
  components: {
    NewsAndTopic,
  },
  setup() {
    return {
    };
  },
});
</script>
<style lang="less" scoped>
.ant-divider-horizontal {
  margin: 0px;
}
</style>