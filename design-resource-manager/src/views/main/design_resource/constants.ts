const resourceTypes = [
  {
    label: "最近",
    rTypes: [],
    icon: 'suitcase',
    key: 'recent',
    index: '0'
  },
  {
    label: "图片",
    rTypes: ['image/png', 'JPG', 'image/jpeg', 'BMP', 'GIF'],
    icon: 'add-location',
    key: 'image',
    index: '1'
  },
  {
    label: "文本",
    rTypes: ['text/plain', 'text/html', 'application/json'],
    icon: 'add-location',
    key: 'text',
    index: '2'
  },
  {
    label: "文档",
    rTypes: [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/msword',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'PPT',
      'text/csv',
      'application/pdf'
    ],
    key: 'excel',
    icon: 'aim',
    index: '3'
  },
  {
    label: "视频",
    rTypes: ['VOICE'],
    key: 'voice',
    icon: 'apple',
    index: '5'
  },
  {
    label: "其他",
    rTypes: ['application/octet-stream', 'application/x-x509-ca-cert', 'application/zip'],
    key: 'others',
    icon: 'bowl',
    index: '8'
  },
];

const getResourceType = (resContentType: string) => {
  for (let item of resourceTypes) {
    if (item.rTypes.indexOf(resContentType) > -1) {
      return item;
    }
  }
  return resourceTypes[5];
};

const getResourceTypeByIndex = (index: string) => {
  for (let item of resourceTypes) {
    if (item.index == index) {
      return item;
    }
  }
  return resourceTypes[5];
};

const isImage = (resContentType: string) => { 
  return getResourceTypeByIndex("1").rTypes.indexOf(resContentType) > -1
}

const isText = (resContentType: string) => {
  return resourceTypes["2"].rTypes.indexOf(resContentType) > -1
};

const isDocu = (resContentType: string) => { 
  return getResourceTypeByIndex("3").rTypes.indexOf(resContentType) > -1
}


export default {
  getResourceType: getResourceType,
  getResourceTypeByIndex: getResourceTypeByIndex,
  resourceTypes: resourceTypes,
  isText,
  isImage,
  isDocu
};
