<template>
    <div ref="graph"></div>
  </template>
  <script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import ForceGraphVR from '3d-force-graph-vr';
  
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
        ForceGraphVR({
          controlType: "trackball",
          rendererConfig: { antialias: true, alpha: true },
        })(graph.value).graphData(gData);
        
      });
      return {
        graph,
      };
    },
  });
  </script>
  