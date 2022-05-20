import axios from "@nextcloud/axios";
import alert_utils from "@/utils/alert_utils";

const projectTemplate = {
  '01输入': {
    '甲方': [
      '规划设计条件',
      '核定用地图',
      '现状地形图',
      '设计任务书',
      '其他',
    ],
    '外部引用': [
      '施工图'
    ],
    '参考资料': [],
    '效果图': [
    'XX年XX月XX日-轮次一',
    'XX年XX月XX日-轮次二',
    ],
    '会议纪要': [
      'X年XX月XX日-参会方',
      'XX年XX月XX日-参会方'
    ]
  },
  '02输出': [
    'XX年XX月XX日-XX事件-对接人'
  ],
  '03过程': [
    'XX年XX月XX日-XX事件-对接人'
  ],
  '04校审': [
    'XX年XX月XX日-出图缘由-校审一轮',
    'XX年XX月XX日-出图缘由-校审二轮',
    'XX年XX月XX日-出图缘由-校审三轮'
  ]
};

const getParams = (uid: string, tempFolder: string) => {
  return {
    method: "MKCOL",
    url: `/nextcloud/remote.php/dav/files/${uid}${tempFolder}`,
  }
}

const foldorCreate = async (uid: string, tempFolder: string) => {
  await axios.request(getParams(uid, tempFolder))
    .then(() => alert_utils.c_alert_success(`项目路径${tempFolder}创建成功`, 2000))
    .catch((error) => { 
      console.log(error.toJSON());
      alert_utils.c_alert_e(`项目路径${tempFolder}创建失败`, 2000);
    });
}

const projectCreate = (uid: string, folderName: string, callback: Function, error: Function) => {
  axios.request(getParams(uid, folderName))
    .then(({ data }) => callback(data))
    .catch((error) => { 
      console.log(error.toJSON());
      error();
    });
}

const batchCreateFolder = async (uid: string, tempFolder: string, childContent: any) => {
  if (childContent.length == 0) {
    return;
  }
  if (Array.isArray(childContent)) {
    for (let childFolder of childContent) {
      let tempChildFolder = `${tempFolder}/${childFolder}`;
      console.log(tempChildFolder);
      await foldorCreate(uid, tempChildFolder);
    }
  } else {
    for (let childFolder in childContent) {
      let tempChildFolder = `${tempFolder}/${childFolder}`;
      console.log(tempChildFolder);
      await foldorCreate(uid, tempChildFolder);
      await batchCreateFolder(uid, tempChildFolder, childContent[childFolder]);
    }
  }
};

export {
  projectTemplate,
  projectCreate,
  batchCreateFolder
};