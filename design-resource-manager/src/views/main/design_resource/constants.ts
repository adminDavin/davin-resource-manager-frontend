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
      'application/msword',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'PPT'
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
    rTypes: ['application/octet-stream'],
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
  return resourceTypes[8];
};

export default {
  getResourceType: getResourceType,
  resourceTypes: resourceTypes
};
