<template>
  <div class="auth-back">
    <div style="height: 100px"></div>
    <div class="auth-title animate__animated animate__fadeInDown">
      用户中心-登录
    </div>
    <div class="auth-title">
      <el-row justify="center">
        <el-col :xs="22" :sm="18" :md="16">
          <div class="animate__animated animate__fadeInUp auth-content-1">
            <div style="text-align: end; padding: 10px">
              <el-tooltip
                v-for="item in loginType"
                :key="item.key"
                :content="item.name"
                :effect="item.effect"
              >
                <el-button
                  :type="item.type"
                  @click="changeLoginType(item.key)"
                  size="small"
                >
                  <el-icon :class="item.icon" />
                </el-button>
              </el-tooltip>
            </div>
            <el-row justify="center">
              <el-col :xs="22" :sm="18" :md="14">
                <div style="padding-top: 50px">
                  <el-input v-model="accountInput" placeholder="请输入账号" />
                </div>
                <div style="padding-top: 20px">
                  <el-input
                    v-model="passwordInput"
                    type="password"
                    placeholder="请输入密码"
                  >
                    <template #suffix>
                      <el-button
                        v-if="isPhone(loginType)"
                        type="text"
                        @click="handleIconClick('verifyCode')"
                      >
                        输入验证码
                      </el-button>
                    </template>
                  </el-input>
                </div>
                <el-row justify="end">
                  <el-col :span="24">
                    <div style="padding: 30px">
                      <el-button
                        size="small"
                        type="info"
                        @click="handleIconClick('authLogin')"
                        >登录</el-button
                      >
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <ListTenants ref="listTenantsComponents" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import browser_utils from "@/utils/browser_utils";
import apiUserAuth from "./ServiceUserAuth";
import ListTenants from "./ListTenants.vue";

import {
  wecomUrl,
  autoWecomUrl,
  loginTypes,
  isPhone,
  encryptorPassword,
  getLoginType,
} from "./index";

export default defineComponent({
  components: {
    ListTenants,
  },
  setup() {
    const listTenantsComponents = ref();
    const loginType = ref<any[]>(loginTypes);
    const route = useRoute(), router = useRouter();
    const accountInput = ref(""), passwordInput = ref("");

    const changeLoginType = (selectedLoginType: string) => {
      let sLoginType = getLoginType(selectedLoginType, loginType.value);
      if (sLoginType.useCode) {
        handleIconClick(sLoginType.key);
      }
    };

    const handleIconClick = (actionType: string) => {
      let redirect = route.query.redirect || '/';
      switch (actionType) {
        case "wecom": {
          window.location.replace(wecomUrl);
          break;
        }
        case "authLogin": {
          let params = {
            authType: isPhone(loginType.value) ? "PHONE" : "USERNAME",
            username: accountInput.value,
            authValue: encryptorPassword(passwordInput.value),
            codeType: "login",
          };
          apiUserAuth.login(params, (identifyId: number, res: any) =>
            listTenantsComponents.value.init(identifyId, res, redirect)
          );
          break;
        }
        case "verifyCode": {
          break;
        }
        case "wechat": {
          break;
        }
        case "register": {
          break;
        }
        default: {
        }
      }
    };

    onMounted(() => {
      if (browser_utils.isWx()) {
        window.location.replace(autoWecomUrl);
      }
    });

    return {
      accountInput,
      passwordInput,
      loginType,
      listTenantsComponents,
      isPhone,
      changeLoginType,
      handleIconClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.auth-back {
  min-height: 1000px;
  background-image: linear-gradient(#4b3bf6, #df939a66);
}
.auth-title {
  padding-top: 30px;
  font-size: var(--el-font-size-extra-large);
  text-align: center;
}
.auth-content-1 {
  width: 100%;
  background-image: linear-gradient(#e3dfd0, #aeffe866);
}
</style>
