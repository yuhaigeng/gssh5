<template>
  <div class="home common-wrap">
    <app-header :type="headerMsg">
      <div slot="homeleft" class="index_header_left sprite icon_location_a" v-text="websiteNodeName"></div>
      <div slot="homeLogo"><img  src="../../assets/img/top_logo@2x.png" alt="" /></div>
    </app-header>
    <div class="main-wrap index-wrap">
      <div class="main">
        <div id="banner-wrap common-wrap">
          <banner :imgList = "topList" :height = "'280px'" v-if="topList.length"></banner>
        </div>
        <div class="gonggao-wrap sprite icon_voice">
          <gg-banner :imgList = "noticeInfoList" v-if="noticeInfoList.length" v-on:listenIndex="showalert"></gg-banner>
        </div>
        <div class="index-advertisement-wrap">
          <div class="index-advertisement" v-if ='centerList.length' @click="jumpRouter(centerList[0].jumpType, centerList[0].linkUrl, centerList[0].adTime)">
            <img v-lazy="centerList[0].adLogo" alt="">
          </div>
        </div>
      </div>
      <div class="center_wrap">
        <div class="center">
          <homeGoods v-for="(item,index) in mainActivityList" :key="index" :mainActivityList = 'item' :isLogin='isLogin'></homeGoods>
          <div class="index-bottom">
            <span class="index-bottom-box"><span class="index-bottom-text" v-text="'已经到底了'" @click="click()"></span></span>
          </div>
        </div>
      </div>
    </div>
    <app-footer :isNew = 'isNew' :isLogin = "isLogin"></app-footer>
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
import { system } from "../../api/index.js";
export default {
  name: 'home',
  data() {
    return {
      mainActivityList:[],
      topList:[],
      noticeInfoList:[],
      centerList:[],
      noticeInfo:null,
      tokenId:null,
      isLogin:getIsLogin(),
      websiteNodeName:this.websiteDate.name,
      websiteNode:this.websiteDate.code,
      isNew:false,//表示是否有新消息
      headerMsg:{
          type:"home",
      },
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
  //完成挂载
  mounted(){
    console.log(this.websiteDate)
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
        //getMessage(this)
    }
  },
  watch:{
    isNew:function (val,oldval) {
    }

  },
  methods:{
    click() {
      let obj = {
        method: "system_config_constant",
        websiteNode:'3301'
      }
     system(obj).then(data => {
        console.log(data)
      })
    },
    //获取首页数据
    get_main_page:function () {
      this.$ajax.get(this.HOST, {
        params:{
          method: "main_page_show_three",
          websiteNode:this.websiteNode
        }
      }).then(result => {
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
        }
      })
    },
    //自动登陆
    autoLogin:function(){
      this.$ajax.get(this.HOST,{
        params:{
          method:'user_login',
          tokenId:this.tokenId
        }
      }).then(result =>{
        return result.data
      }).then(data =>{
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
          let openid = localStorage.getItem("openid");
          localStorage.clear();
          localStorage.setItem("openid",openid);
          console.log(data.statusStr)
        }
      });
    },
    //显示关闭弹框
    showalert:function (data) {
      this.noticeInfoList[data].noticeContent = (this.noticeInfoList[data].noticeContent.toString()).replace(/\r\n/g, '<br/>')
      this.noticeInfo = this.noticeInfoList[data]
    },
    closeAlert:function (data) {
      this.noticeInfo = null;
    },
    jumpRouter:function(type,code,tit){
      if(this.isLogin){
        code =  code.trim()
        if (type) {
          if (type == 1) {
            let codeArr = code.split("&");
            return this.$router.push({path:'more',query:{typeCode:codeArr[1]}})
          }else if (type == 2) {
            return this.$router.push({path:'detail/'+code})
          }else if (type == 3) {
            return this.$router.push({path:'details',query:{typeCode:code,title:tit}})
          }else if(type == 4){
            return this.$router.push({path:'onlineCoupon'})
          }else if(type == 5){
            return this.$router.push({path:'vip_ticket_center',query:{type:code}})
          }else if(type == 6){
            return this.$router.push({path:'vip'})
          }
        }
        return null;
      }else{
          return this.$router.push({path:'login'})
      }
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
.gonggao-wrap{width: 100%;height: 50px;overflow: hidden;}
.gonggao-wrap.sprite{background-color: #FFFFFF}
.index-wrap .center_wrap{margin-bottom: 20px;}

.index-bottom{text-align: center;font-size: 28px;color: #ccc;line-height: 64px;padding-top: 20px;background: #E5E5E5;}
.index-bottom-text{padding: 0 22px;}
.index-bottom-box:after{display: inline-block;content: "";width: 80px;height: 2px;background: #CCC;vertical-align:middle;margin-top: -2px;}
.index-bottom-box:before{display: inline-block;content: "";width: 80px;height: 2px;background: #CCC;vertical-align:middle;margin-top: -2px;}
/* 头部样式 */

.index_header_left{
  text-indent: 80px;
  width: 180px;
}
.index-advertisement-wrap .index-advertisement {
  height: 200px;
  overflow: hidden;
}
.index-advertisement img{
  width: 100%;
  height: 100%;
}
</style>
