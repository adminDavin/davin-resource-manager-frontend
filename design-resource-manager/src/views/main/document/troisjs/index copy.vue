<template>
    <Renderer
      ref="renderer"
      antialias
      resize
      :orbit-ctrl="{ enableDamping: true, dampingFactor: 0.05 }"
      @click="onClick"
    >
      <Camera :position="{ z: 15 }" />
      <Scene background="#ffffff">
        <AmbientLight color="#808080" />
        <PointLight color="#ffffff" :position="{ y: 50, z: 0 }" />
        <PointLight color="#ffffff" :position="{ y: -50, z: 0 }" />
        <PointLight color="#ffffff" :position="{ y: 0, z: 0 }" />
        <Torus
          v-for="i in n"
          :key="i"
          :ref="`mesh${i}`"
          :radius="i * 0.2"
          :tube="0.1"
          :radial-segments="8"
          :tubular-segmensts="(i + 2) * 4"
        >
          <ToonMaterial :color="color(i)" />
        </Torus>
      </Scene>
    </Renderer>
  </template>
  <script lang="ts">
  import { defineComponent, onMounted, reactive, Ref, ref } from "vue";
  import { useRouter, useRoute } from "vue-router";
  
  import * as THREE from "three";
  import * as ThreeStats from "three-stats";
  import * as Dat from "dat-gui";
  import TrackballControls from "three-trackballcontrols";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // 控制器
  
  import {
    AmbientLight,
    Camera,
    PointLight,
    Renderer,
    Scene,
    ToonMaterial,
    Torus,
  } from 'troisjs';
  import chroma from 'chroma-js';
  
  export default defineComponent({
    components: {
      AmbientLight,
      Camera,
      PointLight,
      Renderer,
      Scene,
      ToonMaterial,
      Torus,
    },
    setup() {
      const router = useRouter();
      const route = useRoute();
      const resInfo = ref();
      const container = ref();
      const n = ref(30);
      let cscale = ref(['#dd3e1b', '#0b509c']);
  
      const renderer: Ref = ref();
      onMounted(() => {});
  
      const color = (i: number) => {
        let temp = chroma.scale(cscale.value);
        return temp(i / n.value).css();
      };
      const onClick = (e: any) => {
        cscale.value = [chroma.random(), chroma.random(), chroma.random()];
      };
  
  
      return {
        renderer,
        n,
        color,
        onClick,
      };
    },
  });
  </script>
  