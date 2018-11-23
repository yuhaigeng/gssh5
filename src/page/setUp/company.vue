<template>
  <div class="common-wrap">
    <setHeader :type="headerMsg">
      <div class="header_right login_top_right" slot="sure" v-text="'保存'" @click="keep"></div>
    </setHeader>
    <div class="main-wrap business_main_wrap" v-show="personInfo.id">
    <ul class="content1">
      <li>
        <div><label>名称：</label><input type="text" v-model="firmName" id="business_shop_name" ></div>
        <div><label>ID：</label><input type='text' :value="'NO.'+personInfo.id" id="business_shop_id" disabled="disabled"></div>
      </li>
      <li>
        <div class="jifen_jifen"><label>总成长值：</label><input type='text' :value='personInfo.exp' id="business_shop_score" disabled="disabled"></div>
        <div class="dengji"><label @click="agreement">会员等级：</label><input type='text' :value='personInfo.userGrade' id="business_shop_grade" disabled="disabled"></div>
      </li>
    </ul>
    <ul class="content2">
      <li><label>地址：</label><input type='text' id="business_shop_address"  v-model="address"></li>
      <li><label>营业执照：</label><input type='text' id="business_shop_card"  v-model="saleCard"></li>
      <li><label>联系电话：</label><input type='text' id="business_shop_tel" :value='personInfo.linkTel' disabled="disabled"></li>
      <li><label>联系人：</label><input type='text' id="business_shop_man"  v-model="linkMan"></li>
      <li><label>合同协议：</label><input type='text' value='' disabled="disabled"></li>
      <li><label>认证状态：</label><input type='text' id="business_shop_authStatus" :value='authStatus[personInfo.authStatus]' disabled="disabled"></li>
    </ul>
    <ul class="content3">
      <li class="zhanghao" v-for="(item,index) in personInfo.cuserInfoList" :key="index">
        <div class="main__"><label v-text="isMain[item.isMain]+':'"></label><input type='text' :value='item.mobile' disabled="disabled"></div>
        <div class="zhangtai"><input type="text" :value="status[item.status]" disabled="disabled"></div>
      </li>
    </ul>
    </div>
    <agreementAlert :noticeInfoList="noticeInfoList"  v-if="noticeInfoList"  v-on:listenClose = "closeAlert"> </agreementAlert>
  </div>
</template>

<script>
import setHeader from "../../components/public/header.vue";
import agreementAlert from  "../../components/public/alert.vue";
import { getSystem , getMessage , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
export default {
  name:'company',
  components:{
      setHeader ,
      agreementAlert
  },
  data() {
    return {
      headerMsg:{
        type:"common",
        title:'企业信息',
        left:'返回'
      },
      firmId:'' ,
      userBasicParam:{},
      userId:'',
      firmName:null,
      linkMan:null,
      saleCard:null,
      address:null,
      isMain:{"1":"主账号：","2":"副账号："},
      status:{"1":"启用","2":"禁用"},
      authStatus:{"0":'待认证',"-1":'未通过',"1":'已认证'},
      personInfo:{},
      noticeInfoList:null,
      cache:{}
    }
  },
  mounted:function(){
    this.userId = JSON.parse(getUserData()).cuserInfoid
    this.firmId =  JSON.parse(getUserData()) ? JSON.parse(getUserData()).firmInfoid : "" ;
    this.userBasicParam = {
      source:'firmId'+ this.firmId,
      tokenId: getTokenId(),
      sign :this.$md5('firmId'+ this.firmId + "key" + getSecretKey()).toUpperCase()
    }
      this.business()
  },
  methods:{
    business:function(){
      this.$ajax.get(this.HOST, {
        params:Object.assign({
          method:'firm_info_show',
          firmId: this.firmId,
        },this.userBasicParam)
      }).then(resp => {
        if(resp.data.statusCode ==  "100000"){
          this.personInfo = resp.data.data
          this.firmName = this.personInfo.firmName
          this.linkMan = this.personInfo.linkMan
          this.saleCard = this.personInfo.saleCard
          this.address = this.personInfo.address
        }
      }).catch(err => {
      });
    },
    save:function(){
      this.$ajax.get(this.HOST, {
        params:Object.assign({
          method:'firm_info_update',
          firmId:this.firmId,
          userId:this.userId,
          firmName:this.firmName,
          linkMan:this.linkMan,
          saleCard:this.saleCard,
          address:this.address,
        },this.userBasicParam)
      }).then(resp => {
        if(resp.data.statusCode == '100000'){
          this.$toast({
            message: '保存成功',
            center: true,
            duration: 2000,
          });
          this.$router.go(-1)
        }else{
          this.$toast({
            message: resp.data.statusStr,
            center: true,
            duration: 2000,
          });
        }
      }).catch(err => {
      });
    },
    desc_data:function(){
      this.$ajax.get(this.HOST, {
        params:{
          method:'gss_desc',
          websiteNode:this.websiteDate.code,
          code:this.websiteDate.code + '#HYDJ-DESC'
      }
      }).then(resp => {
        if(resp.data.statusCode ==  "100000"){
          resp.data.data.noticeContent =  (resp.data.data.desc.toString()).replace(/\r\n/g, '<br/>');
          resp.data.data.noticeTitle =  resp.data.data.title;
          resp.data.data.alertType = 1;
          this.noticeInfoList = resp.data.data;
          let key = this.websiteDate.code + this.descCode ;
          let obj = '{'+'"'+key+'"'+':'+JSON.stringify(resp.data.data)+'}'
          this.cache = Object.assign(this.cache,JSON.parse(obj))
        }
      }).catch(err => {
      });
      },
    agreement:function(){
      if (this.cache[this.websiteDate.code+this.descCode]) {
        this.noticeInfoList = this.cache[this.websiteDate.code+this.descCode]
      }else{
        this.desc_data()
      }
    },
    closeAlert:function(){
      this.noticeInfoList = null;
    },
    keep:function(){
      this.save()
    }
  }
}
</script>

<style scoped>
.main-wrap{
  max-width: 750px;
  margin-top: 107px;
}
.business_main_wrap {
  height: 1244px;
}
.content1, .content2, .content3 {
  width: 100%;
  background: #fff;
  margin-top: 22px;
}
.content1 li, .content3 li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.content1 li, .content2 li, .content3 li {
  height: 80px;
  line-height: 80px;
  font-size: 30px;
  border-bottom: 1px solid #d8d8d8;
  margin-left: 22px;
}
.content1 li div:nth-child(1) {
  width: 370px;
}
.business_main_wrap label {
  color: #000;
}
#business_shop_name {
  width: 250px;
}
.content1 input {
  width: 200px;
  height: 76px;
}
.business_main_wrap input {
  background: #FFF;
  color: #f66b0c;
  font-size: 26px;
}
.business_main_wrap input[disabled=disabled] {
  color: #999;
}
button[disabled], html input[disabled] {
  cursor: default;
}
input[disabled=disabled] {
  background: #FFF;
}
.content1 li div:nth-child(2) {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}
.dengji label {
  color: #00f;
}
.content2 input {
  width: 500px;
  height: 76px;
}
.main__ input, .old1 input, .old2 input {
  width: 60%;
  height: 76px;
}
.zhangtai {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  margin-right: 22px;
}
.content3 .zhangtai input {
  width: 100%;
  height: 76px;
  text-align: right;
}
</style>
