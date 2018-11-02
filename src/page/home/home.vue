<template>
   <div class="home">
        <app-header type="home"></app-header>
        <app-banner1 class="topHeight"></app-banner1>
        <app-banner2></app-banner2>
        <homeGoods :mainActivityList = 'mainActivityList'></homeGoods>
        <homeGoods :mainActivityList = 'mainActivityList'></homeGoods>
        <alert></alert>
        <app-footer></app-footer>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
import appBanner1 from "../../page/banner/banner1.vue";
import appBanner2 from "../../page/banner/banner2.vue";
import alert from "../../components/public/alert.vue";
import homeGoods from "./homeGoods.vue";
export default {
   name: 'home',
   data() {
       return {
           mainActivityList: {
                    activityDetailsList:[
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"}
                    
                    ],
                    activityTitle:"秋季价到-坚果零食盛宴",
                    goodsNum: 3
                }
       }
   },
  components: {
    appHeader,
    appFooter,
    appBanner1,
    appBanner2,
    alert,
    homeGoods
  }
}
</script>

<style scoped >
    .topHeight{
        margin-top:87px; 
    }

</style>
