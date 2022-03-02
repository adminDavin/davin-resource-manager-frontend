import { downloadSingleResInfo } from './DownloadResInfo';

const showOperate = (resInfo: any, pickedResInfo: any) => {
  pickedResInfo.value = pickedResInfo.value && resInfo.resInfoCode === pickedResInfo.value.resInfoCode ? null : resInfo;
}

const singleCommonOperate = (action: string, resInfo: any, pickedResInfo: any, router: any, callback: Function) => {
  console.log(action);
  switch (action) {
    case "enter":
      pickedResInfo.value = resInfo;
      callback(resInfo);
      break;
    case "showOperate":
      showOperate(resInfo, pickedResInfo);
      break;
    case "download":
      callback(true);
      downloadSingleResInfo(resInfo, callback);
      break;
    case "preview":
      const { href } = router.resolve({
        path: "/res_preview",
        query: {
          resInfoCode: resInfo.resInfoCode,
        },
      });
      window.open(href, "_blank");
      break;
    default:
      callback(resInfo);
  }
};

export {
  singleCommonOperate
};