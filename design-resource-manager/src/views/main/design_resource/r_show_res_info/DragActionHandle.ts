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

const dropForUpload = (dataTransfer: any, resInfo: any, callback: Function) => {
  if (dataTransfer.items.length > 0) {
    let showContent = [
      h("p", null, `资源文件开始上传`),
    ];
    for (let file of dataTransfer.items) {
      showContent.push(h("p", null, `资源文件: ${file.name}`));
    }
    ElNotification({
      message: h("div", null, showContent),
      type: "success",
      duration: 3000
    });

    for (let item of dataTransfer.items) {
      let resInfoParentCode = resInfo.resInfoType == "file"
        ? resInfo.resInfoParentCode
        : resInfo.resInfoCode;
      uploadFolder(resInfoParentCode, item.webkitGetAsEntry(), callback);
    }
  }
}

const uploadSingleFile = (resInfoParentCode: string, file: File, callback: Function) => {
  fo.beforeSimpleUpload(resInfoParentCode, file, (res: any) => callback());
};

const uploadFolder = (resInfoParentCode: string, entry: any, callback: Function) => {
  console.log('ddd');
  if (entry.isFile) {
    entry.file(
      (file: File) => uploadSingleFile(resInfoParentCode, file, callback),
      (e: any) => console.log(e)
    );
  } else {
    rResInfo.createFolder(entry.name, resInfoParentCode,
      (res: any) => {
        entry.createReader().readEntries(
          (entries: any) => entries.forEach((et: any) => uploadFolder(res.resInfoCode, et, callback)),
          (e: any) => console.log(e)
        );
      });
  }
};

export default { dropForMove, dropForUpload, disableDefaultDrag };