<template>
  <div class="canvasContainer" ref="canvasContainer">
    <q-inner-loading :showing="isLoading" color="primary" style="z-index: 10" />
    <div v-if="progress !== null" class="progress">
      <q-linear-progress
        color="primary"
        :indeterminate="progress < 0"
        :value="progress"
      />
      <div v-if="progressText !== null" class="progressText">
        {{ progressText }}
      </div>
    </div>
    <div v-if="error !== null" class="error" :title="error">
      <q-icon name="warning" class="text-red" style="font-size: 4rem" /> Error
      occurred: {{ error }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

import { DxfViewer } from "dxf-viewer";
import * as three from "three";

export default defineComponent({
    props: {
        dxfUrl: String,
        fonts: {
            default: null,
        },
        options: {
            default() {
                return {
                    clearColor: new three.Color("#fff"),
                    autoResize: true,
                    colorCorrection: true,
                };
            },
        },
    },
    setup(props, context) {
        onMounted(() => {
            DxfViewer.SetupWorker();
            // console.log(props.dxfUrl)
            // console.log(new DxfViewer(props.dxfUrl, {}));
        });
        return {
            isLoading: false,
            progress: 0,
            progressText: null,
            curProgressPhase: null,
            error: '',
        };
    },
})
</script>

<style scoped lang="scss">
.canvasContainer {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 100px;
  min-height: 100px;

  .progress {
    position: absolute;
    z-index: 20;
    width: 90%;
    margin: 20px 5%;

    .progressText {
      margin: 10px 20px;
      font-size: 14px;
      color: #262d33;
      text-align: center;
    }
  }

  .error {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 20;
    padding: 30px;

    img {
      width: 24px;
      height: 24px;
      vertical-align: middle;
      margin: 4px;
    }
  }
}
</style>
