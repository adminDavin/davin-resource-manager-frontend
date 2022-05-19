import { ElMessage } from 'element-plus'


export default {
  c_alert_w: function (m: string, t: string) { 
    ElMessage.warning({
      message: m,
      type: t
    });  
  },
  c_alert_s: function (m: string, t: string, showClose: boolean, duration: number) { 
    ElMessage.success({
      message: m,
      type: t,
      showClose: showClose,
      duration: duration
    });
  },
  c_alert_success: function (m: string, duration: number) { 
    ElMessage.success({
      message: m,
      type: 'success',
      duration: duration
    });
  },
  c_alert_e: function (m: string, duration: number) { 
    ElMessage({
      message: m,
      type: 'error',
      duration: duration
    });   
  }
}