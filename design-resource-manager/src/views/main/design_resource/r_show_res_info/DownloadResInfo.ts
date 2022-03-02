import rResInfo from "../r_res_info";
import rResTask from '../r_res_task';

const downloadSingleResInfo = (resInfo: any, callBack: Function) => { 
  if (resInfo.resInfoType == "file") {
    callBack(true);
    rResInfo.downloadMultiResInfo(resInfo.resInfoCode, resInfo.resInfoSize, resInfo.resInfoName, callBack);
  } else { 
    downloadBatchResInfo([resInfo.resInfoCode], resInfo.resInfoName, callBack);
  }
};

const partSize = 2 * 1024 * 1024;

const downloadBatchResInfo = (resInfoCodes: string[], filename: string, callBack: Function) => {
  callBack(true);
  rResTask.createDownload({ resInfoCodes, filename: filename + ".zip", partSize }, (res: any) => { 
    rResTask.downloadMultiResInfo(res.resTaskCode, res.resInfoSize, res.resInfoName, callBack);
  });
 };

export { 
  downloadSingleResInfo,
  downloadBatchResInfo

};