import rResTask from "../r_res_task";
import SparkMD5 from "spark-md5";

const bytesPerPiece = 5 * 1024 * 1024; // 每个文件切片大小定为50MB

const submitUpload = (file: any, resTaskCode: string, isNeedPartUpload: boolean, callback: Function) => {
  let dataFile = file;

  if (isNeedPartUpload) {
    rResTask.uploadRes(resTaskCode, file, 0, (res: any) => callback(res));
  } else {
    let spark = new SparkMD5();
    let fileReader = new FileReader();
    if (dataFile.size > bytesPerPiece) {
      let data1 = dataFile.slice(0, bytesPerPiece);
      fileReader.readAsBinaryString(data1);
    } else {
      fileReader.readAsBinaryString(dataFile);
    }
    fileReader.onload = (e: any) => {
      spark.appendBinary(e.target.result);
      let md5 = spark.end();
      uploadPart(resTaskCode, file, 0, md5, callback);
    };
  }
};
const uploadPart = (resTaskCode: string, file: File, num: number, md5: any, callback: Function) => {
  let start = num * bytesPerPiece;
  let end = start + bytesPerPiece;
  if (start >= file.size) return;
  if (end > file.size) {
    end = file.size;
  }
  rResTask.uploadRes(resTaskCode,
    file.slice(start, end),
    num + 1,
    (res: any) => {
      let task = res.data;
      uploadPart(resTaskCode, file, ++num, md5, callback);
      callback(res);
    }
  );
};
const beforeUpload = (resInfoParentCode: string, file: File, callback: Function) => {
  return rResTask.createResTasks(
    {
      resInfoParentCode: resInfoParentCode,
      filename: file.name,
      partCount: Math.ceil(file.size / bytesPerPiece),
      fileSize: file.size,
      contentType: "application/octet-stream",
    },
    (res: any) => {
      callback(res);
    }
  );
};
const beforeSimpleUpload = (resInfoParentCode: string, file: File, callback: Function) => {
  return rResTask.createResTasks(
    {
      resInfoParentCode: resInfoParentCode,
      filename: file.name,
      partCount: Math.ceil(file.size / bytesPerPiece),
      fileSize: file.size,
      contentType: file.type,
    },
    (res1: any) => {
      let taskCode = res1.resTask.resTaskCode;
      let isNeedPartUpload = res1.partUploadId == null;
      submitUpload(file, taskCode, isNeedPartUpload, callback);
    }
  );
};

export default { beforeUpload, submitUpload, beforeSimpleUpload };