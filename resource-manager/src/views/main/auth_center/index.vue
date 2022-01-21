<template> 
<el-container>
  <el-header>{{ $t(systemTitle) }}</el-header>
  <el-main>
      <el-form class="form"> 
        <el-card class="box-card">
          <div v-if="form.accoutLogin">
            <el-input
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
          </div>
          <div v-if="form.wxLogin" id="wx_qrcode"></div>
          <el-button type="primary" :loading="form.loading" @click="wxGetAccessToken" size='mini'>{{ $t('message.system.wxLogin') }}</el-button>
          <el-button type="primary" @click="submit" size='mini'>{{ $t('message.system.login') }}</el-button>
        </el-card>
      </el-form>
    </el-main>
</el-container>
      
</template>

<script lang="ts">
import { systemTitle, wxConf, wxCorpId } from '@/config'
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute, RouteLocationRaw } from 'vue-router'
// import { getAuthRoutes } from '@/router/permission'
import c_alert from '@/utils/alert_utils'
import date_utils from '@/utils/date_utils'
import wx from 'weixin-js-sdk'
import axios from 'axios'
// import selectLang from '@/layout/Header/functionList/word.vue'
export default defineComponent({
  // components: {
  //   // selectLang
  // },
  

  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const form = reactive({ name: '', password: '123456', loading: false, wxLogin: false, accoutLogin: true });
    const passwordType = ref('password');
    const passwordTypeChange = () => {
      passwordType.value === '' ? passwordType.value = 'password' : passwordType.value = ''
    }
   
    console.log(wx);
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
        resolve(true)
      })
    }

    const submit = () => {
      form.wxLogin = false;
      form.accoutLogin = true;
      checkForm()
      .then(() => {
        form.loading = true
        let params = {
          name: form.name,
          password: form.password,
        }
        store.dispatch('user/login', params)
        .then(async () => {
          c_alert.c_alert_s('登录成功', 'success', true, 1000);
          // await getAuthRoutes()
          await router.push(route.query.redirect as RouteLocationRaw || '/')
        }).finally(() => {
          form.loading = false
        })
      })
    }

    const wxGetAccessToken = () => {
      // const accessToken = "rKZo0nqpi1PeKHeYxKPZT5z3guhgxGralCs75CayJJXWAbdQWq-5zrsIoL0tJ0DjQ24oOZ9nyIvnMZqP9VxUjMNm6cHqQcSjBzmZ_9QxJnWXzklXXkDPj1P9x42aFFj5AopSQnzZKpxfjadgofEYAT9vqn9G1xYHK_xRnvSy9S2mz_mQmyRRQMUkvikZPr3a7VY4OlIA8_QRQOcVtIEtmw";
      // console.log(`https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=${accessToken}`);
      // const ticket = "HoagFKDcsGMVCIY2vOjf9l02DM_PK-5Att7PQ99pkctSF75Ffjneo5FoXHhz9JiLqx1PTCta-Q8eYZtAx7fKlA";
      // let that = this;
      // form.wxLogin = true;
      // form.accoutLogin = false;
      // window.WwLogin({
      //           id: "wx_qrcode",
      //           appid: "ww8f30d79285ccb1e0",
      //           agentid: "1000002",
      //           redirect_uri: encodeURIComponent(`${'https://www.to0-ai.com/#/login'}`),
      //       });
      
      const url = `/wx/connect/oauth2/authorize?appid=${wxConf.corpid}&redirect_uri=${encodeURI(wxConf.redirectUri)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
      console.log(url);
      axios.get(url)
      .then((response) => {
        alert(response.data)
        console.log(response.data)
      });
      // var timestamp = date_utils.c_timestamp();
      // var nonceStr = date_utils.randomString(16);
      // localStorage.setItem('timestamp', timestamp.toString());
      // wx.config({
      //   beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      //   debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      //   appId: wxCorpId, // 必填，企业微信的corpID
      //   timestamp: timestamp , // 必填，生成签名的时间戳
      //   nonceStr: nonceStr , // 必填，生成签名的随机串
      //   signature: date_utils.getSignature(ticket, nonceStr, timestamp.toString()),// 必填，签名，见 附录-JS-SDK使用权限签名算法
      //   jsApiList: [
      //     'scanQRCode',
      //     'hideOptionMenu'
      //   ] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
      // });
      // wx.ready(
      //   function () {
      //   wx.scanQRCode({
      //     desc: "scanQRCode desc",
      //     needResult: 1, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
      //     scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是条形码（一维码），默认二者都有
      //     success: function (res:any) {
      //       // 业务代码
      //     },
      //     error: function (res:any) {
      //       // 业务代码
      //     },
      //   }
      // );
    // })
  }


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

<style>
  .box-card {
    text-align: center;
    width: 50%;
  }
</style>