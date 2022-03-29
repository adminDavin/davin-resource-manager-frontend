<template>
  <div class="t-zero-header">
    <a-row>
      <a-col :xs="24" :sm="24" :md="24" :lg="0" :xl="0">
        <a-row type="flex" justify="space-between">
          <a-col :span="3">
            <a-button type="link" @click="showDrawer">
              <i style="font-size: 20px" class="iconfont icon-menu" />
            </a-button>
          </a-col>
          <a-col :span="8">
            <div style="margin-top: 10px">
              <a-avatar
                style="margin-bottom: 5px"
                shape="square"
                :size="20"
                :src="logoImage"
              />
              <text>{{ $t("message.pageTitle") }}</text>
            </div>
          </a-col>
          <a-col :xs="4" :sm="4" :md="4">
            <a-image
              :width="20"
              v-if="activeLanguage"
              :src="activeLanguage.aIcon"
            ></a-image>
          </a-col>
        </a-row>
      </a-col>
      <a-col :xs="0" :sm="0" :md="0" :lg="18" :xl="18" :offset="3">
        <a-row type="flex" justify="space-between">
          <a-col :span="3">
            <div>
              <a-avatar shape="square" :size="100" :src="logoImage" />
              <div class="logoTitle">{{ $t("message.pageTitle") }}</div>
            </div>
          </a-col>
          <a-col :span="21">
            <div>
              <div style="text-align: end; height: 90px">
                <a-image
                  :width="20"
                  v-if="activeLanguage"
                  :src="activeLanguage.aIcon"
                ></a-image>
                <div :src="activeLanguage">{{ $t("message.language") }}</div>
              </div>
              <div style="padding-left: 50px">
                <a-tabs
                  active-key="activeMenu"
                  :tab-bar-style="{ borderBottom: 'none' }"
                >
                  <a-tab-pane :key="item.key" v-for="item in topMenus">
                    <template v-slot:tab>
                      <i :class="item.icon" /> {{ $t(item.title) }}
                    </template>
                  </a-tab-pane>
                </a-tabs>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-drawer
      placement="left"
      :closable="false"
      :visible="drawerVisible"
      @close="drawerVisible = false"
      :width="200"
      :bodyStyle="{ padding: '0px' }"
    >
      <div>
        <a-menu v-model="activeMenu" style="border-right: none">
          <a-menu-item :key="item.key" v-for="item in topMenus">
            <span :class="item.icon"></span> {{ $t(item.title) }}
          </a-menu-item>
        </a-menu>
      </div>
    </a-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import logoImage from "@/assets/intro_8.png";
import lUtils from "@/views/main/utils/LanguageUtils";
import "@/assets/iconfont/iconfont.css";
import iConst from "./index";

export default defineComponent({
  setup() {
    const activeLanguage = ref();
    const activeMenu = ref();
    const drawerVisible = ref(false);
    const showDrawer = () => {
      console.log(showDrawer);
      drawerVisible.value = !drawerVisible.value;
    };

    onMounted(() => {
      let language: any = localStorage.getItem("language");
      console.log(lUtils, language);
      activeLanguage.value = lUtils.getLanguageIcon(language);
      console.log(activeLanguage.value);
      activeMenu.value = iConst.topMenus[0].icon;
    });
    return {
      logoImage,
      activeLanguage,
      showDrawer,
      drawerVisible,
      topMenus: iConst.topMenus,
      activeMenu,
    };
  },
});
</script>
<style scoped>
.logoTitle {
  font-size: 20px;
  font-weight: 700;
}
.ant-tabs-bar {
  border-bottom: none;
}
.t-zero-header {
  padding-top: 10px;
  position: sticky;
  top: 0px;
  z-index: 100;
  background-color: white;
}
</style>
