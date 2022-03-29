<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <a-carousel :autoplay="true">
          <div v-for="item in TopBanners" :key="item.id">
            <img :src="item.bannerUrl" style="height: 400px; width: 100%" />
          </div>
        </a-carousel>
        <a-row
          type="flex"
          justify="center"
          style="background: #edf1e8; border-bottom: 1px solid #dae2d2"
        >
          <a-col
            :xs="12"
            :sm="12"
            :md="12"
            :lg="6"
            :xl="6"
            v-for="item in navList"
            :key="item.jumpUrl"
          >
            <a-card
              :hoverable="true"
              style="height: 100px; background: #edf1e8"
            >
              <div>
                <a-button type="link">{{ $t(item.aboveTitle) }}</a-button>
              </div>
              <div>
                <a-button type="link">{{ $t(item.belowTitle) }}</a-button>
              </div>
            </a-card>
          </a-col>
        </a-row>
        <a-carousel :autoplay="true">
          <div v-for="item in MidBanners" :key="item.id">
            <img :src="item.bannerUrl" style="height: 200px; width: 100%" />
          </div>
        </a-carousel>
        <NewsAndTopic :show-title="true"></NewsAndTopic>
      </a-col>
    </a-row>
    <img :src="intro_6" style="width: 100%" />
    <img :src="home_3" style="width: 100%" />
    
      <Concept></Concept>
    <div class="back-image-home-1">
      <img
        style="width: 80%; padding: 50px"
        :src="item.bannerUrl"
        v-for="item in endBanners"
        :key="item.id"
      />
    </div>
    <StoreIntroduce></StoreIntroduce>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getBanners, getNews, getMerchants } from "@/views/main/server/index";
import { navList, restaurantServices } from "./index";
import intro_6 from "@/assets/imgs/intro_6.png";
import home_3 from "@/assets/imgs/home_2.png";
import NewsAndTopic from './NewsAndTopic.vue';
import Concept from './Concept.vue';
import StoreIntroduce from './StoreIntroduce.vue';


export default defineComponent({
    components: {
        NewsAndTopic,
        Concept,
        StoreIntroduce
    },
  setup() {
    const TopBanners = ref();
    const MidBanners = ref();
    const endBanners = ref();
    const newsList = ref();
    const merchants = ref();

    onMounted(() => {
      getBanners("home_1", (res: any) => (TopBanners.value = res));
      getBanners("home_2", (res: any) => (MidBanners.value = res));
      getBanners("home_4", (res: any) => (endBanners.value = res));
      getNews("", (res: any) => (newsList.value = res));
      getMerchants("", (res: any) => (merchants.value = res));
    });
    return {
      TopBanners,
      MidBanners,
      endBanners,
      navList,
      newsList,
      restaurantServices,
      merchants,
      intro_6,
      home_3,
    };
  },
});
</script>
<style scoped>
.ant-menu-horizontal {
  border-bottom: none;
}
.ant-divider-horizontal {
  margin: 0px;
}
.back-image-home-1 {
  background-image: url("@/assets/imgs/home_1.png");
  background-size: 100% 100%;
}
</style>
