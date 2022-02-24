<template>
  <el-row style="margin-top: 50px">
    <el-col
      :xs="24"
      :sm="24"
      :md="8"
      :lg="8"
      :xl="8"
      style="text-align: center"
    >
      <el-link :href="dResCloud" target="_blank"  style="font-size: var(--el-font-size-extra-large)">
        我的资源管理
      </el-link>
      <div ref="barparent" id="room" style="margin: 10px; height: 450px"></div>
    </el-col>
    <el-col
      :xs="24"
      :sm="24"
      :md="8"
      :lg="8"
      :xl="8"
      style="text-align: center"
    >
      <div style="font-size: var(--el-font-size-extra-large)">
        团队资源管理<text style="font-size: var(--el-font-size-base);margin-top: 50px">(正在开发中)</text>
      </div>
      <div ref="powerstation" id="powerstation" style="margin: 10px; height: 450px"></div>
      
    </el-col>
    <el-col
      :xs="24"
      :sm="24"
      :md="8"
      :lg="8"
      :xl="8"
      style="text-align: center"
    >
      <div style="font-size: var(--el-font-size-extra-large)">共享资源管理
        <text style="font-size: var(--el-font-size-base);margin-top: 50px">(正在开发中)</text>
      </div>
      <div ref="powerroom" id="powerroom" style="margin: 10px; height: 450px"></div>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  reactive,
  ref,
  UnwrapRef,
  Ref,
} from "vue";
import { dResCloud } from "@/config/index";
import { init } from "./three/BoxGeometry";
import PowerStation from "./three/PowerStation";
import PowerRoom  from './three/PowerRoom';

export default defineComponent({
  setup() {
    const barparent: Ref = ref();
    const powerstation: Ref = ref();
    const powerroom: Ref = ref();
    
    const powerStation = new PowerStation("powerstation", {});
    const loop = () => {
      requestAnimationFrame(loop);
      powerStation.renderer.render(powerStation.scene, powerStation.camera);
    };

    const powerRoom = new PowerRoom("powerroom", {});
    const powerRoomLoop = () => {
      requestAnimationFrame(powerRoomLoop);
      powerRoom.renderer.render(powerRoom.scene, powerRoom.camera);
    };

    onMounted(() => {
      init(barparent.value.offsetWidth, barparent.value.offsetHeight);
      powerStation.init(powerstation.value.offsetWidth, powerstation.value.offsetHeight);
      loop();
      powerRoom.init(powerroom.value.offsetWidth, powerroom.value.offsetHeight);
      powerRoomLoop();
    });
    return {
      init,
      barparent,
      powerstation,
      powerroom,
      dResCloud: dResCloud,
    };
  },
});
</script>
