<template>
  <div >
    <div class="address" v-show="isManage">
      <addressHeader :type="headerMsg"></addressHeader>
      <div class="main-wrap address_box">
        <ul class="address_main">
          <li v-for="(item,index) in addresses" :key="index" @click="goBack(item)">
              <dl class="address_top clearfloat" >
                <dt :class="item.isDefault == 1 && 'icon_chosen'">
                </dt>
                <dd>
                  <div class="address_top_box clearfloat">
                      <div class="address_top_name" v-text="item.receiverName">
                      </div>
                      <div class="address_top_phone" v-text="item.receiverMobile">
                      </div>
                  </div>
                  <p v-text="item.allAddr"></p>
                </dd>
              </dl>
              <div class="address_bottom">
                <button class="address_bottom_left" v-text="item.isDefault == 1 ?'默认' :'设为默认'" :id="item.id" @click="setDefault(item.isDefault,item.id)"></button>
                <button class="address_bottom_right" @click="editor(item)">编辑</button>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import  addressHeader from "../../components/public/header.vue";
import { getSystem , getMessage , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
export default {
  name:'addressManagement',
  components:{
    addressHeader
  },
  data() {
    return {
      headerMsg:{
          type:"common",
          title:'地址管理',
          jumpAfter:'/newEditor',
          right:'新增地址',
          left:'返回'
      },
      firmId:  JSON.parse(getUserData()) ? JSON.parse(getUserData()).firmInfoid : "" ,
      userBasicParam:{
          source:'firmId'+ this.firmId,
          tokenId: getTokenId(),
          sign :this.$md5('firmId'+ this.firmId + "key" + getSecretKey()).toUpperCase()
      },
      addresses:null,
      addressId:null,
      isManage:true,
    }
  },
  mounted:function(){
    this.addressShow();
  },
  methods:{
    addressShow:function(){
      this.$ajax.get(this.HOST, {
          params:Object.assign({
              method:'user_address_show',
              firmId:this.firmId,
          },this. userBasicParam)
      }).then(resp => {
          this.addresses = resp.data.data
          sessionStorage.setItem('addresses',JSON.stringify(this.addresses))
      }).catch(err => {
      });
    },
    default_data:function(){
      this.$ajax.get(this.HOST, {
          params:Object.assign({
              method:'user_address_default',
              firmId:this.firmId,
              addressId:this.addressId,
          },this.userBasicParam)
      }).then(resp => {
          this.addresses = resp.data.data
          sessionStorage.setItem('addresses',JSON.stringify(this.addresses))
          this.addressShow()
      }).catch(err => {
      });
    },
    editor:function(item){
      this.$router.push({path:this.headerMsg.jumpAfter, query:{isEdit:true}})
      sessionStorage.setItem('editorAddress',JSON.stringify(item));
    },
    setDefault:function(ele,id){
            if(ele != 1){
                  this.addressId = id;
                  this.default_data();
            }
    },
    goBack:function(item){
        if(this.$route.query.isBack){
            sessionStorage.setItem('data',JSON.stringify(item))
              this.$router.go(-1)
        }
    }
  }
}
</script>

<style scoped>
.main-wrap{
  margin-top:107px;
}
.address_main li {
  width: 100%;
  margin-top: 20px;
  padding: 0 24px;
  background: #FFF;
  border-bottom: 1px solid #666;
}
.address_top {
  width: 100%;
  border-bottom: 1px solid #999;
}
.address_top dt {
  width: 92px;
  padding: 20px 16px;
  height: 100px;
}
.address_top dd, .address_top dt, .order_pay_mode_box .order_pay_mode_right {
  float: right;
}
.icon_chosen {
  background-image:  url(../../assets/img/sprite_login.png);
  background-position: 20px -489px;
  background-repeat: no-repeat;
}
.address_top dd {
  width: 610px;
}
.address_top_box {
  height: 58px;
  line-height: 58px;
  font-size: 26px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.address_top dd p {
  width: 100%;
  padding-right: 20px;
  font-size: 26px;
  line-height: 40px;
  margin-bottom: 6px;
}
.address_bottom {
  font-size: 24px;
  color: #F76A10;
}
.address_bottom, .edit_main li {
  width: 100%;
  height: 80px;
  line-height: 80px;
}
.address_bottom_left {
  float: left;
}
.address_bottom_right {
  float: right;
}
.address_top_box div {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}
.address_top_phone, .login_top_right {
  text-align: right;
}

</style>
