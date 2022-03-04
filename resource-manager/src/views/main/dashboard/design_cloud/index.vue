<template>
  <el-row style="margin-top: 30px">
    <el-col
      :xs="24"
      :sm="8"
      :md="8"
      :lg="8"
      style="text-align: center"
      v-for="item in auxiliaryTools.tZeroDCloud"
      :key="item.title"
    >
      <el-card shadow="hover" class="au" :style="item.style">
        <div :style="`padding-top: 60px;`">
          <el-link
            target="_blank"
            type="info"
            :underline="false"
            :href="item.url"
          >
            <el-image
              :src="item.logo"
              style="margin-top: 15px; object-fit: contain"
            ></el-image>
            <div style="margin-top: 60px; margin-bottom: 30px">
              <strong :style="`font-size: 35px;color: aliceblue;`">{{ item.title }}</strong>
            </div>
          </el-link>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { auxiliaryTools } from "./third_config";

export default defineComponent({
  setup() {
    return {
      auxiliaryTools,
    };
  },
});
</script>
<style scoped>
.au {
  text-align: center;
  background-color: aliceblue;
  border-radius: 10px;
  margin-top: 0px;
  margin-left: 40px;
  margin-right: 40px;
}
</style>
