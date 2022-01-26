<template>
  <el-card style="width: 100%; height: 27%">
    <div :style="`font-size: var(--el-font-size-large)`">
      <strong>图零工具箱</strong>
    </div>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
    </el-row>
  </el-card>
  <el-card style="width: 100%; height: 48%; margin-top: 15px">
    <div :style="`font-size: var(--el-font-size-large)`">
      <strong>在线工具</strong>
    </div>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" v-for="item in auxiliaryTools.third" :key="item.title">
        <div class="au">
            <el-image :src="item.logo"></el-image>         
            <el-tooltip
                effect="dark"
                content="Top Left prompts info"
                placement="top-start"
            >
                <a :href="item.url">{{ item.title }}</a>
            </el-tooltip>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { auxiliaryTools } from './third_config';

export default defineComponent({
  setup() {
    const currentDate = ref(new Date());
    return {
      currentDate,
      auxiliaryTools
    };
  },
});
</script>
<style lang="scss" scoped>
.au {
    text-align: center;
    background-color: aliceblue;
    border-radius: 10px;
    margin-top: 10px;
    margin-left: 10px;
}
</style>