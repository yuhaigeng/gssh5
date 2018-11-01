<template>
     <div>
       <setHeader :type="headerMsg"></setHeader>
         <div class="main-wrap business_main_wrap">
	    	<ul class="content1">
		        <li>
		            <div><label>名称：</label><input type="text" :value="personInfo.firmName" id="business_shop_name" ></div>
		            <div><label>ID：</label><input type='text' :value="'NO'+personInfo.id" id="business_shop_id" disabled="disabled"></div>
		        </li>
		        <li>
		            <div class="jifen_jifen"><label>总成长值：</label><input type='text' :value='personInfo.exp' id="business_shop_score" disabled="disabled"></div>
		            <div class="dengji"><label>会员等级：</label><input type='text' :value='personInfo.userGrade' id="business_shop_grade" disabled="disabled"></div>
		        </li>
		    </ul>
		    <ul class="content2">
		        <li><label>地址：</label><input type='text' id="business_shop_address" :value='personInfo.address'></li>
		        <li><label>营业执照：</label><input type='text' id="business_shop_card" :value='personInfo.saleCard'></li>
		        <li><label>联系电话：</label><input type='text' id="business_shop_tel" :value='personInfo.linkTel' disabled="disabled"></li>
		        <li><label>联系人：</label><input type='text' id="business_shop_man" :value='personInfo.linkMan'></li>
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
     </div>
</template>

<script>
import setHeader from "../../components/public/header.vue";
    export default {
        name:'company',
        components:{
           setHeader 
        },
         data() {
             return {
                headerMsg:{
                    type:"common2",
                    title:'企业信息',
                    right:'保存',
                    left:'返回'
                },
                 isMain:{"1":"主账号：","2":"副账号："},
			     status:{"1":"启用","2":"禁用"},
			     authStatus:{"0":'待认证',"-1":'未通过',"1":'已认证'},
                 personInfo:{
                    firmName: "掌烁测试-朱高飞",
                    id: "132",
                    exp: 81.5,
                    userGrade: "LV1",
                    address: "滨江区建业路510号华业大厦1306",
                    saleCard: "Xcf200833881",
                    linkTel: "18315318515",
                    linkMan: "朱高飞",
                    authStatus: 1,
                    cuserInfoList:[
                        {isMain: 1,mobile: "18315318516",status: 1},
                        {isMain: 2,mobile: "18315318515",status: 1},
                        {isMain: 2,mobile: "18315318515",status: 1},
                    ]
                 }
             }
         },
         mounted:function(){
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
