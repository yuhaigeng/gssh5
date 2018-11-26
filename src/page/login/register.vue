<template>
  <div class="register common-wrap">
    <app-header :type = "headerMsg">
      <div slot="commonAlert" @click="agreement(0)">合作协议</div>
    </app-header>
      <div class="main-wrap login_main-wrap">
        <div class="main">
          <ul class="apply_service_main" :class="{'hidden':isMainHidden}">
            <li>
              <span class="left">店铺名称：</span><input type="text" id="shopName" placeholder="请输入店铺名称"  v-model=" firmName"  @focus="focus" @blur="blur" />
            </li>
            <li>
              <span class="left">联系电话：</span><input type="text" id="shopPhone" v-model="shopPhone" maxlength="11" placeholder="请输入联系电话" @focus="focus" @blur="blur"/><span class="msg" v-text="phoneMsg"></span>
            </li>
            <li>
              <span class="left">联系人：</span><input type="text" id="shopPeople" v-model="linkMan" placeholder="请输入联系人" @focus="focus" @blur="blur" />
            </li>
            <li>
              <span class="left">选择省市：</span><input type="text" id="province" placeholder="点击选择省市"  v-model="city" readonly="readonly" @focus="focus" @blur="blur" @click="selCity"  />

            </li>
            <li>
              <span class="left">选择地址：</span><input type="text" id="street" placeholder="点击选择详细地址"  v-model="street" readonly="readonly"   @focus="focus" @blur="blur" @click="selStreet" /><span class='msg' v-text="streetMag" ></span>

            </li>
            <li>
              <span class="left">店铺地址：</span><input type="text" id="shopAddress" v-model="address"  placeholder="请输入店铺地址" @focus="focus" @blur="blur"/>
            </li>
            <li>
              <span class="left">选择站点：</span><input type="text" name="sel_websit" id="sel_websit" :value="websiteDate.name" data="" readonly="readonly"  @focus="focus" @blur="blur" />
            </li>
            <li>
              <span class="left">推荐人ID：</span><input type="text" name="recommend_id" id="recommend_id" v-model="recommendId" placeholder="请输入推荐人ID" data="" value=""  @focus="focus" @blur="blur"/><span class="float_right padding_right24"  ><img src="../../assets/img/wenhao.png" @click="agreement(1)"/></span>
            </li>
            <li>
              <span class="left">推荐人：</span><input type="text" name="recommend_name" id="recommend_name" v-model="recommendName" placeholder="请输入推荐人店铺名称" data="" value=""  @focus="focus" @blur="blur"/>
            </li>
            <li class="apply_service_txt">
              <p>特别说明：</p>
              <textarea name="" id="shopText"  v-model=" description" placeholder="在这里输入您想说的话" @focus="focus" @blur="blur"></textarea>
            </li>
          </ul>
          <dl class="apply_suc" v-show="isMainHidden">
            <dt>您的申请提交成功</dt>
            <dd>
              <p>稍后业务经理为您服务</p>
              <p>服务热线：400-0169-682</p>
              <a :href="'tel:'+ system.feedback_method">立即呼叫</a>
            </dd>
          </dl>
        </div>
				<button class="submit_btn" v-show='!isMainHidden'  @click="submitBtn">提交申请</button>
			</div>
			<div class="login_bottom"  v-show='!isMainHidden'  >
				说明：登陆/申请服务说明您已同意<a href="javascritp:void(0)" @click="agreement(0)" >《果速送合作协议》</a>
			</div>
			<agreementAlert :noticeInfoList="noticeInfoList" v-if="noticeInfoList"  v-on:listenClose = "closeAlert"> </agreementAlert>
      <vuePickers
        v-if="cityData"
        :show="isShow"
        :columns="columns"
        :selectData="cityData"
        :defaultData="defaultData"
        @cancel="close"
        @confirm="confirmFn"
      >
      </vuePickers>
      <div class="myBg" v-show="isShow"></div>
  </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import agreementAlert from  "../../components/public/alert.vue";
import { getSystem , getMessage , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
import vuePickers from '../../components/public/picker.vue';
  export default {
    name:'register',
    components:{
        appHeader,
        agreementAlert,
        vuePickers
    },
    data() {
        return {
          headerMsg:{
            type:"common",
            title:'申请服务',
            left:'返回'
          },
          firmName:null, //店铺名称
          linkMan :null,  //联系人
          address:null,  // 店铺地址
          shopPhone:null, //联系电话验证
          phoneMsg:null, //注册提示文本
          city:null,   //选择城市
          cities:null,
          street:null, //街道
          road:null,   //详细地址
          province:null,
          county:null,
          streetMag:null,
          description:null, //描述
          recommendId:null,  //推荐人ID
          recommendName:null, //店铺名称
          isMainHidden:false,  //注册提交按钮
          phoneNumberReg:/^(1)\d{10}$/, //判断手机号的正则表达式
          isBottomHidden:false,  //  协议是否显示
          msgArr:["请输入验证码！","请输入密码！","请输入手机号码！","请输入正确的手机号！"],
          noticeInfoList:null,
          descCode:null,
          cityData:{},
          isShow:false,
          columns:null,
          defaultData:[],
          system:{},
          cache:{},
          countyId:null,
          cityCache:{},
          streetCache:{}
        }
    },
    watch:{
      shopPhone:function(val){
        var n = val.replace(/\D/g,"");
        if (n == 0) {
          this.shopPhone='';
        }else{
          this.shopPhone=n;
        }
        if(this. shopPhone.length == 0){
          this.phoneMsg  = null;
        }else{
          if( this.shopPhone.length == 11){
            if(!this.phoneNumberReg.test(n)){
              this.phoneMsg = "请输入正确的手机号！"
            }else{
              this.phoneMsg  = null;
            }
          }else{
            this.phoneMsg= "请输入完整的手机号！"

          }
        }
      }
    },
    mounted:function(){
      this.system = JSON.parse(localStorage.getItem('system'))
    },
    methods:{
      desc_data:function(){
          this.$ajax.get(this.HOST, {
            params:{
              method:'gss_desc',
              websiteNode:this.websiteDate.code,
              code:this.websiteDate.code + this.descCode
            }
          }).then(resp => {
            if(resp.data.statusCode == "100000"){
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
      cityApi:function(){
          this.$ajax.get(this.HOST, {
            params:{
              method:'get_pcc',
              websiteNode:this.websiteDate.code,
            }
          }).then(resp => {
            if(resp.data.statusCode == "100000"){
              let data = resp.data.data
              this.cityData.data1.push({'text':data[0].name,'value':data[0].code})
              let data1 = data[0].cities;
              this.cityData.data2.push({'text':data1[0].name,'value':data1[0].code})
              let data2 = data1[0].cities;
              for(let i = 0 ; i < data2.length; i++){
                  this.cityData.data3.push({'text':data2[i].name,'value':data2[i].code})
              }
              let key = JSON.stringify(this.websiteDate.code);
              let value =JSON.stringify( this.cityData)
              let obj = `{${ key}:${value}}`
              this.cityCache = Object.assign(this.cityCache , JSON.parse(obj))
            }
          }).catch(err => {
          });
      },
      streetApi:function(){
        this.$ajax.get(this.HOST, {
          params:{
            method:'get_street',
            code:this.countyId
          }
        }).then(resp => {
          if(resp.data.statusCode == "100000"){
            let data = resp.data.data;
            if(data.length){
              for(let i = 0 ; i < data.length; i++){
                this.cityData.data1.push({'text':data[i].name,'value':data[i].code})
              }
            }else{
              this.cityData.data1= [{'text':'','value':''}]
            }
            console.log(this.cityData)
            let key  = JSON.stringify(this.countyId);
            let value = JSON.stringify(this.cityData.data1);
            let obj = `{${key} : ${value}}` ;
            this.streetCache = Object.assign(this.streetCache , JSON.parse(obj))
          }
        }).catch(err => {
        });
      },
      rgister:function(){
        this.$ajax.get(this.HOST, {
          params:{
            method:'firm_register',
            firmName:this.firmName,
            address:this.address,
            linkTel:this.shopPhone,
            linkMan:this.linkMan,
            description:this.description,
            websiteNode:this.websiteDate.code,
            province:this.province,
            city:this.city,
            county:this.county,
            street:this.street,
            road:this.road,
            referrerId:this.recommendId,
            referrer:this.recommendName
          }
        }).then(resp => {
          if(resp.data.statusCode == "100000"){
            this.isMainHidden = true;
            isBottomHidden = true;
            this.$toast({
              message : resp.data.statusStr,
              position: 'boottom',
              duration: 2000,
              })
          }else{
            this.$toast({
              message : resp.data.statusStr,
              position: 'boottom',
              duration: 2000,
              })
          }
        }).catch(err => {
        });
      },
      focus:function(){
        this.isBottomHidden = true;
      },
      blur:function(){
        this.isBottomHidden = false;
      },
      agreement:function(num){
        if(num == 0){
          this.descCode = "#HZ-DESC";
        }else{
          this.descCode = "#TJR-DESC";
        }
        if (this.cache[this.websiteDate.code+this.descCode]) {
          this.noticeInfoList = this.cache[this.websiteDate.code+this.descCode]
        }else{
          this.desc_data()
        }
      },
      closeAlert:function(){
        this.noticeInfoList = null;
      },
      selCity:function(){
        this.cityData = {
          data1:[],
          data2:[],
          data3:[],
        }
        this.isShow = true;
        this.columns = 3
        if(this.cityCache[this.websiteDate.code]){
          this.defaultData =  this.cityCache[this.websiteDate.code].data1
          this.cityData = this.cityCache[this.websiteDate.code]
        }else{
          this.cityApi()
        }
      },
      selStreet:function(){
        this.cityData ={
          data1: []
        },
        this.columns = 1
        if(this.streetCache[this.countyId]){
          this.isShow = true;
          this.cityData.data1 = this.streetCache[this.countyId]
          console.log(this.cityData)
        }else{
          if(this.city){
            this.isShow = true;
            this.streetMag = null;
            this.streetApi()
          }else{
            this.streetMag = "请先选择城市!!";
          }
        }
      },
      submitBtn:function(){
        if(this.firmName == null){
            this.$toast({
              message :'请输入店铺名字' ,
              position: 'center',
              duration: 2000,
            })
        } else if (this.address == null) {
            this.$toast({
              message :'请输入地址' ,
              position: 'center',
              duration: 2000,
            })
        } else if (this.shopPhone == null) {
            this.$toast({
              message :'请输入电话' ,
              position: 'center',
              duration: 2000,
            })
        } else if (this.linkMan == null) {
            this.$toast({
              message :'请输入联系人' ,
              position: 'center',
              duration: 2000,
            })
        } else{
            this.rgister()
        }
      },
      close(){
        this.isShow = false;
      },
      confirmFn(val){
        this.isShow = false;
        let a = [],
            b = [];
        for( var key in val){
          a.push(val[key].text)
          b.push(val[key].value)
        }
        if( this.columns == 3){
          this.city =  a.join(',')
          this.countyId = b[2];
          this.province = b[0];
          this.county = a[2];
          this.defaultData= []
        }else{
          this.street = a[0]
        }
      }
    }
  }
</script>

<style scoped>

.main {
  width: 100%;
  height: auto;
}
.register{
  max-width: 750px;
}
.main-wrap {
  width: 100%;
  margin-top: 107px;
  background: #ebeaea;
}
.apply_service_main {
  width: 100%;
  padding-left: 20px;
  margin-top: 20px;
  background: #FFFFFF;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
}
.apply_service_main li {
  margin-right: 24px;
  height: 78px;
  line-height: 78px;
  font-size: 24px;
}
.apply_service_main li .left {
  width: 120px;
  text-align: justify;
}
.apply_service_main input {
  border: none;
  outline: none;
  background: none;
  color: #333333;
  width: 46%;
  line-height: 30px;
}
.apply_suc dt {
  height: 80px;
  text-align: center;
  line-height: 80px;
  color: rgb(243,124,48);
  background: #efefef;
  font-size: 32px;
}
.apply_suc dd {
  padding-top: 40px;
}
.apply_suc {
  width: 100%;
  height: 400px;
  background: #FFF;
  margin-top: 20px;
}
.apply_suc dd p {
  line-height: 36px;
  font-size: 24px;
  text-align: center;
}
.apply_suc dd a {
  display: block;
  margin: 0 auto;
  height: 46px;
  border-radius: 23px;
  width: 140px;
  padding: 0 20px;
  color: #FFF;
  background: rgb(243,124,48);
  line-height: 46px;
  text-align: center;
  font-size: 24px;
  margin-top: 40px;
}
.submit_btn {
  width: 60%;
  height: 80px;
  margin: 40px 20%;
  border-radius: 40px;
  text-align: center;
  line-height: 80px;
  color: #FFFFFF;
  background: #f37c30;
  font-size: 36px;
  outline: none;
}
.login_bottom {
  width: 100%;
  height: 60px;
  text-align: center;
  position: absolute;
  font-size: 20px;
  bottom:0;
  left:0;
  right:0;
  margin: auto;
}
.my_bg {
  width: 100%;
  height: 100%;
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.3;
  z-index: 6;
  filter: Alpha(opacity=30);
  overflow: hidden;
}
.apply_service_txt textarea {
  width: 100%;
  height: 140px;
  line-height: 30px;
  outline: none;
}
.apply_service_main .apply_service_txt {
  border: none;
  height: 220px;
}
.login_bottom a {
  color: #666;
}
.apply_service_main .msg {
  color: red;
  display:inline-block;
}
.myBg{
  width:100%;
  height:100%;
  background-color: #000;
  position: fixed;
  top:0;
  left:0;
  opacity: 0.3;
  filter: Alpha(opacity=30);
  z-index:6;
  overflow: hidden;
}
</style>
