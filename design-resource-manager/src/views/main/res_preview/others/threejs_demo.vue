<template>
    <div class="container" ref="container">
    </div>
  </template>
  
  <script lang="ts">
  import * as THREE from "three";
  import * as ThreeStats from "three-stats";
  import * as Dat from 'dat-gui'
  import TrackballControls from 'three-trackballcontrols'
  import clockTexture from './utils/clock'
  const canvas = clockTexture()
  
  //  因vue3中使用了Proxy对象代理，引入的外部依赖中使用了大量的===造成对比失败。
  //  解决办法: 对Proxy对象进行拆箱
  const unwarp = (obj) => obj && (obj.__v_raw || obj.valueOf() || obj);
  import {
    onMounted,
    reactive,
    toRefs
  } from 'vue';
  
  export default {
    name: 'create',
    setup() {
      const obj = reactive({
        container: null,
        renderer: {}, // 渲染器对象
        camera: {}, // 相机对象
        scene: {}, // 场景对象
        axesHelper: {}, // 三维坐标系对象
        stats: {}, // 性能监控对象
        light: {
          spotLight: {}, // 光源对象
        }, // 光源集
        geometry: {
          ball: {}, // 球体对象
          cube: {}, // 长方体对象
          plane: {}, // 平面对象
        }, // 几何对象集
        controls: {}, // 辅助对象
        clock: {}, // 时钟工具对象
        trackballControls: {}, // 控制器对象
        step: 0, // 跳跃距离
        texture: {  // 文理集
           clock: '' // 钟表
        }
      })
   
      return {
        ...toRefs(obj)
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  </style>
  