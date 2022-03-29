<template>
  <a-row type="flex" justify="center">
    <a-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
      <a-row type="flex" justify="center">
        <a-col :span="4">
          <div>
            <div style="font-size: 30px; font-family: 'Parisienne-Regular'">
              {{ $t("message.home.aboveConcept") }}
            </div>
            <a-divider></a-divider>
            <div>
              {{ $t("message.home.belowConcept") }}
            </div>
          </div>
        </a-col>
      </a-row>
      <div style="font-size: 20px; margin: 10px">
        {{ $t("message.home.section2.title") }}
      </div>
      <a-row>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div style="margin-top: 150px; margin-right: 10px">
            <code v-html="conceptContent.contentOne.code" />
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <img :src="conceptContent.contentOne.img" style="height: 300px" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <img :src="conceptContent.content2.img" style="height: 300px" />
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div style="margin-top: 150px; margin-left: 10px">
            <code v-html="conceptContent.content2.code"></code>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div style="margin-top: 100px; margin-right: 10px">
            <code v-html="conceptContent.content3.code"></code>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <img :src="conceptContent.content3.img" style="height: 300px" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <img :src="conceptContent.content4.img" style="height: 300px; width: 100%" />
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div style="margin-top: 100px; margin-left: 20px">
            <code v-html="conceptContent.content4.code"></code>
          </div>
        </a-col>
      </a-row>
      <a-row type="flex" justify="end">
        <a-col :span="4">
          <div style="font-size: 20px; margin: 10px">
            <a-button shape="round">{{ $t("message.common.more") }}</a-button>
          </div>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { conceptContent } from "./index";

export default defineComponent({
  setup() {
    const contentOne = ref();
    onMounted(() => {
      contentOne.value =
        "<span style='font-size: 20px;font-weight: bolder'>アジア</span><text>各国で経験を積んだシェフ達による調理技術が今、惜しみなく発揮された料理たちは、どこか新しくもあり、どこか懐かしくもあります。</text>";
    });
    return {
      conceptContent
    };
  },
});
</script>

<style lang="less" scoped>
.ant-divider-horizontal {
  margin: 0px;
}
</style>
