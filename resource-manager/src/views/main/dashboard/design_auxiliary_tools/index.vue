<template>
  <el-card shadow="never">
    <div :style="`font-size: var(--el-font-size-large)`">
      <strong>图零工具箱</strong>
    </div>
    <el-row :gutter="10">
      <el-col
        :xs="12"
        :sm="8"
        :md="6"
        :lg="4"
        :xl="2"
        v-for="item in auxiliaryTools.tZero"
        :key="item.title"
      >
        <el-card shadow="hover" class="au">
          <el-image
            :src="item.logo"
            style="height: 100px; margin-top: 15px;object-fit: ;"
          ></el-image>
          <div style="margin-top: 15px">
            <el-link target="_blank" type="info" :underline="false" :href="item.url">{{
              item.title
            }}</el-link>
            <el-popover placement="top" :max-width="400">
              {{ item.desc }}
              <template #reference
                ><el-icon
                  ><eleme
                    style="
                      width: 1em;
                      height: 0.7em;
                      color: blue;
                      background-color: lavenderblush;
                    " /></el-icon
              ></template>
            </el-popover>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
  <el-card style="width: 100%; margin-top: 15px" shadow="never">
    <div :style="`font-size: var(--el-font-size-large)`">
      <strong>在线工具</strong>
    </div>
    <el-row :gutter="10">
      <el-col
        :xs="12"
        :sm="8"
        :md="6"
        :lg="4"
        :xl="2"
        v-for="item in auxiliaryTools.third"
        :key="item.title"
      >
        <el-card shadow="hover" class="au">
          <el-link target="_blank" type="info" :underline="false" :href="item.url">
          <el-image :src="item.logo" style="height:40px;object-fit: inherit;"></el-image>
          <div>
            {{item.title}}
            <el-popover placement="top" :max-width="400">
              {{ item.desc }}
              <template #reference
                ><el-icon
                  ><eleme
                    style="
                      width: 1em;
                      height: 0.7em;
                      color: blue;
                      background-color: lavenderblush;
                    " /></el-icon
              ></template>
            </el-popover>
          </div>
          </el-link>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { auxiliaryTools } from "./third_config";

export default defineComponent({
  setup() {
    const currentDate = ref(new Date());
    return {
      currentDate,
      auxiliaryTools,
    };
  },
});
</script>
<style lang="scss" scoped>
.au {
  text-align: center;
  background-color: aliceblue;
  border-radius: 10px;
  margin-top: 15px;
  margin-left: 5px;
}
</style>
