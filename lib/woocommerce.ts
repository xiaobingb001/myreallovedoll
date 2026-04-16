// lib/woocommerce.ts
// @ts-ignore
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  // 只保留域名，不要任何后缀
  url: "https://admin.myreallovedoll.com", 
  consumerKey: process.env.WC_CONSUMER_KEY || '',
  consumerSecret: process.env.WC_CONSUMER_SECRET || '',
  version: "wc/v3",
  queryStringAuth: true 
});

export default api;