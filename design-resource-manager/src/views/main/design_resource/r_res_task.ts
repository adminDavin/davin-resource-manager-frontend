import request from "@/utils/system/request";
import { callbackify } from "util";
const baseUrl = "/api/res_m";
const emptyContent = {
  content: {}
};

const M = 1024 * 1024;

const downloadMultiResInfo = (resInfoCode: string, resInfoSize: number, resInfoName: string, current: number, data: Array<Blob>, callBack: Function) => {
  const headers = getHeader();
  let l = (resInfoSize - current * 2 * M) < 3 * M ? 3 * M : 2 * M;
  headers['Range'] = `bytes ${current * 2 * M}-${l}`;
  request({
    url: `/res_task/download?resTaskCode=${resInfoCode}`,
    method: "post",
    headers: headers,
    timeout: 240000,
    responseType: 'blob',
    data: emptyContent,
    baseURL: baseUrl,
  })
    .then((res) => {
      data.push(res.data);
      let total = Math.ceil(resInfoSize / (2 * M));
      if (res.status == 206) {
        callBack(true);
        downloadMultiResInfo(resInfoCode, resInfoSize, resInfoName, current + 1, data, callBack);
      } else {
        const blob = new Blob(data);
        const elink = document.createElement('a');
        elink.download = resInfoName;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
        callBack(false);
      }
    });
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
  getResTasks: (params: any, rDavin: any) => {
    request({ // 获取仓库信息
      url: `/res_task/list`,
      method: "post",
      headers: getHeader(),
      data: {
        content: params
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        rDavin.value = res.data;
      });
  },
  deleteTask: (taskIds: any, callback: Function) => {
    request({ // 获取仓库信息
      url: `/res_task/delete`,
      method: "post",
      headers: getHeader(),
      data: {
        content: { taskIds }
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        callback();
      });
  },
  createDownload: (reqData: any, callBack: Function) => {
    request({ // 获取仓库信息
      url: `/res_task/create_download`,
      method: "post",
      headers: getHeader(),
      data: {
        content: reqData
      },
      baseURL: baseUrl,
    })
      .then((res) => {
        callBack(res.data);
      });
  },
  downloadMultiResInfo: (resInfoCode: string, resInfoSize: number, resInfoName: string, callBack: Function) => {
    const headers = getHeader();
    if (resInfoSize > 2 * M) {
      headers['Range'] = 'bytes 0-' + 2 * M;
    }
    request({ // 获取仓库信息
      url: `/res_task/download?resTaskCode=${resInfoCode}`,
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
          callBack(false);
        } else {
          downloadMultiResInfo(resInfoCode, resInfoSize, resInfoName, 1, [res.data], callBack);
        }
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
  },

};