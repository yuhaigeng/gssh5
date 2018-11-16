<template>
  <div class="common-wrap">
    <addressHeader :type="headerMsg">
      <div class="header_right login_top_right" slot="sure" v-text="'确定'" @click="submit"></div>
    </addressHeader>
    <div class="main-wrap address_edit_box">
        <div class="edit_box">
            <ul class="edit_main">
                <li>
                    <label>联系人：</label><input type="text" v-model="person" id="edit_name" placeholder="请输入收货人姓名" >
                </li>
                <li>
                    <label>联系电话：</label><input type="text"   maxlength="11" v-model="phone" id="edit_phone" class="edit_phone" placeholder="请输入联系电话"   ><span class="msg" v-text="tipsMsg"></span>
                </li>
                <li class="clearfloat">
                    <label>选择省市：</label><input type="text" id="province"  v-model="city" placeholder="点击选择省市" readonly="readonly" @click="selCity" @input = "cityValue"/>
                        <input type="hidden" id="value1" value="" />
                </li>
                <li>
                    <label>详细地址：</label><input type="text"   id="edit_county" v-model="street" placeholder="请输入街道地址(无需输入城区)" >
                </li>
            </ul>
            <div class="address_del" v-show="this.$route.query.isEdit" @click="del"  >
                地址删除
            </div>
        </div>
    </div>
    <div class="myBg"></div>
  </div>
</template>

<script>
import  addressHeader from "../../components/public/header.vue";
import { getSystem , getMessage , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
import {layer} from '../../common/layer.js'; //注意路径
import {LArea} from '../../common/LArea.js' ;
import {LArea1} from '../../common/LArea1.js';
import '@/common/LArea.css';
import '@/common/layer.css'
export default {
  name:'newEditor',
  components:{
      addressHeader
  },
  data() {
    return {
      headerMsg:{
        type:"common",
        title:'地址管理',
        right:'确定',
        left:'返回'
      },
      websiteNode:'3301',
      addressData:JSON.parse(sessionStorage.getItem("editorAddress")),
      phone:null,
      person:null,
      city:null,
      street:null,
      phoneNumberReg:/^(1)\d{10}$/, //判断手机号的正则表达式,
      tipsMsg:null, //提示文本
      countyId:null,
      firmId:  JSON.parse(getUserData()) ? JSON.parse(getUserData()).firmInfoid : "" ,
      userBasicParam:{
          source:'firmId'+ this.firmId,
          tokenId: getTokenId(),
          sign :this.$md5('firmId'+ this.firmId + "key" + getSecretKey()).toUpperCase()
      },
      addressId:null
    }
  },
  watch:{
    phone:function(val){
      var n = val.replace(/\D/g,"");
        if (n == 0) {
          this.phone ='';
      }else{
          this.phone =n;
      }
        if(this.phone.length ==0){
          this.tipsMsg  = null;
      }else{
          if(this.phone.length == 11){
              if(!this.phoneNumberReg.test(this.phone)){
                      this.tipsMsg = "请输入正确的手机号！"
              }else{
                  this.tipsMsg  = null;
              }
          }else{
              this.tipsMsg = "请输入完整的手机号！"
          }
      }
    }
  },
  mounted:function(){
    this.cityApi()
    if( this.$route.query.isEdit ){
        this.phone = this.addressData.receiverMobile
        this.person = this.addressData.receiverName
        this.city = this.addressData.countyAddr
        this.street =  this.addressData.address
        this.addressId = this.addressData.id
        this.countyId=  this.addressData.countyId
    }
  },
  methods:{
    update:function(){
        this.$ajax.get(this.HOST, {
          params:Object.assign({
            method:'user_address_update',
            firmId:this.firmId,
            addressId:this.addressId,
            receiverName:this.person,
            receiverMobile:this.phone,
            countyId:this.countyId,
            address:this.street,
          },this.userBasicParam)
        }).then(resp => {

        }).catch(err => {

        });
    },
    cityApi:function(){
        this.$ajax.get(this.HOST, {
          params:{
              method:'get_pcc',
              websiteNode:this.websiteNode,
          }
        }).then(resp => {
          this.newLArea(resp.data.data)
        }).catch(err => {

        });
    },
    delApi:function(){
        this.$ajax.get(this.HOST, {
          params:Object.assign({
            method:'user_address_del',
            addressId:this.addressId,
          },this.userBasicParam)
        }).then(resp => {

        }).catch(err => {

        });
    },
    // 删除地址
    del:function(){
      this.$messagebox.confirm('您确定要删除地址吗？','').then(action => {
            this.delApi();
            this.$router.go(-1)
        }).catch((e) => {
            console.log(e)
        });
    },
    selCity:function(){
      document.getElementsByClassName("myBg")[0].style.visibility="visible";//隐藏遮罩
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
    cityValue:function(){
      const v = document.getElementById("value1").value;
      if(v){
        const a  = v.split(",");
          this.countyId = a[2]
      }
    },
    submit:function(){
      if( this.person == ""){
                alert ("person !!!")
      }else if (this.phone == ""){
                alert ("phone !!!")
      }else if(this.city == ""){
                alert ("city !!!")
      }else if(this.street == ""){
                alert ("street !!!")
      }else{
          this.update()
          this.$router.go(-1)
      }
    }
  }

}
</script>

<style scoped>
.main-wrap{
  margin-top: 107px;
}
.edit_main li label {
  color: #000;
}
.edit_main {
  max-width: 750px;
  margin: 20px auto 0;
  width: 100%;
  background: #FFF;
  font-size: 28px;
  color: #b6b6b6;
  border-bottom: 1px solid #d8d8d8;
  border-top: 1px solid #d8d8d8;
}
.edit_main li {
  width: 100%;
  height: 80px;
  line-height: 80px;
  padding: 0 24px;
  border-bottom: .5px solid #d8d8d8;
}
.edit_main input {
  width: 560px;
  height: 77px;
  line-height: 77px;
}
.edit_main .edit_phone{
  width:280px;
}
.msg{
  color:red;
}
.address_del{
  width: 80%;
  height: 80px;
  background: #F37C31;
  color: #FFFFFF;
  text-align: center;
  margin: 40px auto;
  line-height: 80px;
  border-radius: 10px;
  font-size: 30px;
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
