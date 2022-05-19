<template>
  <el-container horizontal>
    <el-header
      height="50px"
      style="
        position: absolute;
        width: 100%;
        background-color: azure;
        z-index: 100;
      "
      ><r-d-res-header
    /></el-header>
    <el-container style="position: relative; margin-top: 50px">
      <r-d-left-content></r-d-left-content>
      <el-main>
        <r-d-search-content ref="rDSearchContent"></r-d-search-content>
        <r-res-info-manager
          v-show="selectResInfo"
          ref="childManagerResInfo"
        ></r-res-info-manager>
        <r-res-info-search
          v-show="!selectResInfo"
          ref="childSearchResInfo"
        ></r-res-info-search>
      </el-main>
    </el-container>
  </el-container>
  <r-model-transmission ref="childModelTransmission" />
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  provide,
  Ref,
  ref,
} from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { Search } from "@element-plus/icons-vue";
import RResInfoSearch from "./search/index.vue";
import RResInfoMananger from "./manager/index.vue";
import rResInfo from "./r_res_info";
import RDResHeader from "./layout/Header.vue";
import RDLeftContent from "./layout/LeftContent.vue";
import SearchContent from "./layout/SearchContent.vue";
import RModelTransmission from "./manager/r_model_transmission.vue";

export default defineComponent({
  components: {
    "r-res-info-search": RResInfoSearch,
    "r-res-info-manager": RResInfoMananger,
    "r-d-res-header": RDResHeader,
    "r-d-left-content": RDLeftContent,
    "r-d-search-content": SearchContent,
    "r-model-transmission": RModelTransmission,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const childManageResTag: Ref = ref();
    const childSearchResInfo: Ref = ref();
    const childManagerResInfo: Ref = ref();
    const childModelTransmission: Ref = ref();
    const rDSearchContent: Ref = ref();
    const searchFilters: Ref<any> = ref({});
    const selectResInfo = ref();

    const owner = ref({
      ownerId: sessionStorage.getItem("userId"),
      ownerType: "MINE",
    });

    const refreshSearchData = () => {
      selectResInfo.value = 0;
      let params = {
        ownerType: owner.value.ownerType,
        ownerId: owner.value.ownerId,
        resTagCodes: [],
      };
      params["searchKey"] = searchFilters.value.searchKey;
      params["searchType"] = searchFilters.value.searchType;
      params["resInfoType"] = searchFilters.value.resInfoType;
      if (searchFilters.value.resContentType) {
        params["resContentTypes"] = searchFilters.value.resContentType.rTypes;
      } else {
        params["resContentTypes"] = [];
      }
      childSearchResInfo.value?.refreshSearchResInfo(params);
    };

    const toRootResInfo = () =>
      rResInfo.getRootResInfo(selectResInfo, changeSelectedInfo);

    const changeSelectedInfo = (resInfo: any, action: string) => {
      selectResInfo.value = resInfo;
      searchFilters.value = rDSearchContent.value?.init();
      childManagerResInfo.value.initOnMount(resInfo.resInfoCode);
    };

    // 修改当前路径
    provide("changeSelectedInfo", changeSelectedInfo);

    // 跳转至根路径
    provide("handleToRootResInfo", toRootResInfo);

    // 获取搜索内容
    provide(
      "handleSearchContentAction",
      (searchContent: any, resContentType: any) => {
        if (searchContent) {
          searchFilters.value = { ...searchFilters.value, ...searchContent };
        }
        if (resContentType) {
          searchFilters.value["resContentType"] = resContentType;
        }
        refreshSearchData();
      }
    );

    // 获取根路径
    provide("getRootResInfo", (selectResInfo: any, callBack: Function) =>
      rResInfo.getRootResInfo(selectResInfo, callBack)
    );

    // 刷新表格内容
    provide("refreshResInfos", () => {
      if (selectResInfo.value) {
        childManagerResInfo.value.initOnMount(selectResInfo.value.resInfoCode);
      } else {
        refreshSearchData();
      }
    });

    // 触发传输队列方法
    provide(
      "handleTransmissionDialog",
      (rType: string, resInfoCode: string) => {
        childModelTransmission.value?.importAction(
          rType,
          resInfoCode,
          owner.value
        );
      }
    );

    onBeforeMount(() => {
      console.log(store.state.userInfo.info);
      if (!store.state.userInfo.info.id) {
        router.push({ path: "/login" });
      }
      sessionStorage.setItem("tenantId", store.state.userInfo.info.tenantId);
      sessionStorage.setItem("userId", store.state.userInfo.info.id);
    });

    onMounted(toRootResInfo);

    return {
      Search,
      selectResInfo,
      childManageResTag,
      childSearchResInfo,
      childManagerResInfo,
      rDSearchContent,
      childModelTransmission,
    };
  },
});
</script>
<style lang="scss" scoped>
.el-sub-menu .el-menu-item {
  min-width: 100px;
}
.el-aside {
  --el-aside-width: 128px;
}
</style>
