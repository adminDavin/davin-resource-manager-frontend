import request from "@/utils/system/request";
const baseUrl = "/api/res_m/res_tag";
const emptyContent = {
  content: {}
};

export default {
  getResTags: (rDavin: any, callback: Function) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    console.log(tenantId);
    request({ // 获取仓库信息
      url: `/list`,
      method: "post",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: {
        content: { "ownerType": "MINE" }
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        rDavin.value = res.data;
        callback(res.data);
      });
  },
  saveResTag: (resTagName: String, callback: Function) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    console.log(tenantId);
    request({ // 获取仓库信息
      url: `/save`,
      method: "post",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: {
        content: { "ownerType": "MINE", resTagName }
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        callback(res.data);
      });
  },
  deleteResTag: (resTagCode: String, callback: Function) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    console.log(tenantId);
    request({ // 获取仓库信息
      url: `/delete`,
      method: "post",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: {
        content: { resTagCode }
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        callback(res.data);
      });
  },
};