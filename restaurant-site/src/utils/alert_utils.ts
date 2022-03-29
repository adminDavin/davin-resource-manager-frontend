import { message } from 'ant-design-vue'


export default {
  c_alert_w: function (m: string, t: string) { 
    message.warning({
      content: m
    });  
  },
  c_alert_s: function (m: string, t: string, showClose: boolean, duration: number) { 
    message.success({
      content: m,
      showClose: showClose,
      duration: duration
    });
  },
  c_alert_e: function (m: string, duration: number) { 
    message.error({
      content: m,
      duration: duration
    });   
  }
}