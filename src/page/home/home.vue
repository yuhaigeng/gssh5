<template>
   <div class="home">
        <app-header type="home"></app-header>
        <app-banner1 class="topHeight"></app-banner1>
         <app-banner2 ></app-banner2>
        <homeGoods :mainActivityList = 'mainActivityList'></homeGoods>
        <homeGoods :mainActivityList = 'mainActivityList'></homeGoods>
        <app-footer></app-footer>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
import appBanner1 from "../../page/banner/banner1.vue";
import appBanner2 from "../../page/banner/banner2.vue";


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
        appBanner1,
        appBanner2,
        alert,
        homeGoods
    },
    mounted(){
        this.get_main_page();
    },
    methods:{
        get_main_page:function () {
            this.$ajax.get(this.HOST, {
                params:{
                    method: "main_page_show_three",
                    websiteNode: "3301"
                }
            }).then(result => {
                // return JSON.parse(JSON.stringify(result));
                return JSON.stringify(result.data);

                // console.log(data);
            }).then(data => {
                console.log(data);
                
            });
        }
    }
}
</script>

<style scoped >
    .topHeight{
        margin-top:87px; 
    }

</style>
