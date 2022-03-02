<template>
  <div style="font-size: var(--el-font-size-small)" v-if="item">
    {{ focusOnResInfo }}
    <el-button type="text" @click.stop="handleSelectedResInfo(item, 'share')"
      ><el-icon><share /></el-icon
    ></el-button>
    <el-button
      type="text"
      @click.stop="handleSelectedResInfo(item, 'download')"
      ><el-icon><download /></el-icon
    ></el-button>
    <el-button
      type="text"
      @click.stop="handleSelectedResInfo(item, 'preview')"
      v-if="item.resInfoType == 'file'"
      ><el-icon><video-play /></el-icon
    ></el-button>
    <el-button type="text" @click.stop="handleSelectedResInfo(item, 'detail')"
      ><el-icon><expand /></el-icon
    ></el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";

export default defineComponent({
  props: {
    item: Object,
  },
  setup(props, context) {
    const { expose } = context;
    const focusOnResInfo = ref();
    const handleSelectedResInfo: any = inject("handleSelectedResInfo");
    const handleOnResInfo = (resInfo: any, action: string, event) => {
      console.log(event);
      focusOnResInfo.value = resInfo;
    };

    expose({ handleOnResInfo });

    return {
      focusOnResInfo,
      handleSelectedResInfo,
    };
  },
});
</script>
