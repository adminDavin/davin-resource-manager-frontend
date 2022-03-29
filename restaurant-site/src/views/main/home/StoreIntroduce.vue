<template>
  <a-row type="flex" justify="center">
    <a-col :span="4">
      <div>
        <div style="font-size: 30px; font-family: 'Parisienne-Regular'">
            <div>{{$t('message.home.aboveStoreIntroduce')}}</div>
        </div>
        <a-divider></a-divider>
        <div>{{$t('message.home.belowStoreIntroduce')}}</div>
      </div>
    </a-col>
  </a-row>
  <a-row type="flex" justify="center">
    <a-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
      <a-row type="flex" justify="center">
        <a-col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="8"
          :xl="8"
          v-for="item in merchants"
          :key="item.id"
        >
          <div style="margin-top: 20px; margin: 10px">
            <a-row
              type="flex"
              justify="space-between"
              style="margin-bottom: 10px"
            >
              <a-col :span="14"
                ><div style="font-size: 16px; font-weight: bolder">
                  {{ item.merchantName }}
                </div></a-col
              >
              <a-col :span="10"
                ><img
                  style="height: 20px"
                  src="@/assets/imgs/icon_ubereats.png"
              /></a-col>
            </a-row>
            <img :src="item.thumbUrl" style="width: 100%" />
            <a-row type="flex" justify="space-between" style="margin-top: 10px">
              <a-col
                :span="4"
                v-for="(item, index) in item.infrastructureMark"
                :key="item"
                style="padding: 5px"
              >
                <img
                  style="width: 100%"
                  :src="restaurantServices[index.toString()][item]"
                />
              </a-col>
            </a-row>
            <div style="margin: 20px">
              <div style="text-align: start">
                <div style="font-weight: bolder">
                  {{ $t("message.home.section3.card.phone") }}:
                </div>
                <div>{{ item.phone }}</div>
              </div>
              <div style="text-align: start">
                <div style="font-weight: bolder">
                  {{ $t("message.home.section3.card.address") }}:
                </div>
                <div>{{ item.address }}</div>
              </div>
              <div style="text-align: start">
                <div style="font-weight: bolder">
                  {{ $t("message.home.section3.card.openTime") }}:
                </div>
                <div>{{ item.openTimeInfo }}</div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <div>
            <img
              src="@/assets/imgs/onlineshop.png"
              style="width: 71%; margin-top: 40px"
            />
          </div>
        </a-col>
      </a-row>
      <a-divider style="margin: 20px"></a-divider>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getMerchants } from "@/views/main/server/index";
import { restaurantServices } from "./index";

export default defineComponent({
  setup() {
    const merchants = ref();
    onMounted(() => {
      getMerchants("", (res: any) => (merchants.value = res));
    });
    return {
      merchants,
      restaurantServices,
    };
  },
});
</script>

<style lang="less" scoped>
.ant-divider-horizontal {
  margin: 0px;
}
</style>
