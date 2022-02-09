const resourceTypes = [
  {
    label: "所有类型",
    rTypes: [],
    icon: 'suitcase',
    key: '',
    index: '0'
  },
  {
    label: "图片文件",
    rTypes: ['image/png', 'JPG', 'image/jpeg', 'BMP', 'GIF'],
    icon: 'add-location',
    key: 'image',
    index: '1'
  },
  {
    label: "普通文本",
    rTypes: ['text/plain', 'text/html'],
    icon: 'add-location',
    key: 'text',
    index: '2'
  },
  {
    label: "办公文件",
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
    label: "音频文件",
    rTypes: ['VOICE'],
    key: 'voice',
    icon: 'apple',
    index: '5'
  },
  {
    label: "视频文件",
    rTypes: ['VIDIO'],
    key: 'vidio',
    icon: 'baseball',
    index: '6'
  },
  {
    label: "压缩文件",
    rTypes: ['application/x-gzip'],
    key: 'zip',
    icon: 'baseball',
    index: '7'
  },
  
  {
    label: "未知类型",
    rTypes: ['OTHER'],
    key: 'others',
    icon: 'bowl',
    index: '8'
  },
  {
    label: "pdf文档",
    rTypes: ['application/pdf'],
    icon: 'add-location',
    key: 'pdf',
    index: '9'
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
