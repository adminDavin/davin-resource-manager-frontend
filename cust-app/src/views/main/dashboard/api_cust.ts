import request from "@/utils/system/request";
import b_utils from '@/utils/browser_utils';

export default {
  listTagInfo: (func: Function) => {
    let tenantId: any = localStorage.getItem('tenantId');
    let userId: any = localStorage.getItem('userId');
    console.log(tenantId, userId);
    request({ // 获取仓库信息
      url: `/cust_tag/info/list`,
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
  createTagInfo: (params: any, func: Function) => {
    let tenantId: any = localStorage.getItem('tenantId');
    let userId: any = localStorage.getItem('userId');
    console.log(tenantId, userId);
    request({ // 获取仓库信息
      url: `/cust_tag/info/create`,
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
  modifyTagInfo: (params: any, func: Function) => {
    let tenantId: any = localStorage.getItem('tenantId');
    let userId: any = localStorage.getItem('userId');
    console.log(tenantId, userId);
    request({ // 获取仓库信息
      url: `/cust_tag/info/modify`,
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
  deleteTagInfo: (params: any, func: Function) => {
    let tenantId: any = localStorage.getItem('tenantId');
    let userId: any = localStorage.getItem('userId');
    console.log(tenantId, userId);
    request({ // 获取仓库信息
      url: `/cust_tag/info/delete`,
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

  listTagGroup: (func: Function) => {
    let tenantId: any = localStorage.getItem('tenantId');
    let userId: any = localStorage.getItem('userId');
    console.log(tenantId, userId);
    request({ // 获取仓库信息
      url: `/cust_tag/group/list`,
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
  createTagGroup: (params: any, func: Function) => {
    let tenantId: any = localStorage.getItem('tenantId');
    let userId: any = localStorage.getItem('userId');
    request({ // 获取仓库信息
      url: `/cust_tag/group/create`,
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
  modifyTagGroup: (params: any, func: Function) => {
    let tenantId: any = localStorage.getItem('tenantId');
    let userId: any = localStorage.getItem('userId');
    console.log(tenantId, userId);
    request({ // 获取仓库信息
      url: `/cust_tag/group/modify`,
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
  deleteTagGroup: (params: any, func: Function) => {
    let tenantId: any = localStorage.getItem('tenantId');
    let userId: any = localStorage.getItem('userId');
    console.log(tenantId, userId);
    request({ // 获取仓库信息
      url: `/cust_tag/group/delete`,
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
  addToTagGroup: (params: any, func: Function) => {
    let tenantId: any = localStorage.getItem('tenantId');
    let userId: any = localStorage.getItem('userId');
    console.log(tenantId, userId);
    request({ // 获取仓库信息
      url: `/cust_tag/group/add_tag_info`,
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

  deleteToTagGroup: (params: any, func: Function) => {
    let tenantId: any = localStorage.getItem('tenantId');
    let userId: any = localStorage.getItem('userId');
    console.log(tenantId, userId);
    request({ // 获取仓库信息
      url: `/cust_tag/group/delete_tag_info`,
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

  loadGoods: (rDavin: any, options: any) => {
    if (!b_utils.isObjEmpty(options['loadingFlag'])) {
      options.loadingFlag.value = true;
    }
    request({ // 获取仓库信息
      url: `goods_resource/list?tenantId=3&userId=待定`,
      method: "post",
      baseURL: "/api/davin/r",
      data: {
        content: {
          "selectType": 'ALL'
        }
      }
    })
      .then((res) => {
        rDavin.value = res.data;
        if (!b_utils.isObjEmpty(options['loadingFlag'])) {
          options.loadingFlag.value = false;
        }
      })
      .catch((err) => {
        // alert(err);
      });
  },
  importAction: (importActionType: string, excelContent: any, defaultImportColumns: any, callback: Function) => {
    console.log(importActionType, excelContent, defaultImportColumns);
    request({ // 获取仓库信息
      url: `goods_resource/import?tenantId=3&userId=待定`,
      method: "post",
      baseURL: "/api/davin/r",
      data: {
        content: {
          "importActionType": importActionType,
          "excelContent": excelContent,
          "defaultImportColumns": defaultImportColumns
        }
      }
    })
      .then((res) => {
        callback(res);
      })
      .catch((err) => {
      });
  },
  updateGoodsResource: (action: boolean, operateType: any, quantity: any, goodsCode: string, callback: Function) => {
    let content = action ? {
      "operateType": operateType,
      "quantity": quantity,
      "goodsCode": goodsCode,
      "deleteFlag": 1
    } : {
      "operateType": operateType,
      "quantity": quantity,
      "goodsCode": goodsCode
    };
    request({ // 获取仓库信息
      url: `goods_resource/operate?tenantId=3&userId=待定`,
      method: "post",
      baseURL: "/api/davin/r",
      data: {
        content
      }
    })
      .then((res) => {
        callback(res);
      })
      .catch((err) => {
      });
  }
};