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
                <span class="left">选择省市：</span><input type="text" id="province" placeholder="点击选择省市"  v-model="city" readonly="readonly" @focus="focus" @blur="blur" @click="selCity" @input = "cityValue" />
                    <input type="hidden" id="value1"  />
              </li>
              <li>
                <span class="left">选择地址：</span><input type="text" id="street" placeholder="点击选择详细地址"  readonly="readonly" @focus="focus" @blur="blur" @click="selStreet" @input = "streetValue"/><span class='msg' v-text="streetMag" ></span>
                    <input type="hidden" id="value2" value="" />
              </li>
              <li>
                <span class="left">店铺地址：</span><input type="text" id="shopAddress" v-model="address"  placeholder="请输入店铺地址" @focus="focus" @blur="blur"/>
              </li>
              <li>
                <span class="left">选择站点：</span><input type="text" name="sel_websit" id="sel_websit" :value="websitData[websiteNode]" data="" readonly="readonly"  @focus="focus" @blur="blur" />
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

            <dl class="apply_suc" :class="isMainHidden ? '' :'hidden'">
              <dt>您的申请提交成功</dt>
              <dd>
                <p>稍后业务经理为您服务</p>
                <p>服务热线：400-0169-682</p>
                <a :herf=" !isMainHidden &&'tel:400-800-9696'" class="">立即呼叫</a>
              </dd>
            </dl>
          </div>
				<button class="submit_btn" :class="{'hidden':isMainHidden}"  @click="submitBtn">提交申请</button>
			</div>
			<div class="login_bottom" :class="{'hidden':isBottomHidden}"  >
				说明：登陆/申请服务说明您已同意<a href="javascritp:void(0)" @click="agreement(0)" >《果速送合作协议》</a>
			</div>
			<agreementAlert :noticeInfoList="noticeInfoList" v-if="noticeInfoList"  v-on:listenClose = "closeAlert"> </agreementAlert>
      <div class="myBg"></div>
  </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import agreementAlert from  "../../components/public/alert.vue";
import { getSystem , getMessage , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
import {LArea} from '../../common/LArea.js' ;
import {LArea1} from '../../common/LArea1.js';
import '@/common/LArea.css'
    export default {
        name:'register',
        components:{
            appHeader,
            agreementAlert

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
                websitData:{
                    "3201":"南京站",
                    "3301":"杭州站",
                    '3302':'宁波站'
                },
                websiteNode:this.websiteDate.code,
                noticeInfoList:null,
                descCode:null,
                area2:new LArea1(),
                streetData :{},


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
                },
         },
         mounted:function(){
             this.cityApi()
         },
         methods:{
            desc_data:function(){
                 this.$ajax.get(this.HOST, {
                    params:{
                        method:'gss_desc',
                        websiteNode:this.websiteNode,
                        code:this.websiteNode + this.descCode
                    }
                }).then(resp => {
                      resp.data.data.noticeContent =  (resp.data.data.desc.toString()).replace(/\r\n/g, '<br/>');
                      resp.data.data.noticeTitle =  resp.data.data.title;
                      resp.data.data.alertType = 1;
                      this.noticeInfoList = resp.data.data;
                      console.log(this.noticeInfoList)
                }).catch(err => {
                    console.log('请求失败：'+ err.data.statusCode);
                });
            },
            cityApi:function(){
                this.$ajax.get(this.HOST, {
                    params:{
                       method:'get_pcc',
                       websiteNode:this.websiteNode,
                    }
                }).then(resp => {
                    //   console.log(resp.data.data)
                      this.newLArea(resp.data.data)
                }).catch(err => {
                    console.log('请求失败：'+ err.data.statusCode);
                });
            },
            streetApi:function(code){
                this.$ajax.get(this.HOST, {
                    params:{
                       method:'get_street',
				               code:code
                    }
                }).then(resp => {
                     this.streetData  = resp.data.data
                     this.streetInit()
                }).catch(err => {
                    console.log('请求失败');
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
                        websiteNode:this.websiteNode,
                        province:this.province,
                        city:this.city,
                        county:this.county,
                        street:this.street,
                        road:this.road,
                        referrerId:this.recommendId,
                        referrer:this.recommendName
                    }
                }).then(resp => {
                    this.isMainHidden = true;
                    isBottomHidden = true;
                }).catch(err => {
                    console.log('请求失败');
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
                    this.desc_data()
                }else{
                    this.descCode = "#TJR-DESC";
                    this.desc_data()
                }
            },
             closeAlert:function(){
                this.noticeInfoList = null;
            },
            selCity:function(){
                document.getElementsByClassName("myBg")[0].style.visibility="visible";//隐藏遮罩
            },

            selStreet:function(){
              const v = document.getElementById("value1").value
                var code = v.split(",");
                if(v){
                    this.streetMag = null;
                     document.getElementsByClassName("myBg")[0].style.visibility="visible";//隐藏遮罩
                }else{

                     this.streetMag = "请先选择城市!!";

                }
            },
            newLArea:function(LAreaData){
                var area1 = new LArea();
                area1.init({
                    'trigger': '#province', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
                    'valueTo': '#value1', //选择完毕后id属性输出到该位置
                    'keys': {
                        id: 'code',
                        name: 'name'
                    }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
                    'type': 1, //数据源类型
                    'data': LAreaData, //数据源
                });
                area1.value=[0,0,0];//控制初始位置，注意：该方法并不会影响到input的value
            },
            streetInit:function(){
                this.area2.init({
                    'trigger': '#street', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
                    'valueTo': '#value2', //选择完毕后id属性输出到该位置
                    'keys': {
                        id: 'code',
                        name: 'name'
                    }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
                    'type': 1, //数据源类型
                    'data': this.streetData //数据源
                });
                  console.log( this.streetData)
                this.area2.value=[0,0,0];//控制初始位置，注意：该方法并不会影响到input的value
            },
            cityValue:function(){
                const v = document.getElementById("value1").value
                const arr1 = v.split(",");
                this.province = arr1[0];
                this.cities = arr1[1];
                this.county = arr1[2];
                if (this.county != "") {
                  this.streetApi(this.county);
                }
            },
            streetValue:function(){
                const v = document.getElementById("value1").value
                var arr2 = v.split(",");
				        this.street = arr2[0];
                this.road = arr2[1];
            },
            submitBtn:function(){
                if(this.firmName == null){
                    this.$message({
                        message: '请输入店铺名字',
                        center: true,
                    });
                } else if (this.address == null) {
                            this.$message({
                                message: '请输入地址',
                                center: true,
                            });
                } else if (this.shopPhone == null) {
                  this.$message({
                                message: '请输入电话',
                                center: true,
                            });
                } else if (this.linkMan == null) {
                  this.$message({
                                message: '请输入联系人',
                                center: true,
                            });
                } else{
                  this.rgister()
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
    width: 50%;
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
.hidden {
    display: none;
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
    position: relative;
    font-size: 20px;
    top:80px;
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
}
.myBg{
    visibility: hidden;
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
