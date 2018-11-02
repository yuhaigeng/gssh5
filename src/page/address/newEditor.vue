<template>
     <div>
         <addressHeader :type="headerMsg"></addressHeader>
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
                            <label>选择省市：</label><input type="text" id="province"  v-model="city" placeholder="点击选择省市" readonly="readonly" @click="selCity"/>
                                <input type="hidden" id="value1" value="" />
                        </li>
                        <li>
                            <label>详细地址：</label><input type="text"   id="edit_county" v-model="street" placeholder="请输入街道地址(无需输入城区)" >
                        </li>
                    </ul>
                    <div class="address_del" v-show="!this.$route.query.isNew" @click="del"  >
                        地址删除
                    </div>
                </div>
            </div>
             <div class="myBg"></div>
     </div>
</template>

<script>
import  addressHeader from "../../components/public/header.vue";
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
                    type:"common2",
                    title:'地址管理',
                    routerPath:'/address',
                    right:'确定',
                    left:'返回' 
                },
                addressData:JSON.parse(sessionStorage.getItem("addresses")),
                index: this.$route.query.index,
                phone:null,
                person:null,
                city:null,
                street:null,
                phoneNumberReg:/^(1)\d{10}$/, //判断手机号的正则表达式,
                tipsMsg:null, //提示文本
                 dataCity:[
                    { 
                        cities:[ 
                            {
                            cities: [ {id: "330101", name: "市辖区", cityName: "杭州市", provinceName: "浙江省", code: "330101"}
                        ,{id: "330102", name: "上城区", cityName: "杭州市", provinceName: "浙江省", code: "330102"}
                        ,{id: "330103", name: "下城区", cityName: "杭州市", provinceName: "浙江省", code: "330103"}
                        ,{id: "330104", name: "江干区", cityName: "杭州市", provinceName: "浙江省", code: "330104"}
                        ,{id: "330105", name: "拱墅区", cityName: "杭州市", provinceName: "浙江省", code: "330105"}
                        ,{id: "330106", name: "西湖区", cityName: "杭州市", provinceName: "浙江省", code: "330106"}
                        ,{id: "330108", name: "滨江区", cityName: "杭州市", provinceName: "浙江省", code: "330108"}
                        ,{id: "330109", name: "萧山区", cityName: "杭州市", provinceName: "浙江省", code: "330109"}
                        ,{id: "330110", name: "余杭区", cityName: "杭州市", provinceName: "浙江省", code: "330110"}
                        ,{id: "330122", name: "桐庐县", cityName: "杭州市", provinceName: "浙江省", code: "330122"}
                        ,{id: "330127", name: "淳安县", cityName: "杭州市", provinceName: "浙江省", code: "330127"}
                        ,{id: "330182", name: "建德市", cityName: "杭州市", provinceName: "浙江省", code: "330182"}
                        ,{id: "330183", name: "富阳市", cityName: "杭州市", provinceName: "浙江省", code: "330183"}
                        ,{id: "330185", name: "临安市", cityName: "杭州市", provinceName: "浙江省", code: "330185"}
                        ], name: "杭州市",
                            provinceName: "浙江省"} ],
                        
                       name: "浙江省"}
                     
                ],
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
                if( !this.$route.query.isNew ){
                    [ this.phone ,this.person,this.city, this.street] = [ this.addressData[this.index].receiverMobile, this.addressData[this.index].receiverName ,this.addressData[this.index].countyAddr,this.addressData[this.index].address]
                }else{
                   [ this.phone ,this.person,this.city, this.street] = [""]
                }
                var areal = new LArea();
                areal.init({
                    'trigger': "#province",
                    'valueTo': "#value1",
                    'keys': {
                        id: "code",
                        name: "name"
                    },
                    'type': 1,
                    'data': this. dataCity
                }),
              areal.value = [0, 0, 0]
        },
        methods:{
            // 删除地址
            del:function(){
               layer.open({
				    content: '您确定要删除地址吗？',
				    btn: ['确定', '取消'],
				    yes: function(index){
						// pub.address.del();
						layer.close(index);
				    }
				});
            },
             selCity:function(){
                document.getElementsByClassName("myBg")[0].style.visibility="visible";//隐藏遮罩
            },
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
