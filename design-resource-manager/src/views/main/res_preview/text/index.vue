<template>
  <div
    v-loading="loading"
    element-loading-text="加载中..."
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="
      font-size: var(--el-font-size-large);
      font-weight: bolder;
      text-align: center;
    "
    v-if="resInfo"
  >
    <!-- {{ content }} -->
    <v-ace-editor
      v-model:value="content"
      lang="html"
      theme="chrome"
      style="height: 800px"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import rResInfo from "@/views/main/design_resource/r_res_info";
import { VAceEditor } from "vue3-ace-editor";

export default defineComponent({
  components: {
    "v-ace-editor": VAceEditor,
  },
  setup() {
    const route = useRoute();
    const loading = ref(true);
    const resInfo = ref();
    const content = ref();
    const init = () => {};

    const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

    onMounted(() => {
      resInfo.value = route.query;
      rResInfo.previewResInfo(resInfo.value.resInfoCode, (res: any) => {
        loading.value = false;
        res.data.text().then((r: any) => {
          content.value = r;
        });
      });
      console.log(resInfo.value.resContentType);
    });
    return {
      svg,
      loading,
      resInfo,
      content,
      init,
    };
  },
});
</script>
