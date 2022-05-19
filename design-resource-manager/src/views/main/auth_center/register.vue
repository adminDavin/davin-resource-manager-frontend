<template>
  <div class="auth-back">
    <div class="auth-title animate__animated animate__fadeInDown">
      用户中心-注册
    </div>
    <div class="auth-title">
      <el-row justify="center">
        <el-col :xs="22" :sm="18" :md="16">
          <div class="animate__animated animate__fadeInUp auth-content-1">
            <el-row justify="center">
              <el-col :xs="22" :sm="18" :md="10">
                <div style="padding-top: 50px">
                  <el-input v-model="accountInput" placeholder="请输入账号" />
                </div>
                <div style="padding-top: 20px">
                  <el-input v-model="passwordInput" placeholder="请输入密码">
                    <template #suffix>
                      <el-button type="text" @click="handleIconClick">
                        输入验证码
                      </el-button>
                    </template>
                  </el-input>
                </div>
                <el-row justify="end">
                  <el-col :span="24">
                    <div style="padding: 40px">
                      <el-button  size="small" type="info">登录</el-button>
                      <el-button size="small" type="info">注册</el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface buildButton {
  name: string;
  key: string;
  type: any;
  icon: string;
  effect: any;
}

export default defineComponent({
  setup() {
    // 账号
    const accountInput = ref();
    // 密码
    const passwordInput = ref();

    const loginType = ref<buildButton[]>([
      {
        name: "企业微信登录",
        key: "wecom",
        type: "info",
        effect: "light",
        icon: "iconfont icon-qiyeweixin",
      },
      {
        name: "微信登录",
        key: "wechat",
        type: "info",
        effect: "light",
        icon: "iconfont icon-wechat",
      },
      {
        name: "账号登录",
        key: "account",
        type: "primary",
        effect: "light",
        icon: "iconfont icon-zhanghao",
      },
      {
        name: "手机号码登录",
        key: "phone",
        type: "info",
        effect: "light",
        icon: "iconfont icon-shoujihaoma",
      },
    ]);

    const changeLoginType = (selectedLoginType: string) => {
      console.log(selectedLoginType);
      let tempLoginType = loginType.value;
      for (let item of tempLoginType) {
        item.type = selectedLoginType == item.key ? "primary" : "info";
      }
    };

    const handleIconClick = () => {};

    return {
      accountInput,
      passwordInput,
      loginType,
      changeLoginType,
      handleIconClick,
    };
  },
});
</script>

<style scoped>
.auth-back {
  min-height: 800px;
  background-image: linear-gradient(#a1e7e8, #f2364966);
}
.auth-title {
  padding-top: 50px;
  padding-bottom: 20px;
  font-size: var(--el-font-size-extra-large);
  text-align: center;
}
.auth-content-1 {
  width: 100%;
  min-height: 400px;
  background-image: linear-gradient(#e3dfd0, #aeffe866);
}
</style>
