export default {
  defaultImportColumns: {
    importSaleGoodsResource: [{ label: "品类编码", index: 1, key: "goodsCode" },
      { label: "品类名称", index: 2, key: "goodsName" },
      { label: "销售数量", index: 3, key: "quantity" }],
    importRestGoodsResource: [
      { label: "所属仓库", index: 0, key: "warehouseName" },
      { label: "品类编码", index: 1, key:  "goodsCode"},
      { label: "品类名称", index: 2, key: "goodsName" },
      { label: "品类类型", index: 3, key: "goodsType" },
      { label: "库存数量", index: 4, key: "quantity" }]
  }
};