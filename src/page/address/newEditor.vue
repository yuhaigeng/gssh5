<template>
     <div>
         <addressHeader :type="headerMsg"></addressHeader>
            <div class="main-wrap address_edit_box">
                <div class="edit_box">
                    <ul class="edit_main">
                        <li>
                            <label>联系人：</label><input type="text" :value="!this.$route.query.isNew ? addressData[index].receiverName :''" id="edit_name" placeholder="请输入收货人姓名" >
                        </li>
                        <li>
                            <label>联系电话：</label><input type="text"   maxlength="11" :value="!this.$route.query.isNew ? addressData[index].receiverMobile:''" id="edit_phone" placeholder="请输入联系电话"   >
                        </li>
                        <li class="clearfloat">
                            <label>选择省市：</label><input type="text" id="province" :value="!this.$route.query.isNew ? addressData[index].countyAddr:''" placeholder="点击选择省市" readonly="readonly" />
                                <input type="hidden" id="value1" value="" />
                        </li>
                        <li>
                            <label>详细地址：</label><input type="text" :value="!this.$route.query.isNew ? addressData[index].address :''"  id="edit_county" placeholder="请输入街道地址(无需输入城区)" >
                        </li>
                    </ul>
                    <div class="address_del" v-show="!this.$route.query.isNew" style="width: 80%;height: 80px;background: #F37C31;color: #FFFFFF;text-align: center;margin: 40px auto;line-height: 80px;border-radius: 10px;font-size: 30px;">
                        地址删除
                    </div>
                </div>
            </div>
     </div>
</template>

<script>
import  addressHeader from "../../components/public/header.vue";
    export default {
        name:'newEditor',
        components:{
            addressHeader
        },
        data() {
            return {
                 headerMsg:{
                    type:"common2",
                    title:'地址管理',
                     routerPath:'/address',
                    right:'确定',
                    left:'返回'
                },
                addressData:JSON.parse(sessionStorage.getItem("addresses")),
                index: this.$route.query.index
            }
        },
        mounted:function(){
        
        },
       
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

</style>
