// lib/woocommerce.ts
// @ts-ignore
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  // 直接使用基础域名，不要带后缀，让 SDK 自己处理版本号
  url: "https://admin.myreallovedoll.com", 
  consumerKey: process.env.WC_CONSUMER_KEY || '',
  consumerSecret: process.env.WC_CONSUMER_SECRET || '',
  version: "wc/v3",
  queryStringAuth: true 
});

export default api;