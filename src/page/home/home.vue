<template>
   <div class="home">
        <app-header type="home"></app-header>
        <div class="main-wrap index-wrap">
		    <div class="main">
                <div id="banner-wrap">
                    <banner :imgList = "topList" v-if="topList.length"></banner>
                </div>
                <div class="gonggao-wrap sprite icon_voice">
                    <gg-banner :imgList = "noticeInfoList" v-if="noticeInfoList.length" v-on:listenIndex="showalert"></gg-banner>
                </div>
                <div class="index-advertisement-wrap">
                    <div class="index-advertisement">
                        
                    </div>
                </div>
                <div class="center_wrap">
                    <div class="center">
                        <homeGoods v-for="(item,index) in mainActivityList" :key="index" :mainActivityList = 'item' :isLogin='isLogin'></homeGoods>
                        <div class="index-bottom">
                            <span class="index-bottom-box"><span class="index-bottom-text" v-text="'已经到底了'"></span></span>
                        </div>
                    </div>
                </div>
		    </div>
        </div>
        <app-footer :isNew='isNew'></app-footer>
        <alert :noticeInfoList="noticeInfo" v-if="noticeInfo" v-on:listenClose = "closeAlert"></alert>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
import banner from "../banner/homeBanner.vue";
import ggBanner from "../banner/gonggaoBanner.vue";
import homeGoods from "./homeGoods.vue";
import alert from "../../components/public/alert.vue";
import { getSystem , getMessage , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
export default {
   name: 'home',
   data() {
       return {
           mainActivityList:[],
           websiteNode: "3301",  
           topList:[],
           noticeInfoList:[],
           centerList:[],
           noticeInfo:null,
           tokenId:null,
           isLogin:getIsLogin(),
           isNew:false,//表示是否有新消息
       }
    },
    components: {
        appHeader,
        appFooter,
        banner,
        ggBanner,
        alert,
        homeGoods
    },
    //生命周期总结
    // beforecreate : 举个栗子：可以在这加个loading事件 
    // created ：在这结束loading，还做一些初始化，实现函数自执行 
    // mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情
    // beforeDestroy： 你确认删除XX吗？ destroyed ：当前组件已被删除，清空相关内容
    //el 和 data 并未初始化 
    beforecreated(){

    },
    //:完成了 data 数据的初始化，el没有
    created(){

    },
    //完成了 el 和 data 初始化 
    beforeMount(){

    },
    //完成挂载
    mounted(){
        
        this.get_main_page();
        if (getIsLogin()) {
            this.tokenId = getTokenId();
            if (sessionStorage.getItem("isAuto") != "true") {
                this.autoLogin();
            }
            const userInfo = JSON.parse(getUserData());
            this.userBasicParam = {
                firmId : userInfo.firmInfoid,
				source : 'firmId'+userInfo.firmInfoid,
				sign : this.$md5('firmId'+userInfo.firmInfoid+"key"+getSecretKey()).toUpperCase(),
				tokenId : getTokenId()
            }
            getMessage(this)
        }
    },
    watch:{
        isNew:function (val,oldval) {
            console.log(val,oldval)
        }
    },
    methods:{
        //获取首页数据
        get_main_page:function () {
            this.$ajax.get('/api', {
                params:{
                    method: "main_page_show_three",
                    websiteNode:this.websiteNode
                }
            }).then(result => {
                console.log(result)
                return result.data;
            }).then(data => {
                if (data.statusCode == 100000) {
                    this.mainActivityList = data.data.mainActivityList;
                    this.topList = data.data.topList;
                    this.noticeInfoList = data.data.noticeInfoList;
                    this.centerList = data.data.centerList;
                    if (!sessionStorage.getItem('system')) {
						getSystem(this)
					}
                } else {
                    console.log(data.statusStr)
                }
            })
        },
        
        //自动登陆
        autoLogin:function(){
            this.$ajax.get('/api',{
                params:{
                    method:'user_login',
                    tokenId:this.tokenId
                }
            }).then(result =>{
                return result.data
            }).then(data =>{
                console.log(data)
                if (data.statusCode == 100000) {
                    const user_data={
                        cuserInfoid:data.data.cuserInfo.id,
                        firmInfoid:data.data.firmInfo.id,
                        firmName:data.data.firmInfo.firmName,
                        linkTel:data.data.cuserInfo.mobile,
                        score:data.data.firmInfo.score,
                        next:data.data.firmInfo.next,
                        userGrade:data.data.firmInfo.userGrade,
                        websiteNode:data.data.firmInfo.websiteNode,
                        faceImgUrl:data.data.firmInfo.faceImgUrl,
                        websiteNodeName:data.data.firmInfo.websiteNodeName
                    }
                    sessionStorage.setItem("isAuto","true");
                    localStorage.setItem("user_data",JSON.stringify(user_data));
                    localStorage.setItem("tokenId",data.data.tokenId);
                    localStorage.setItem("secretKey",data.data.secretKey);
                } else {
                    var openid = localStorage.getItem("openid");
					localStorage.clear();
					localStorage.setItem("openid",openid);
                    console.log(data.statusStr)
                }
                
            });
        },
        //显示关闭弹框
        showalert:function (data) {
            this.noticeInfo = this.noticeInfoList[data];
        },
        closeAlert:function (data) {
            this.noticeInfo = null;
        }
    }
}
</script>

<style scoped >

@import "../../common/sprite.css";
    .index-wrap{
        padding-top: 87px;
    }
    #banner-wrap{
        width: 100%;
        height: 280px;
        overflow: hidden;
        position: relative;
        background: url(../../assets/img/pic_logo@2x.png) center no-repeat;
        background-size: auto
    }
    .swiper-wrapper,.swiper-slide{width: 100%;height: 100%;}
    .swiper-slide img{width: 100%;height: 100%;}
    .gonggao-wrap{width: 100%;height: 50px;overflow: hidden;}
    .gonggao-wrap.sprite{background-color: #FFFFFF}
    .index-wrap .center_wrap{margin-bottom: 20px;}
    .center_tit{width: 750px;height: 50px;background: #F66B0C;color: #FFF;text-indent: 24px;line-height: 50px;font-size: 30px;font-weight: normal;}
    .center_goodes{width: 100%;background: #FFFFFF;}
    .center_goodes dl{width: 250px;padding-top: 24px;text-align: center;border-right:1px solid #d9d9d9 ;border-bottom: 1px solid #D9D9D9;float: left;}
    .center_goodes dt img{width: 210px;height: 210px;}
    .center_goodes dd{width: 100%;text-align: center;line-height: 43px;white-space: nowrap;overflow: hidden;font-size: 24px;color: #666;padding: 0 15px;text-overflow: ellipsis;}
    .center_goodes dd.clearfloat{padding: 0 10px;}
    .index_goods_icon{float: left;vertical-align: middle;}
    .index-bottom{text-align: center;font-size: 28px;color: #ccc;line-height: 64px;padding-top: 20px;background: #E5E5E5;}
    .index-bottom-text{padding: 0 22px;}
    .index-bottom-box:after{display: inline-block;content: "";width: 80px;height: 2px;background: #CCC;vertical-align:middle;margin-top: -2px;}
    .index-bottom-box:before{display: inline-block;content: "";width: 80px;height: 2px;background: #CCC;vertical-align:middle;margin-top: -2px;}

</style>
