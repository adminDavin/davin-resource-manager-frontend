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
                  <el-input
                    v-model="accountInput"
                    placeholder="请输入账号"
                  />
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
import { loginTypes, isPhone, encryptorPassword } from "./index";
import browser_utils from '@/utils/browser_utils';
import { wxConf } from '@/config';
import apiUserAuth from "./ServiceUserAuth";
import ListTenants from "./ListTenants.vue";

interface buildButton {
  name: string;
  key: string;
  type: any;
  icon: string;
  effect: any;
}

export default defineComponent({
  components: {
    ListTenants,
  },
  setup() {
    // 账号
    const accountInput = ref("");
    // 密码
    const passwordInput = ref("");
    const listTenantsComponents = ref();
    const loginType = ref<buildButton[]>(loginTypes);

    const changeLoginType = (selectedLoginType: string) => {
      let tempLoginType = loginType.value;
      let sLoginType: any = null;
      for (let item of tempLoginType) {
        item.type = selectedLoginType == item.key ? "primary" : "info";
        if (selectedLoginType == item.key) {
          sLoginType = item;
        }
      }
      if (sLoginType.useCode) {
        handleIconClick(sLoginType.key);
      }
    };

    const handleIconClick = (actionType: string) => {
      if (actionType == "verifyCode") {
        // 获取验证码
      } else {
        if (actionType == "authLogin") {
          // 登录动作
          apiUserAuth.login(
            {
              authType: isPhone(loginType.value) ? "PHONE" : "USERNAME",
              username: accountInput.value,
              authValue: encryptorPassword(passwordInput.value),
              codeType: "login",
            },
            (identifyId: number, res: any) =>
              listTenantsComponents.value.init(identifyId, res)
          );
        } else if (actionType == "register") {
          // 注册新账号
        } else if (actionType == "wecom") {
          window.location.replace(`${wxConf.codeScanningLoginUrl}?appid=${wxConf.corpid}&agentid=${wxConf.agentid}&redirect_uri=${encodeURI(wxConf.redirectUri)}&state=STATE`);
        } else if (actionType == "wechat") {
          // 微信登录
        }
      }
    };
    
    onMounted(() => {
      if (browser_utils.isWx()) {
        window.location.replace(`${wxConf.authorizedLoginUrl}?appid=${wxConf.corpid}&redirect_uri=${encodeURI(wxConf.redirectUri)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`);
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
  min-height: 800px;
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
