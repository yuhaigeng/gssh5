<template>
   <div class="home">
        <app-header type="home"></app-header>
        <app-banner class="topHeight"></app-banner>
        <h1>hello world</h1>
        <homeGoods :mainActivityList = 'mainActivityList'></homeGoods>
        <homeGoods :mainActivityList = 'mainActivityList'></homeGoods>
        <app-footer></app-footer>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
import appBanner from "../../page/home/banner.vue";

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
                },
                // alertEs:[
                //      {
                //     isShow:false,
                //     noticeTitle: "【公告1】",
                //     noticeContent: "即日起杭州站下单时间为：下午14:00至晚间24:00"
                // },
                //  {
                //     isShow:false,
                //     noticeTitle: "【下单时间调整】",
                //     noticeContent: "即日起杭州站下单时间为：下午14:00至晚间24:00"
                // }

                // ]
                
       }
   },
  components: {
    appHeader,
    appFooter,
    appBanner,
    homeGoods
  }
}
</script>

<style scoped >
    .topHeight{
        margin-top:87px; 
    }

</style>
