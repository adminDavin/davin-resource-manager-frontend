const resourceTypes = {
  "dmg": [3, 14],
  "unknown": [1, 0],
  "folder": [0, 16],
  "csv": [2, 1],
  "xlsx": [2, 1],
  "png": [6, 8],
  "jpg": [5, 8],
  "zip": [2, 13],
  "pdf": [0, 0],
  "doc": [0, 1],
  "docx": [0, 1],
  "ppt": [4, 1],
  "pptx": [1, 1],
  "dwg": [1, 4],
  "dxf": [0, 4],
};

const relatedConfig = (p: any) => {
  if (p && p in resourceTypes) {
    return resourceTypes[p];
  }
  return resourceTypes['unknown'];
};

const defaultIcon = [10, 20];

const getResInfoStyle = (resInfo: any, wh: number[]) => {
  let r = resInfo.resInfoType == 'folder' ? resourceTypes['folder'] : relatedConfig(resInfo.resInfoName.split('.').pop()?.toLowerCase());
  return `width: ${wh[0]}px; height: ${wh[1]}px; 
  background-position: -${wh[0] * r[0]}px -${wh[1] * r[1]}px;
  background-size: ${defaultIcon[0] * wh[0]}px ${defaultIcon[1] * wh[1]}px;`;
};

export default {
  resourceTypes: resourceTypes,
  getResInfoStyle
};
