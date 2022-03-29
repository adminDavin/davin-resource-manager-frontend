import request from "@/utils/system/request";

const baseUrl = "api/sys";

const getBanners = (sectionArea: string, callback: Function) => {
  request({
    url: `/banner?sectionArea=${sectionArea}`,
    method: "get",
    data: { sectionArea },
    baseURL: baseUrl,
  })
    .then((res) => {
      callback(res.data);
    });
};

const getNews = (sectionArea: string, callback: Function) => {
  request({
    url: `/news`,
    method: "get",
    data: { sectionArea },
    baseURL: baseUrl,
  })
    .then((res) => {
      callback(res.data);
    });
};


const getMerchants = (sectionArea: string, callback: Function) => {
  request({
    url: `/merchants`,
    method: "get",
    data: { sectionArea },
    baseURL: baseUrl,
  })
    .then((res) => {
      callback(res.data);
    });
};
const getMerchantProducts = (merchantCode: string, callback: Function) => {
  request({
    url: `/merchant/productList?merchantCode=${merchantCode}`,
    method: "get",
    data: { merchantCode },
    baseURL: baseUrl,
  })
    .then((res) => {
      callback(res.data);
    });
}
const getMerchantInfo = (id: any, callback: Function) => {
  request({
    url: `/merchant/info/${id}`,
    method: "get",
    baseURL: baseUrl,
  })
    .then((res) => {
      callback(res.data);
    });
}
export {
  getBanners,
  getNews,
  getMerchants,
  getMerchantProducts,
  getMerchantInfo
};