<template>
  <!-- <div ref="graph" style="margin: 20px; display: block">
    <el-icon><warning /></el-icon>
  </div> -->
  <div class="center">
    <div class="center_text">
      <el-icon :size="120" :color="`red`"><warning /></el-icon>
      <div><strong style="font-size: 30px">文件暂不支持预览</strong></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import ForceGraph3D from "3d-force-graph";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const resInfo = ref();
    const graph = ref();
    const n = ref(30);
    const N = 300;
    const gData = {
      nodes: [...Array(N).keys()].map((i) => ({ id: i })),
      links: [...Array(N).keys()]
        .filter((id) => id)
        .map((id) => ({
          source: id,
          target: Math.round(Math.random() * (id - 1)),
        })),
    };
    onMounted(() => {
      // ForceGraph3D({
      //   controlType: "trackball",
      //   rendererConfig: { antialias: true, alpha: true },
      // })(graph.value).graphData(gData);
    });
    return {
      graph,
    };
  },
});
</script>

<style lang="scss" scoped>
.center {
  display: table;
  width: 100%;
  margin-top: 100px;
}
.center_text {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
</style>
