<template>
  <a-row type="flex" justify="center">
    <a-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
      <a-row type="flex" justify="center">
        <a-col :span="4">
          <div>
            <div style="font-size: 60px; font-family: 'Parisienne-Regular'">
              {{ $t("message.home.aboveConcept") }}
            </div>
            <a-divider></a-divider>
            <div>
              {{ $t("message.home.belowConcept") }}
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row type="flex" justify="start" class="content-0">
        <code v-html="content.content0.code1" />
      </a-row>
      <a-row type="flex" justify="start" class="content-0">
        <span style="text-align: start; font-size: 16px">
          {{ content.content0.code2 }}
        </span>
      </a-row>
      <a-row type="flex" justify="end" class="content-0">
        <span style="text-align: end; font-size: 20px">
          {{ content.content0.code3 }}
        </span>
      </a-row>
      <img :src="content.content0.img" style="width: 100%" class="content-0" />
    </a-col>
  </a-row>
  <Concept></Concept>
  <img :src="content.content2.img" style="width: 100%" />

  <a-row type="flex" justify="center">
    <a-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
      <div style="font-size: 30px; margin-top: 20px">
        {{ $t("message.concept.intro.text1") }}
      </div>
      <div style="font-size: 20px">{{ $t("message.concept.intro.text2") }}</div>
      <a-row type="flex" justify="start" class="content-0">
        <div style="font-size: 20px">
          {{ $t("message.concept.intro.text3") }}
        </div>
      </a-row>
      <a-row type="flex" justify="start">
        <div style="text-align: start">
          {{ $t("message.concept.intro.text4") }}
          {{ $t("message.concept.intro.text4_1") }}
        </div>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col :span="12">
          <img :src="content.content3.img1" style="width: 80%" />
        </a-col>
        <a-col :span="12">
          <a-row type="flex" justify="start">
            <div class="content-3-title">
              {{ $t("message.concept.intro.text5") }}
            </div>
            <div style="text-align: start">
              {{ $t("message.concept.intro.text6") }}
            </div>
            <div style="text-align: start">
              {{ $t("message.concept.intro.text7") }}
            </div>
            <div style="text-align: start">
              {{ $t("message.concept.intro.text8") }}
            </div>
            <div style="text-align: start">
              {{ $t("message.concept.intro.text9") }}
            </div>
            <div style="text-align: start">
              {{ $t("message.concept.intro.text10") }}
            </div>
          </a-row>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col :span="12">
          <a-row
            type="flex"
            justify="start"
            style="margin-top: 20px; margin-left: 20px"
          >
            <div class="content-3-title">
              {{ $t("message.concept.intro.text11") }}
            </div>
            <div style="text-align: start">
              {{ $t("message.concept.intro.text12") }}
              {{ $t("message.concept.intro.text12_1") }}
              {{ $t("message.concept.intro.text12_2") }}
              {{ $t("message.concept.intro.text12_3") }}
            </div>
          </a-row>
        </a-col>
        <a-col :span="12">
          <img :src="content.content3.img2" style="width: 40%" />
        </a-col>
      </a-row>
    </a-col>
  </a-row>
  <div class="back-timeline-img">
    <a-timeline mode="alternate">
        <a-timeline-item
          v-for="item in timelineArray"
          :key="item.title"
          style="background: transparent"
        >
          <a-icon type="clock-circle" />
          <div style="font-size: 24px;font-weight: bolder;">{{ $t(item.title) }}</div>
          <div style="font-size: 20px;">{{ $t(item.content) }}</div>
        </a-timeline-item>
      </a-timeline>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { content, timelineArray } from "./index";
import Concept from "../home/Concept.vue";

export default defineComponent({
  components: {
    Concept,
  },
  setup() {
    onMounted(() => {});
    return {
      content,
      timelineArray,
    };
  },
});
</script>

<style lang="less" scoped>
.ant-divider-horizontal {
  margin: 0px;
}
.content-0 {
  margin-top: 30px;
}
.content-3-title {
  font-size: 24px;
  margin-top: 10px;
  font-weight: 700;
}
.back-timeline-img {
  background-image: url("@/assets/imgs/intro_bg.png");
  background-size: cover;
  background-position: center;
  min-height: 100px;
  padding-top: 10%;
  padding-bottom: 50px;
}
</style>
