 const baseUrl = "http://192.168.0.189:7001/"
 const apiRoutUrl = baseUrl + "easy/shop/"
 const loginUrl = baseUrl + "easy/user/"
 module.exports = {
   baseUrl,//服务器地址
   apiRoutUrl, // 根接口
   loginUrl,//登录根接口
   listOneCatOfCom: apiRoutUrl + "listOneCatOfCom", // 查询一级分类 busId
   
   listTowCatOfCom: apiRoutUrl + "listTowCatOfCom", // 查询二级分类 categoryId
   
   listFirAndSecCatOfCom: apiRoutUrl + "listFirAndSecCatOfCom", // 查询一级和对应的二级分类 busId
   
   nomalPageAllOneOwnOfCom: apiRoutUrl + "nomalPageAllOneOwnOfCom", // 商户普通 categoryId 根据有无categoryId 判断是不是全部
   seckillPageAllOneOwnOfCom: apiRoutUrl + "seckillPageAllOneOwnOfCom", // 商户一级分类查询全部秒杀商品 categoryId, busId
   nomalPageAllOnePubOfCom: apiRoutUrl + "nomalPageAllOnePubOfCom", // 平台普通 categoryId,是否屏蔽,
   seckillPageAllOnePubOfCom: apiRoutUrl + "seckillPageAllOnePubOfCom", // 平台一级分类查询全部秒杀商品 categoryId, busId
   nomalPageAllOnePubNotUseOfCom:apiRoutUrl + "nomalPageAllOnePubNotUseOfCom",//屏蔽的普通
   seckillPageAllOnePubNotUseOfCom:apiRoutUrl + "seckillPageAllOnePubNotUseOfCom",//屏蔽的秒杀
   
   shieldGoodsOfCom: apiRoutUrl + "seckillPageAllOnePubOfCom", // 商户屏蔽商品 spuId, categoryId, busId, categoryNm, spuNm
   useGoodsOfCom: apiRoutUrl + "useGoodsOfCom", // 商户启用商品 spuId, busId
   
   addGoodsOfCom:apiRoutUrl + "addGoodsOfCom", //新增商品
   uploadFile: apiRoutUrl + "uploadFile", // 图片上传 file
   
   upNormalGoodsOfCom: apiRoutUrl + "upNormalGoodsOfCom", // 商户上架普通商品 startTime, EndTime, shopId
   upKillGoodsOfComId: apiRoutUrl + "upKillGoodsOfComId", // 商户上架秒杀商品 startDate, EndDate, startTime, endTime, shop
   downNormalGoodsOfCom: apiRoutUrl + "downNormalGoodsOfCom", // 商户下架普通商品 shopId
   downKillGoodsOfCom: apiRoutUrl + "downKillGoodsOfCom", // 商户下架秒杀商品 shopId
   
   viewOrders: apiRoutUrl + "viewOrders", // 商户查看订单  busId, statCd
   
   busLogin:loginUrl + "busLogin", //登录 username password
   busLogout:loginUrl + "busLogout", //退出登录 token
   
 };
