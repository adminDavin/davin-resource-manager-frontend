import { h } from "vue";
import { ElNotification } from 'element-plus';
import fo from "../manager/FileOperate";
import rResInfo from "../r_res_info";

const disableDefaultDrag = (ele: any) => {
  ele.addEventListener("dragenter", (e: any) => e.preventDefault());
  ele.addEventListener("dragleave", (e: any) => e.preventDefault()); //拖离
  ele.addEventListener("drop", (e: any) => e.preventDefault()); //拖后放
  ele.addEventListener("dragenter", (e: any) => e.preventDefault()); //拖进
  ele.addEventListener("dragover", (e: any) => e.preventDefault()); //拖来拖去
};

const dropForMove = (sourceResInfos: any, resInfo: any, callback: Function) => {
  const sResInfoCodes: string[] = [];
  for (let item of sourceResInfos) {
    sResInfoCodes.push(item.resInfoCode);
  }
  if (resInfo.resInfoType == 'folder') {
    if (sResInfoCodes.indexOf('resInfo.resInfoCode') < 0) {
      rResInfo.move({ sResInfoCodes, tResInfoCode: resInfo.resInfoCode }, callback);
    } else {
      ElNotification({
        message: '不能将文件自己移动到自己内部，未执行移动操作',
        type: "warning",
        duration: 3000
      });
    }
  } else {
    ElNotification({
      message: '移动的目标不是文件夹，未执行移动操作',
      type: "warning",
      duration: 3000
    });
  }

}

const dropForUpload = (files: any, resInfo: any, callback: Function) => {
  if (files.length > 0) {
    let resInfoParentPath =
      resInfo.resInfoType == "file"
        ? resInfo.resInfoParentPath
        : resInfo.resInfoPath;

    let upLoadsFiles: any = {};

    let showContent = [
      h("p", null, `资源文件将上传至路径: ${resInfoParentPath}`),
    ];
    for (let file of files) {
      showContent.push(h("p", null, `资源文件: ${file.name}`));
    }
    ElNotification({
      message: h("div", null, showContent),
      type: "success",
      duration: 3000
    });

    for (let file of files) {
      if (file.size > 0) {
        fo.beforeSimpleUpload(
          resInfo.resInfoType == "file"
            ? resInfo.resInfoParentCode
            : resInfo.resInfoCode,
          file,
          (res: any) => {
            let r = res.data;
            upLoadsFiles[r.resInfoCode] = {
              "resInfoName:": r.resInfoName,
              "resInfoCode:": r.resInfoCode,
              status: Math.ceil(
                (r.resTaskStatus / resInfo.partCount) * 100
              ),
            };
            callback();
          }
        );
      }
    }
  }
}


export default { dropForMove, dropForUpload, disableDefaultDrag };