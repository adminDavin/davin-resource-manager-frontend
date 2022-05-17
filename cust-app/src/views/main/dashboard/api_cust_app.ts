import request from "@/utils/system/request";
import b_utils from '@/utils/browser_utils';
const getHeader = () => {
  let tenantId: any = localStorage.getItem('tenantId');
  let userId: any = localStorage.getItem('userId');
  const headers = {
    tenantId: tenantId,
    userId: userId
  }
  return headers;
};

export default {
  listAppInfo: (func: Function) => {
    let tenantId: any = localStorage.getItem('tenantId');
    let userId: any = localStorage.getItem('userId');
    console.log(tenantId, userId);
    request({ // 获取仓库信息
      url: `/app/info/list`,
      method: "post",
      baseURL: "/api/cust",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: {
        content: { "ownerType": "MINE" }
      },
    })
      .then((res) => func(res.data));
  },
  createAppInfo: (params: any, func: Function) => {
    let tenantId: any = localStorage.getItem('tenantId');
    let userId: any = localStorage.getItem('userId');
    console.log(tenantId, userId);
    request({ // 获取仓库信息
      url: `/app/info/create`,
      method: "post",
      baseURL: "/api/cust",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: {
        content: params
      },
    })
      .then((res) => func(res.data));
  },
  modifyAppInfo: (params: any, func: Function) => {
    let tenantId: any = localStorage.getItem('tenantId');
    let userId: any = localStorage.getItem('userId');
    console.log(tenantId, userId);
    request({ // 获取仓库信息
      url: `/app/info/modify`,
      method: "post",
      baseURL: "/api/cust",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: {
        content: params
      },
    })
      .then((res) => func(res.data));
  },
  deleteAppInfo: (params: any, func: Function) => {
    let tenantId: any = localStorage.getItem('tenantId');
    let userId: any = localStorage.getItem('userId');
    console.log(tenantId, userId);
    request({ // 获取仓库信息
      url: `/app/info/delete`,
      method: "post",
      baseURL: "/api/cust",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: {
        content: params
      },
    })
      .then((res) => func(res.data));
  },
  addToTagApp: (params: any, func: Function) => {
    let tenantId: any = localStorage.getItem('tenantId');
    let userId: any = localStorage.getItem('userId');
    console.log(tenantId, userId);
    request({ // 获取仓库信息
      url: `/app/info/add_tag_info`,
      method: "post",
      baseURL: "/api/cust",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: {
        content: params
      },
    })
      .then((res) => func(res.data));
  },

  deleteToTagApp: (params: any, func: Function) => {
    let tenantId: any = localStorage.getItem('tenantId');
    let userId: any = localStorage.getItem('userId');
    console.log(tenantId, userId);
    request({ // 获取仓库信息
      url: `/app/info/delete_tag_info`,
      method: "post",
      baseURL: "/api/cust",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: {
        content: params
      },
    })
      .then((res) => func(res.data));
  },
  uploadRes: (file: any, callback: Function) => {
    var formData = new FormData();
    formData.append("file", file);
    request({ // 获取仓库信息
      url: `/cust/file/upload`,
      method: "post",
      headers: getHeader(),
      timeout: 120000,
      data: formData,
      baseURL: "/api/cust",
    }).then((res: any) => {
      callback(res);
    });
  },

};