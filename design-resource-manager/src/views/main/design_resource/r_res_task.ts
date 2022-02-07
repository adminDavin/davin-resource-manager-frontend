import request from "@/utils/system/request";
const baseUrl = "/api/res_m";
const emptyContent = {
  content: {}
};

export default {
  getResTasks: (rDavin: any) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    console.log(tenantId);
    request({ // 获取仓库信息
      url: `/res_task/list`,
      method: "post",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: emptyContent,
      baseURL: baseUrl,
    })
      .then((res) => {
        console.log(res);
        rDavin.value = res.data;
      });
  },
  createResTasks: (rDavin: any, resTaskCode: any) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    return request({ // 获取仓库信息
      url: `/res_task/create`,
      method: "post",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: {
        content: rDavin
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        resTaskCode.value = res.data.resTaskCode
      });
  },
  uploadRes: (resTaskCode: string, file: File, callback: Function) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    var formData = new FormData();
    formData.append("file", file);
    request({ // 获取仓库信息
      url: `/res_task/upload?resInfoCode=${resTaskCode}`,
      method: "post",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      timeout: 120000,
      data: formData,
      baseURL: baseUrl,
    }).then((res: any) => { 
        callback(res);
    });
  }
};