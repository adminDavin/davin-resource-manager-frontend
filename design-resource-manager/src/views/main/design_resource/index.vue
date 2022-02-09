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
      <el-aside width="130px">
        <el-menu
          :default-active="resourceType"
          @select="handleActiveMenuAction"
        >
          <el-menu-item
            :index="item.index"
            v-for="item in resourceTypes"
            :key="item.index"
          >
            <el-icon><component :is="item.icon"></component></el-icon>
            <template #title>{{ item.label }}</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-row style="margin-left: 10px; margin-top: 10px">
          <el-col :xs="22" :sm="5" :md="14" :lg="12">
            <el-input
              v-model="input"
              placeholder="请输入搜索内容"
              @keyup.enter="handleInputConfirm"
            >
              <template #prepend>
                <el-select v-model="select" style="width: 100px" size="small">
                  <el-option label="按资源名" value="1"></el-option>
                  <el-option label="按标签名" value="2"></el-option>
                </el-select>
              </template>
              <template #append>
                <el-button
                  :icon="Search"
                  @click="handleInputConfirm"
                ></el-button>
              </template>
            </el-input>
            <el-radio-group v-model="radio" @change="handleRadioChange">
              <el-radio label="0" size="small">全部</el-radio>
              <el-radio label="1" size="small">仅目录</el-radio>
              <el-radio label="2" size="small">仅文件</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <div style="margin-top: 10px; margin-left: 10px">
          <r-model-res-tag ref="childManageResTag"></r-model-res-tag>
        </div>
        <r-res-info-manager
          v-show="selectResInfo"
          ref="childManagerResInfo"
        ></r-res-info-manager>
        <div v-show="!selectResInfo">
          <div style="margin: 10px">
            <el-button @click="handleToRootResInfo" size="small"
              >返回至根路径</el-button
            >
          </div>
          <r-res-info-search ref="childSearchResInfo"></r-res-info-search>
        </div>
      </el-main>
    </el-container>
  </el-container>
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
import RModelResTag from "./r_model_res_tag.vue";
import RResInfoSearch from "./search/index.vue";
import RResInfoMananger from "./manager/index.vue";
import constants from "./constants";
import rResInfo from "./r_res_info";
import RDResHeader from "./header.vue";

export default defineComponent({
  components: {
    "r-model-res-tag": RModelResTag,
    "r-res-info-search": RResInfoSearch,
    "r-res-info-manager": RResInfoMananger,
    "r-d-res-header": RDResHeader,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const resourceType = ref("0");
    const resourceTypes = constants.resourceTypes;
    const input = ref("");
    const select = ref("1");
    const radio = ref("0");
    const selectedTag: Ref<string[]> = ref([]);
    const childManageResTag: Ref = ref();
    const childSearchResInfo: Ref = ref();
    const childManagerResInfo: Ref = ref();

    const selectResInfo = ref();

    const handleInputConfirm = () => {
      let filters = initSearchData();
      filters.searchKey = input.value;
      filters.searchType = select.value;
      refreshSearchData(filters);
    };

    const handleActiveMenuAction = (index: any) => {
      resourceType.value = index;
      let filters = initSearchData();
      filters.resContentType = index;
      refreshSearchData(filters);
    };

    const handleRadioChange = (val: any) => {
      let filters = initSearchData();
      filters.resInfoType = val;
      refreshSearchData(filters);
    };

    const initSearchData = () => {
      selectResInfo.value = null;
      return {
        searchKey: input.value,
        searchType: select.value,
        resInfoType: radio.value,
        resTagCodes: selectedTag.value,
        resContentType: resourceType.value,
      };
    };
    const refreshSearchData = (filters: any) => {
      let params = {};
      params["searchKey"] = filters.searchKey;
      params["searchType"] = filters.searchType == 2 ? "resTag" : "";
      params["resInfoType"] =
        filters.resInfoType == 0
          ? ""
          : filters.resInfoType == 1
          ? "folder"
          : "file";
      params["resContentTypes"] =
        constants.resourceTypes[filters.resContentType].rTypes;
      params["ownerType"] = "MINE";
      params["resTagCodes"] = [];
      childSearchResInfo.value?.refreshSearchResInfo(params);
    };
    const handleToRootResInfo = () => {
      rResInfo.getRootResInfo(selectResInfo, (res) => {
        childManagerResInfo.value.initOnMount(res.resInfoCode);
      });
    };
    onBeforeMount(() => {
      if (!store.state.user.info.userId) {
        router.push({ path: "/login" });
      }
      sessionStorage.setItem("tenantId", store.state.user.info.tenantId);
      sessionStorage.setItem("userId", store.state.user.info.userId);
    });

    onMounted(() => {
      rResInfo.getRootResInfo(selectResInfo, (res) => {
        childManagerResInfo.value.initOnMount(res.resInfoCode);
      });
    });
    provide("searchByRasTagCode", (resTagCode: string) => {
      if (selectedTag.value.indexOf(resTagCode) > -1) {
        delete selectedTag.value[selectedTag.value.indexOf(resTagCode)];
      } else {
        if (selectedTag.value.length > 0) {
          delete selectedTag.value[1];
        }
        selectedTag.value.push(resTagCode);
      }
      let filters = initSearchData();
      console.log(filters);
      refreshSearchData(filters);
    });

    provide("refreshResInfos", () => refreshSearchData(initSearchData()));

    provide("changeSelectedInfo", (resInfo: any, action: string) => {
      selectResInfo.value = resInfo;
      childManagerResInfo.value.initOnMount(resInfo.resInfoCode);
    });


    return {
      Search,
      resourceType,
      resourceTypes,
      select,
      input,
      radio,
      selectResInfo,
      handleToRootResInfo,
      handleInputConfirm,
      childManageResTag,
      childSearchResInfo,
      childManagerResInfo,
      handleActiveMenuAction,
      handleRadioChange,
    };
  },
});
</script>
