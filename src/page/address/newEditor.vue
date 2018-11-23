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
            <label>选择省市：</label><input type="text" id="province"  v-model="city" placeholder="点击选择省市" readonly="readonly" @click="selCity" />
          </li>
          <li>
            <label>详细地址：</label><input type="text"   id="edit_county" v-model="street" placeholder="请输入街道地址(无需输入城区)" >
          </li>
        </ul>
        <div class="address_del" v-show="this.$route.query.isEdit " @click="del">地址删除</div>
      </div>
    </div>
    <vuePickers
      v-if="cityData"
      :show="isShow"
      :columns="columns"
      :selectData="cityData"
      @cancel="close"
      @confirm="confirmFn"
    >
    </vuePickers>
    <div class="myBg" v-show='isShow'></div>
  </div>
</template>

<script>
import  addressHeader from "../../components/public/header.vue";
import { getSystem , getMessage , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
import vuePickers from '../../components/public/picker.vue';
export default {
  name:'newEditor',
  components:{
    addressHeader,
    vuePickers
  },
  data() {
    return {
      headerMsg:{
        type:"common",
        title:'地址管理',
        right:'确定',
        left:'返回'
      },
      addressData:[],
      phone:null,
      person:null,
      city:null,
      street:null,
      phoneNumberReg:/^(1)\d{10}$/, //判断手机号的正则表达式,
      tipsMsg:null, //提示文本
      countyId:null,
      firmId: "" ,
      userBasicParam:{},
      addressId:null,
      cityData:{
        data1: [],
        data2: [],
        data3: []
      },
      isShow:false,
      columns:null,
      isNew:null // 修改， 新建弹框提示
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
    this.firmId = JSON.parse(getUserData()).firmInfoid
    this. userBasicParam={
      source:'firmId'+ JSON.parse(getUserData()).firmInfoid,
      tokenId: getTokenId(),
      sign :this.$md5('firmId'+ JSON.parse(getUserData()).firmInfoid + "key" + getSecretKey()).toUpperCase()
    }
    this.addressData = JSON.parse(sessionStorage.getItem("editorAddress"));
    this.columns = 3;
    this.isNew = this.$route.query.isEdit;
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
          if(resp.data.statusCode == "100000"){
            this.$toast({
              message : this.isNew ? '修改成功':'新建成功',
              position: 'center',
              duration: 2000,
            })
            this.$router.go(-1)
          }else{
            this.$toast({
              message : '请把地址填完整',
              position: 'center',
              duration: 2000,
            })
          }
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
          if(resp.data.statusCode == "100000"){
            let data = resp.data.data
            this.cityData.data1.push({'text':data[0].name,'value':data[0].code})
            let data1 = data[0].cities;
            this.cityData.data2.push({'text':data1[0].name,'value':data1[0].code})
            let data2 = data1[0].cities;
            for(let i = 0 ; i < data2.length; i++){
              this.cityData.data3.push({'text':data2[i].name,'value':data2[i].code})
            }
          }
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
          if(resp.data.statusCode == "100000"){
            this.$toast({
              message :'删除成功' ,
              position: 'center',
              duration: 2000,
            })
          }
        }).catch(err => {
        });
    },
    // 删除地址
    del:function(){
      this.$messagebox.confirm('您确定要删除地址吗？','').then(action => {
        this.delApi();
        this.$router.go(-1)
      }).catch((e) => {
      });
    },
    selCity:function(){
      this.isShow = true;
    },
    submit:function(){
      if( this.person === null){
        this.$toast({
          message :'请输入联系人号码' ,
          position: 'center',
          duration: 2000,
        })
      }else if (this.phone === null){
        this.$toast({
          message :'请输入手机号码' ,
          position: 'center',
          duration: 2000,
        })
      }else if(this.city === null){
        this.$toast({
          message :'请选择城市' ,
          position: 'center',
          duration: 2000,
        })
      }else if(this.street === null){
        this.$toast({
          message :'请输入详细地址' ,
          position: 'center',
          duration: 2000,
        })
      }else{
        this.update()
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
      this.city =  a.join(',')
      this.countyId = b[2]
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
