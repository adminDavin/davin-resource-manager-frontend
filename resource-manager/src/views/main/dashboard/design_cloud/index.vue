<template>
    <embed :src="dResCloud" width="100%" height="80%"/>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { dResCloud } from '@/config/index';

export default defineComponent({
    setup() {
        return {
            dResCloud: dResCloud
        }
    },
})
</script>


