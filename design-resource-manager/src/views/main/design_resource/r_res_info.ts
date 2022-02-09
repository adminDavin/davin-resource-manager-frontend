import request from "@/utils/system/request";
const baseUrl = "/api/res_m/res_info";
const emptyContent = {
  content: {}
};

export default {
  getRootResInfo: (rDavin: any, callback: Function) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    console.log(tenantId);
    request({ // 获取仓库信息
      url: `/root`,
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

  getResInfo: (resInfoCode: string, rDavin: any, callback: Function) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    console.log(tenantId);
    request({ // 获取仓库信息
      url: `/get?resInfoCode=${resInfoCode}`,
      method: "get",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        rDavin.value = res.data;
        callback(res.data);
      });
  },

  getChildResInfos: (resInfoCode: string, rDavin: any) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    console.log(tenantId);
    request({ // 获取仓库信息
      url: `/child?resTaskCode=${resInfoCode}`,
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
  getResInfoDataByParantCode: (resInfoCode: string, callback: Function) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    console.log(tenantId);
    request({ // 获取仓库信息
      url: `/child?resTaskCode=${resInfoCode}`,
      method: "post",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: emptyContent,
      baseURL: baseUrl,
    })
      .then((res) => {
        callback(res.data);
      });
  },
  getSearchResInfos: (params: any, callback: Function) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    console.log(tenantId);
    request({ // 获取仓库信息
      url: `/search`,
      method: "post",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: {
        content: params
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        console.log(res);
        callback(res.data);
      });
  },
  getChildTree: (resInfoCode: string, rDavin: any) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    console.log(tenantId);
    request({ // 获取仓库信息
      url: `/tree?resInfoCode=${resInfoCode}`,
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
  rename: (resInfoCode: string, resInfoName: any, callback: Function) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    console.log(tenantId);
    request({ // 获取仓库信息
      url: `/rename`,
      method: "post",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: {
        content: {
          resInfoCode,
          resInfoName
        }
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        console.log(res);
        callback();
      });
  },
  addResTag: (resInfoCode: string, resTagCode: string, callback: Function) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    request({ // 获取仓库信息
      url: `/tag/add`,
      method: "post",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: {
        content: {
          resInfoCode,
          resTagCode
        }
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        callback(res);
      });
  },
  listResTag: (resInfoCode: string, callback: Function) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    request({ // 获取仓库信息
      url: `/tag/list?resInfoCode=${resInfoCode}`,
      method: "post",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: emptyContent,
      baseURL: baseUrl,
    })
      .then((res) => {
        callback(res.data);
      });
  },
  deleteResTag: (resInfoCode: string, resTagCode: string,  callback: Function) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    request({ // 获取仓库信息
      url: `/tag/delete`,
      method: "post",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: {
        content: {
          resTagCode,
          resInfoCode
        }
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        console.log(res);
        callback();
      });
  },
  delete: (resInfoCode: string, callback: Function) => {
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
        content: {
          resInfoCode
        }
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        console.log(res);
        callback();
      });
  },
  move: (resInfoCode: string, tResInfoCode: String, callback: Function) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    console.log(tenantId);
    request({
      url: `/move`,
      method: "post",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: {
        content: {
          resInfoCode,
          tResInfoCode
        }
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        console.log(res);
        callback();
      });
  },
  downloadResInfo: (resInfoStore: string, resInfoName: string) => { 
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    console.log(tenantId);
    request({ // 获取仓库信息
      url: `/download?resInfoStore=${resInfoStore}`,
      method: "post",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      responseType: 'blob',
      data: emptyContent,
      baseURL: baseUrl,
    })
      .then((res) => {
        const elink = document.createElement('a');
        elink.download = resInfoName;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(res.data);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      });
  },
  previewResInfo: (resInfoStore: string, callback: Function) => { 
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    console.log(tenantId);
    request({ // 获取仓库信息
      url: `/download?resInfoStore=${resInfoStore}`,
      method: "post",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      responseType: 'blob',
      data: emptyContent,
      baseURL: baseUrl,
    })
      .then((res) => {
        callback(res);
      });
  },
  createFolder: (resInfoPath: string, selectedResInfo: any, callBack: Function) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    let rDavin = {
      resInfoPath: resInfoPath,
      resInfoParentCode: selectedResInfo.value.resInfoCode,
      ownerType: selectedResInfo.value.resInfoOwnerType,
      ownerId: selectedResInfo.value.resInfoOwnerId,
    };
    request({ // 获取仓库信息
      url: `/save`,
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
        selectedResInfo.value = res.data;
        callBack(res.data);
      });
  },
  uploadRes: (resTaskCode: string, file: File) => {
    let tenantId: any = sessionStorage.getItem('tenantId');
    let userId: any = sessionStorage.getItem('userId');
    var formData = new FormData();
    formData.append("file", file);
    request({ // 获取仓库信息
      url: `/res_task/upload?resTaskCode=${resTaskCode}`,
      method: "post",
      headers: {
        tenantId: tenantId,
        userId: userId
      },
      data: formData,
      baseURL: baseUrl,
    });
  }
};