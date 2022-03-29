import axios , { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import c_alert from '@/utils/alert_utils';

const baseURL: any = import.meta.env.VITE_BASE_URL

const service: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

// 请求前的统一处理
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res instanceof Blob) { 
      return response;
    }
    if (res.success === true) {
      return res;
    } else {
      showError(res);
      return Promise.reject(res);
    }
  },
  (error: AxiosError)=> {
    const badMessage: any = error.message || error
    const code = parseInt(badMessage.toString().replace('Error: Request failed with status code ', ''))
    showError({ code, message: badMessage })
    return Promise.reject(error)
  }
)

// 错误处理
function showError(error: any) {
  // token过期，清除本地数据，并跳转至登录页面
  if (error.code === 403) {
    // to re-login
    // store.('user/loginOut')
  } else {
    c_alert.c_alert_e(error.msg || error.message || '服务异常', 3 * 1000);
  }
  
}

export default service