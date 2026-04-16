import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace('/wp-json/wc/v3', '') || '', 
  consumerKey: process.env.WC_CONSUMER_KEY || '',
  consumerSecret: process.env.WC_CONSUMER_SECRET || '',
  version: "wc/v3",
  queryStringAuth: true // 必须设置为 true 才能在 HTTPS 下正常工作
});

export default api;