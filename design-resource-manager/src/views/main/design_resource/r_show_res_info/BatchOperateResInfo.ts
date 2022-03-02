import { ElNotification } from "element-plus";
import rResInfo from "../r_res_info";
import { downloadBatchResInfo } from './DownloadResInfo';

const getSelected = (data: any) => {
  return data.value.filter((item: any) => item.selected);
};

const notifyNoSelected = (seletedData: any, callBack: Function) => {
  if (seletedData.length == 0) {
    ElNotification({
      message: "请选择文件",
      type: "warning",
      duration: 3000,
    });
  } else {
    callBack(seletedData);
  }
};

const downloadSelected = (data: any, callBack: Function) => {
  notifyNoSelected(getSelected(data), (sData: any) => {
    let resInfoCodes: string[] = [];
    let filename = sData[0].resInfoName + "...";

    for (let i of sData) {
      resInfoCodes.push(i.resInfoCode);
    }
    downloadBatchResInfo(resInfoCodes, filename, callBack);
  });
};


const batchCommonOperate = (action: string, data: any, allSelectedFlag: boolean, callBack: Function) => {
  switch (action) {
    case "allSelected":
      for (let item of data.value) {
        item.selected = !allSelectedFlag;
      }
      break;
    case "deleteSelected":
      notifyNoSelected(getSelected(data), (sData: any) => {
        for (let item of sData) {
          rResInfo.delete(item.resInfoCode, callBack);
        }
      });
      break;
    case "download":
      downloadSelected(data, callBack);
      break;
    case "tagManageSelected":
      notifyNoSelected(getSelected(data), callBack);
      break;
    case "moveSelected":
      notifyNoSelected(getSelected(data), callBack);
      break;
    case "shareSelected":
      notifyNoSelected(getSelected(data), callBack);
      break;
  }
}


export {
  batchCommonOperate
};