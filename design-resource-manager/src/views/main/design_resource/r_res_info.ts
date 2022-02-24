import request from "@/utils/system/request";
const baseUrl = "/api/res_m/res_info";
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

const downloadMultiResInfo = (resInfoCode: string, resInfoSize: number, resInfoName: string, current: number, data: Array<Blob>, downloadProcess: any) => {
  const headers = getHeader();
  let l = (resInfoSize - current * 2 * 1024 * 1024) < 3 * 1024 * 1024 ? 3 * 1024 * 1024 : 2 * 1024 * 1024;
  headers['Range'] = `bytes ${current * 2 * 1024 * 1024}-${l}`;
  request({
    url: `/download?resInfoCode=${resInfoCode}`,
    method: "post",
    headers: headers,
    timeout: 240000,
    responseType: 'blob',
    data: emptyContent,
    baseURL: baseUrl,
  })
    .then((res) => {
      data.push(res.data);
      let total = Math.ceil(resInfoSize / (2 * 1024 * 1024));
      console.log(total, (current + 1) / total, Math.ceil((current + 1) / total));
      downloadProcess.value = Math.ceil((current + 1) / total * 100);
      if (res.status == 206) {
        downloadMultiResInfo(resInfoCode, resInfoSize, resInfoName, current + 1, data, downloadProcess);
      } else {
        console.log(data);
        downloadProcess.value = 100;
        const blob = new Blob(data);
        const elink = document.createElement('a');
        elink.download = resInfoName;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      }
    });

};

export default {
  getRootResInfo: (rDavin: any, callback: Function) => {
    request({ // 获取仓库信息
      url: `/root`,
      method: "post",
      headers: getHeader(),
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
    request({ // 获取仓库信息
      url: `/get?resInfoCode=${resInfoCode}`,
      method: "get",
      headers: getHeader(),
      baseURL: baseUrl,
    })
      .then((res) => {
        rDavin.value = res.data;
        callback(res.data);
      });
  },
  shareResInfo: (resInfoCode: string, rDavin: any, callback: Function) => {
    request({ // 获取仓库信息
      url: `/shared_resource?resInfoCode=${resInfoCode}`,
      method: "get",
      headers: getHeader(),
      baseURL: baseUrl,
    })
      .then((res) => {
        rDavin.value = res.data;
        callback(res.data);
      });
  },

  getChildResInfos: (resInfoCode: string, rDavin: any) => {
    request({ // 获取仓库信息
      url: `/child?resTaskCode=${resInfoCode}`,
      method: "post",
      headers: getHeader(),
      data: emptyContent,
      baseURL: baseUrl,
    })
      .then((res) => {
        console.log(res);
        rDavin.value = res.data;
      });
  },
  getResInfoDataByParantCode: (resInfoCode: string, data: any, callback: Function) => {
    request({ // 获取仓库信息
      url: `/child?resTaskCode=${resInfoCode}`,
      method: "post",
      headers: getHeader(),
      data: {
        content: data
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        callback(res.data);
      });
  },
  getSearchResInfos: (params: any, callback: Function) => {
    request({ // 获取仓库信息
      url: `/search`,
      method: "post",
      headers: getHeader(),
      data: {
        content: params
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        callback(res.data);
      });
  },
  refreshRecentResInfo: (params: any, callback: Function) => {
    request({ // 获取仓库信息
      url: `/recent`,
      method: "post",
      headers: getHeader(),
      data: {
        content: params
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        callback(res.data);
      });
  },
  getChildTree: (resInfoCode: string, rDavin: any) => {
    request({ // 获取仓库信息
      url: `/tree?resInfoCode=${resInfoCode}`,
      method: "post",
      headers: getHeader(),
      data: emptyContent,
      baseURL: baseUrl,
    })
      .then((res) => {
        console.log(res);
        rDavin.value = res.data;
      });
  },
  rename: (resInfoCode: string, resInfoName: any, callback: Function) => {
    request({ // 获取仓库信息
      url: `/rename`,
      method: "post",
      headers: getHeader(),
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
  getAllParent: (resInfoCode: string, callback: Function) => {
    request({ // 获取仓库信息
      url: `/all_parent?resInfoCode=${resInfoCode}`,
      method: "post",
      headers: getHeader(),
      data: emptyContent,
      baseURL: baseUrl,
    })
      .then((res) => {
        callback(res);
      });
  },
  addResTag: (resInfoCode: string, resTagCode: string, callback: Function) => {
    request({ // 获取仓库信息
      url: `/tag/add`,
      method: "post",
      headers: getHeader(),
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
    request({ // 获取仓库信息
      url: `/tag/list?resInfoCode=${resInfoCode}`,
      method: "post",
      headers: getHeader(),
      data: emptyContent,
      baseURL: baseUrl,
    })
      .then((res) => {
        callback(res.data);
      });
  },
  deleteResTag: (resInfoCode: string, resTagCode: string, callback: Function) => {
    request({ // 获取仓库信息
      url: `/tag/delete`,
      method: "post",
      headers: getHeader(),
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
    request({ // 获取仓库信息
      url: `/delete`,
      method: "post",
      headers: getHeader(),
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
  move: (data: any, callback: Function) => {
    request({
      url: `/move`,
      method: "post",
      headers: getHeader(),
      data: {
        content: data
      },
      baseURL: baseUrl,
    })
      .then((res) => callback());
  },
  downloadResInfo: (resInfoCode: string, resInfoName: string) => {
    request({ // 获取仓库信息
      url: `/download?resInfoCode=${resInfoCode}`,
      method: "post",
      headers: getHeader(),
      timeout: 240000,
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
  downloadMultiResInfo: (resInfoCode: string, resInfoSize: number, resInfoName: string, downloadProcess: any) => {
    const headers = getHeader();
    if (resInfoSize > 2 * 1024 * 1024) {
      headers['Range'] = 'bytes 0-' + 2 * 1024 * 1024;
    }
    request({ // 获取仓库信息
      url: `/download?resInfoCode=${resInfoCode}`,
      method: "post",
      headers: headers,
      timeout: 240000,
      responseType: 'blob',
      data: emptyContent,
      baseURL: baseUrl,
    })
      .then((res) => {
        if (res.status == 200) {
          const elink = document.createElement('a');
          elink.download = resInfoName;
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(res.data);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
          downloadProcess.value = 100;
        } else {
          let total = Math.ceil(resInfoSize / (2 * 1024 * 1024));
          downloadProcess.value = Math.ceil(1 / total * 100);
          downloadMultiResInfo(resInfoCode, resInfoSize, resInfoName, 1, [res.data], downloadProcess);
        }
      });
  },
  previewResInfo: (resInfoCode: string, callback: Function) => {
    request({ // 获取仓库信息
      url: `/preview?resInfoCode=${resInfoCode}`,
      method: "get",
      headers: getHeader(),
      data: emptyContent,
      baseURL: baseUrl,
      timeout: 240000,
      responseType: 'blob'
    })
      .then((res) => {
        callback(res);
      });
  },
  createFolder: (resInfoPath: string, selectedResInfo: any, callBack: Function) => {
    let rDavin = {
      resInfoPath: resInfoPath,
      resInfoParentCode: selectedResInfo.value.resInfoCode,
      ownerType: selectedResInfo.value.resInfoOwnerType,
      ownerId: selectedResInfo.value.resInfoOwnerId,
    };
    request({ // 获取仓库信息
      url: `/save`,
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
  uploadRes: (resTaskCode: string, file: File) => {
    var formData = new FormData();
    formData.append("file", file);
    request({ // 获取仓库信息
      url: `/res_task/upload?resTaskCode=${resTaskCode}`,
      method: "post",
      headers: getHeader(),
      data: formData,
      baseURL: baseUrl,
    });
  }
};