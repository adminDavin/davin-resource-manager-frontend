<template>
  <a-row type="flex" justify="center" v-if="showTitle">
    <a-col :span="4">
      <div>
        <div style="font-size: 30px; font-family: 'Parisienne-Regular'">
          {{ $t("message.home.aboveNewsAndTopic") }}
        </div>
        <a-divider></a-divider>
        <div>
          {{ $t("message.home.belowNewsAndTopic") }}
        </div>
      </div>
    </a-col>
  </a-row>
  <a-row v-for="item in newsList" :key="item.id">
    <div style="display: flex; margin: 5px">
      <div style="font-size: 20px; margin-right: 40px">
        {{ item.publishDate.substring(0, 10).replace(/-/g, ".") }}
      </div>
      <div style="font-size: 20px">{{ item.newsTitle }}</div>
    </div>
  </a-row>
  <a-row type="flex" justify="end" v-if="showTitle">
    <a-col :span="2">
      <a-button shape="round">{{ $t("message.common.more") }}</a-button>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getNews } from "@/views/main/server/index";

export default defineComponent({
    props: {
      showTitle: Boolean
    },
    setup() {
        const newsList = ref();
        onMounted(() => {
            getNews("", (res: any) => (newsList.value = res));
        });
        return {
            newsList
        }
    },
})
</script>
<style lang="less" scoped>
.ant-divider-horizontal {
  margin: 0px;
}
</style>
