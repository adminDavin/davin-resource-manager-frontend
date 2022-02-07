import request from "@/utils/system/request";
import b_utils from '@/utils/browser_utils';

export default {
  loadWarehouses: (rDavin: any, warehousesFilters: any) => {
    request({ // 获取仓库信息
      url: `/warehouse_info/list?tenantId=3&userId=待定`,
      method: "post",
      baseURL: "/api/davin/r",
    })
      .then((res) => {
        rDavin.value = res.data;
        let filters: any = Array();
        for (let i in res.data) {
          let warehouseName: string = res.data[i].warehouseName;
          filters.push({ text: warehouseName, value: warehouseName });
        }
        warehousesFilters.value = filters;
      })
      .catch((err) => {
        // alert(err);
      });
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