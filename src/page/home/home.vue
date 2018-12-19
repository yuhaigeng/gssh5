<template>
  <div class="home common-wrap">
    <app-header :type="headerMsg">
      <div slot="homeleft" class="index_header_left sprite icon_location_a" v-text="websiteNodeName"></div>
      <div slot="homeLogo"><img  src="../../assets/img/top_logo@2x.png" alt="" /></div>
    </app-header>
    <div class="main-wrap index-wrap">
      <div class="main">
        <div class="banner-wrap common-wrap">
          <banner v-if="topList.length" :imgList = "topList" :height = "'280px'" :isLogin = 'isLogin'  v-on:listenEvent = 'jumpRouter'></banner>
        </div>
        <div class="gonggao-wrap sprite icon_voice" v-if="noticeInfoList.length">
          <gg-banner :imgList = "noticeInfoList" v-on:listenIndex="showalert"></gg-banner>
        </div>
        <div class="index-advertisement-wrap"  v-if ='centerList.length'>
          <div class="index-advertisement" @click="jumpRouter([centerList[0].jumpType, centerList[0].linkUrl, centerList[0].adTime])">
            <img v-lazy="centerList[0].adLogo" alt="">
          </div>
        </div>
      </div>
      <div class="center_wrap">
        <div class="center">
          <homeGoods v-for="(item,index) in mainActivityList" :key="index" :mainActivityList = 'item' :isLogin='isLogin' v-on:listenEvent = 'jumpRouter' v-on:listenJump="goodsJump"></homeGoods>
          <div class="index-bottom">
            <span class="index-bottom-box"><span class="index-bottom-text" v-text="'已经到底了'" @click="click()"></span></span>
          </div>
        </div>
      </div>
    </div>
    <app-footer :isNew = 'isNewMessage' :isLogin = "isLogin"></app-footer>
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
import {mapState, mapMutations} from 'vuex'
import { getSystem , autoLogin , getHomeDate , getIsNewMessage} from "../../api/index.js";
import { setStore, setSession } from "../../config/mUtils.js";
export default {
  name: 'home',
  data() {
    return {
      mainActivityList:[],
      topList:[],
      noticeInfoList:[],
      centerList:[],
      noticeInfo:null,
      websiteNodeName:this.websiteDate.name,
      websiteNode:this.websiteDate.code,
      headerMsg:{
          type:"home",
      },
    }
  },
  //组件
  components: {
    appHeader,
    appFooter,
    banner,
    ggBanner,
    alert,
    homeGoods
  },
  //计算属性
  computed:{
    ...mapState([
        'tokenId','secretKey','firmId','userData','isLogin','isAutoLogin','isNewMessage','system'
    ]),
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
    this.INIT_DATA()
  },
  //完成挂载
  mounted(){
    if (sessionStorage.getItem('homePage')) {
      const homePage = JSON.parse(sessionStorage.getItem('homePage'));
      this.homePageData(homePage)
    }
    if (this.isLogin) {
      this.publicParameters = {
        tokenId:this.tokenId,
        source:'firmId'+this.firmId,
        sign:this.$md5('firmId'+this.firmId+"key"+this.secretKey).toUpperCase()
      }
      if (this.isAutoLogin) {
        this.autoLogin();
      }
    }
    this.get_main_page();
  },
  methods:{
    ...mapMutations([
      'INIT_DATA','SAVE_LOGIN_INFO','SAVE_AUTO_LOGIM','SAVE_MESSAGE','SAVE_SYSTEM'
    ]),
    //初始化时获取基本数据
    async initData(){
      if (!this.system) {
        let _this = this;
        getSystem().then(d => {
          if (d.statusCode == 100000) {
            _this.SAVE_SYSTEM(d.data)
          }
        })
      };
    },
    //获取首页数据
    get_main_page:function () {
      let _this = this;
      getHomeDate().then(d => {
        if (d.statusCode == 100000) {
          sessionStorage.setItem('homePage',JSON.stringify(d.data))
          _this.homePageData(d.data);
          
        }else{
          _this.$toast({
            message : d.statusStr,
            position: 'bottom',
            duration: 2000,
          })
        }
        if (!_this.isNewMessage) {
          _this.getMessage()
        }
      })
    },
    homePageData:function (data) {
      this.mainActivityList = data.mainActivityList;
      this.topList = data.topList;
      this.noticeInfoList = data.noticeInfoList;
      this.centerList = data.centerList;
      this.initData()
    },
    //自动登陆
    autoLogin:function(){
      let _this = this;
      autoLogin(this.tokenId).then( data => {
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
          _this.SAVE_AUTO_LOGIM();
          _this.SAVE_LOGIN_INFO({'tokenId':data.data.tokenId,'secretKey':data.data.secretKey,user_data});
        } else {
          let openid = localStorage.getItem("openid");
          localStorage.clear();
          sessionStorage.clear();
          localStorage.setItem("openid",openid);
          this.$toast({
            message : data.statusStr,
            position: 'middle',
            duration: 2000,
          })
        }
      })
    },
    getMessage:function () {
      getIsNewMessage(this.firmId , this.publicParameters).then(d => {
        if (d.statusCode == 100000) {
          d.data && this.SAVE_MESSAGE( true )
        }
      })
    },
    //显示关闭弹框
    showalert:function (data) {
      this.noticeInfoList[data].noticeContent = (this.noticeInfoList[data].noticeContent.toString()).replace(/\r\n/g, '<br/>')
      this.noticeInfo = this.noticeInfoList[data]
    },
    closeAlert:function (data) {
      this.noticeInfo = null;
    },
    jumpRouter:function(data){
      let code =  data[1].trim()
      let type = data[0]
      if (type) {
        if (type == 1) {
          let codeArr = data[1].split("&");
          return this.$router.push({path:'more',query:{typeCode:codeArr[1]}})
        }else if (type == 2) {
          return  this.$router.push({ path:'detail', query:{id:code }})
        }else {
          if(this.isLogin){
            if (type == 3) {
              return this.$router.push({path:'other',query:{typeCode:code,title: data[2]}})
            }else if(type == 4){
              return this.$router.push({path:'onlineCoupon'})
            }else if(type == 5){
              return this.$router.push({path:'vipCoupon',query:{type:code}})
            }else if(type == 6){
              return this.$router.push({path:'vip'})
            }
          }else{
            return this.$router.push({path:'login'})
          }
        }
      }else{
        return null;
      }
    },
    goodsJump(id,item){
      sessionStorage.setItem('goodsDetails',JSON.stringify(item.goodsInfo))
      this.$router.push({ path:'detail', query:{id:id }})
    }
  }

}
</script>

<style scoped >

@import "../../common/sprite.css";
.index-wrap{
  padding-top: 87px;
  margin-bottom: 98px;
}
.banner-wrap{
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
