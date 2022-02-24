import request from "@/utils/system/request";
const baseUrl = "/api/res_m";
const emptyContent = {
  content: {}
};


const getHeader = () => {
  let tenantId: any = sessionStorage.getItem('tenantId');
  let userId: any = sessionStorage.getItem('userId');
  const headers = {
    tenantId: tenantId,
    userId: userId
  }
  return headers;
};

export default {
  getResTasks: (rDavin: any) => {
    request({ // 获取仓库信息
      url: `/res_task/list`,
      method: "post",
      headers: getHeader(),
      data: emptyContent,
      baseURL: baseUrl,
    })
      .then((res) => {
        rDavin.value = res.data;
      });
  },
  createResTasks: (rDavin: any, callBack: Function) => {
    return request({ // 获取仓库信息
      url: `/res_task/create`,
      method: "post",
      headers: getHeader(),
      data: {
        content: rDavin
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        callBack(res.data);
      });
  },
  uploadRes: (resTaskCode: string, file: any, partNumber: number, callback: Function) => {
      var formData = new FormData();
    formData.append("file", file);
    request({ // 获取仓库信息
      url: `/res_task/upload?resInfoCode=${resTaskCode}&partNumber=${partNumber}`,
      method: "post",
      headers: getHeader(),
      timeout: 120000,
      data: formData,
      baseURL: baseUrl,
    }).then((res: any) => { 
        callback(res);
    });
  },
  uploadResPart: (resTaskCode: string, file: any, partNumber: number, callback: Function) => {
     var formData = new FormData();
    formData.append("file", file);
    request({ // 获取仓库信息
      url: `/res_task/upload?resInfoCode=${resTaskCode}&partNumber=${partNumber}`,
      method: "post",
      headers: getHeader(),
      timeout: 240000,
      data: formData,
      baseURL: baseUrl,
    }).then((res: any) => { 
        callback(res);
    });
  }
};