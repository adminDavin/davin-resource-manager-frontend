<template>
  <div class="container">
    <div class="box">
      <h1>{{ $t(systemTitle) }}</h1>
      <el-form class="form">
        <el-input
          size="large"
          v-model="form.name"
          :placeholder="$t('message.system.userName')"
          type="text"
          maxlength="50"
        >
          <template #prepend>
            <i class="sfont system-xingmingyonghumingnicheng"></i>
          </template>
        </el-input>
        <el-input
          size="large"
          ref="password"
          v-model="form.password"
          :type="passwordType"
          :placeholder="$t('message.system.password')"
          name="password"
          maxlength="50"
        >
          <template #prepend>
            <i class="sfont system-mima"></i>
          </template>
          <template #append>
            <i class="sfont password-icon" :class="passwordType ? 'system-yanjing-guan': 'system-yanjing'" @click="passwordTypeChange"></i>
          </template>
        </el-input>
        <el-button type="primary" :loading="form.loading" @click="submit" size="mini">{{ $t('message.system.login') }}</el-button>
        <el-button type="primary" :loading="form.loading" @click="wxGetAccessToken" size='mini'>{{ $t('message.system.wxLogin') }}</el-button>
        <a :href="form.wxLoginUrl">davin</a>
      </el-form>
      <div class="fixed-top-right">
        <select-lang />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { systemTitle, wxConf } from '@/config';
import { defineComponent, ref, reactive, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute, RouteLocationRaw } from 'vue-router';
import c_alert from '@/utils/alert_utils';
import browser_utils from '@/utils/browser_utils';

export default defineComponent({

  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    
    onBeforeMount(() => {
      if (browser_utils.isWx()) {
        window.location.replace(`${wxConf.authorizedLoginUrl}?appid=${wxConf.corpid}&redirect_uri=${encodeURI(wxConf.redirectUri)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`);
      }
    });

    const form = reactive({ name: '', password: '123456', loading: false, wxLogin: false, accoutLogin: true, wxLoginUrl: '' });
    const passwordType = ref('password');
    const passwordTypeChange = () => passwordType.value === '' ? passwordType.value = 'password' : passwordType.value = '';
   
    const checkForm = () => {
      return new Promise((resolve, reject) => {
        if (form.name === '') {
          c_alert.c_alert_w('用户名不能为空', 'warning');
          return;
        }
        if (form.password === '') {
          c_alert.c_alert_w('密码不能为空', 'warning');
          return;
        }
        resolve(true);
      })
    }

    const submit = () => {
      form.wxLogin = false;
      form.accoutLogin = true;
      checkForm()
      .then(() => {
        form.loading = true;
        let params = {
          name: "ACCOUT:" + form.name,
          password: form.password,
        };
        store.dispatch('user/login', params)
        .then(async () => {
          c_alert.c_alert_s('登录成功', 'success', true, 1000);
          await router.push(route.query.redirect as RouteLocationRaw || '/dashboard');
        }).finally(() => form.loading = false)
      })
    }

    const wxGetAccessToken = () => window.location.replace(`${wxConf.codeScanningLoginUrl}?appid=${wxConf.corpid}&agentid=${wxConf.agentid}&redirect_uri=${encodeURI(wxConf.redirectUri)}&state=STATE`);


    return {
      systemTitle,
      form,
      passwordType,
      passwordTypeChange,
      submit,
      wxGetAccessToken
    }
  }
})
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #eef0f3;
  .box {
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    background: white;
    border-radius: 8px;
    transform: translate(-50%, -50%);
    height: 440px;
    overflow: hidden;
    box-shadow: 0 6px 20px 5px rgba(152, 152, 152, 0.1),
      0 16px 24px 2px rgba(117, 117, 117, 0.14);
    h1 {
      margin-top: 80px;
      text-align: center;
    }
    .form {
      width: 80%;
      margin: 50px auto 15px;
      .el-input {
        margin-bottom: 20px;
      }
      .password-icon {
        cursor: pointer;
        color: #409eff;
      }
    }
    .fixed-top-right {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
@media screen and (max-width: 750px) {
  .container .box {
    width: 100vw;
    height: 100vh;
    box-shadow: none;
    left: 0;
    top: 0;
    transform: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      margin-top: 0;
    }
  }
}
</style>
