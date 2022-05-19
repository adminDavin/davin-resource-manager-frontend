import request from "@/utils/system/request";
import b_utils from '@/utils/browser_utils';

const getHeader = () => {
  let tenantId: any = sessionStorage.getItem('tenantId')||'3';
  let userId: any = sessionStorage.getItem('userId')|| 0;
  const headers = {
    tenantId: tenantId,
    userId: userId
  }
  return headers;
};


export default {
  loadTemplateTypes: (callback: Function) => {
    request({ // 获取仓库信息
      url: `/template/type/list`,
      method: "post",
      headers: getHeader(),
      baseURL: "/api/res_m",
      data: {
        content: {}
      }
    })
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  },
  loadTemplateInfos: (templateTypeCode: any, callback: Function) => {
    let content = templateTypeCode ? { templateTypeCode } : {};
    request({
      url: `/template/info/list`,
      method: "post",
      headers: getHeader(),
      baseURL: "/api/res_m",
      data: { content }
    })
      .then((res) => {
        callback(res.data);
      });
  },
};