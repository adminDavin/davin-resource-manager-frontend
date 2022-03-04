import d_const from "@/views/main/design_resource/constants";

const getFileExtend = (name: string) => name.split(".").pop()?.toLowerCase();

const handleDoc = (router: any, resContentType: any, tempRes: any) => {
  if (resContentType == 'application/pdf') {
    router.push({ path: "/res_preview/pdf", query: tempRes });
  } else {
    router.push({ path: "/res_preview/doc", query: tempRes });
  }
};

const judgeRoute = (router: any, res: any) => {
  let tempRes = { resInfoCode: res.resInfoCode, resInfoName: res.resInfoName }

  if (d_const.isImage(res.resContentType)) {
    router.push({ path: "/res_preview/image", query: tempRes });
  } else if (d_const.isDocu(res.resContentType)) {
    handleDoc(router, res.resContentType, tempRes);
  } else if (d_const.isText(res.resContentType)) {
    router.push({ path: "/res_preview/text", query: tempRes });
  } else {
    var fe = getFileExtend(tempRes.resInfoName);
    if (fe == "ppt" || fe == "pptx") {
      router.push({ path: "/res_preview/doc", query: tempRes });
    } else if (fe == 'dxf') {
      router.push({
        path: "/res_preview/dxf",
        query: tempRes,
      });
    } else {
      router.push({
        path: "/res_preview/others",
        query: tempRes,
      });
    }
  }
}

export {
  judgeRoute
}