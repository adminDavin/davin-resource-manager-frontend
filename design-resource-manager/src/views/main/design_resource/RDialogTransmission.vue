<template>
  <el-dialog
    v-model="dialogVisible"
    title="传输列表"
    width="50%"
    :modal="false"
    close-on-press-escape
  >
    <span>This is a message</span>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(props, context) {
    const { expose } = context;
    const dialogVisible = ref(false);
    const owner = ref();
    const handleClose = (done: () => void) => {};
    expose({
      init: (o: any) => {
        owner.value = o;
        dialogVisible.value = true;
      },
    });
    return {
      dialogVisible,
      handleClose,
    };
  },
});
</script>
