<template>
  <el-dialog v-model="dialogTableVisible" title="请选择租户">
    <el-row justify="center">
      <el-col :xs="22" :sm="18" :md="16">
        <div
          v-for="item in tenants"
          :key="item.id"
          @click="chooseTenant(item)"
          style="
            padding: 1rem;
            background-color: #ebeef5;
            border: 3px groove #e5f292;
            border-radius: 10px;
          "
        >
          <el-button type="text">{{ item.tenantName }}</el-button>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import apiUserAuth from "./ServiceUserAuth";
import { useStore } from "vuex";

export default defineComponent({
  setup(props, context) {
    const { expose } = context;
    const router = useRouter();
    const identifyId = ref();
    const store = useStore();
    const tenants = ref<any[]>([]);
    const redirect = ref('/');
    const dialogTableVisible = ref(false);

    const chooseTenant = (item: any) => {
      apiUserAuth.getUserInfo(identifyId.value, item.id, (res: any) => {
        store.dispatch("userInfo/storeUserInfo", res);
        dialogTableVisible.value = false;
        router.push({ path: redirect.value });
      });
    };

    expose({
      init: (orginIdentifyId: number, res: any, tempRedirect: string) => {
        identifyId.value = orginIdentifyId;
        tenants.value = res;
        redirect.value = tempRedirect;
        if (res.length == 1) {
          chooseTenant(tenants.value[0]);
        } else {
          dialogTableVisible.value = true;
        }
      },
    });
    return {
      dialogTableVisible,
      tenants,
      chooseTenant,
    };
  },
});
</script>
