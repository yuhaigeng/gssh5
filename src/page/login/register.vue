<template>
     <div class="register">
        <app-header :type = "headerMsg"></app-header>
        <div class="main-wrap login_main-wrap">
				<div class="main">
					<ul class="apply_service_main" :class="{'hidden':mainHidden}">
						<li>
							<span class="left">店铺名称：</span><input type="text" id="shopName" placeholder="请输入店铺名称" @focus="focus" @blur="blur" />
						</li>
						<li>
							<span class="left">联系电话：</span><input type="text" id="shopPhone" v-model="shopPhone" maxlength="11" placeholder="请输入联系电话" @focus="focus" @blur="blur"/><span class="msg" v-text="phoneMsg"></span>
						</li>
						<li>
							<span class="left">联系人：</span><input type="text" id="shopPeople"  placeholder="请输入联系人" @focus="focus" @blur="blur" />
						</li>
						<li>
							<span class="left">选择省市：</span><input type="text" id="province" placeholder="点击选择省市"  v-model="city" readonly="readonly" @focus="focus" @blur="blur"  />
									<input type="hidden" id="value1" value="" />
						</li>
						<li>
							<span class="left">选择地址：</span><input type="text" id="street" placeholder="点击选择详细地址"  readonly="readonly" @focus="focus" @blur="blur"/><span class="msg" v-text="streetMsg"></span>
									<input type="hidden" id="value2" value="" />
						</li>
						<li>
							<span class="left">店铺地址：</span><input type="text" id="shopAddress"  placeholder="请输入店铺地址" @focus="focus" @blur="blur"/>
						</li>
						<li>
							<span class="left">选择站点：</span><input type="text" name="sel_websit" id="sel_websit" data="" value="" readonly="readonly"  @focus="focus" @blur="blur"/>
						</li>
						<li>
							<span class="left">推荐人ID：</span><input type="text" name="recommend_id" id="recommend_id" placeholder="请输入推荐人ID" data="" value=""  @focus="focus" @blur="blur"/><span class="float_right padding_right24"><img src="../../assets/img/wenhao.png"/></span><div style="clear: both;"></div>
						</li>
						<li>
							<span class="left">推荐人：</span><input type="text" name="recommend_name" id="recommend_name" placeholder="请输入推荐人店铺名称" data="" value=""  @focus="focus" @blur="blur"/>
						</li>
						<li class="apply_service_txt">
							<p>特别说明：</p>
							<textarea name="" id="shopText" placeholder="在这里输入您想说的话" @focus="focus" @blur="blur"></textarea>
						</li>
					</ul>
					
					<dl class="apply_suc" :class="mainHidden ? '' :'hidden'">
						<dt>您的申请提交成功</dt>
						<dd>
							<p>稍后业务经理为您服务</p>
							<p>服务热线：400-0169-682</p>
							<a :herf="mainHidden ?'tel:'+Hotline : 'tel:400-800-9696'" class="">立即呼叫</a>
						</dd>
					</dl>
				</div>
				<button class="submit_btn" :class="{'hidden':mainHidden}" >提交申请</button>
			</div>
			<div class="login_bottom" :class="{'hidden':bottomIsHidden}"> 
				说明：登陆/申请服务说明您已同意<a href="javascritp:void(0)" >《果速送合作协议》</a>
			</div>
			<div class="my_bg" style="visibility: hidden;"></div>
        </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";

    export default {
        name:'register',
        components:{
            appHeader
            
        },
         data() {
             return {
                headerMsg:{
                    type:"common1",
                    title:'申请服务',
                    jumpFront:"login",
                    jumpAfter:'',
                    right:'合作协议',
                    left:'返回'
                },
                shopPhone:null, //联系电话验证
                phoneMsg:null, //注册提示文本
                city:null,   //选择城市
                streetMsg:null, //街道提示文本
                mainHidden:false,  //注册提交按钮
                phoneNumberReg:/^(1)\d{10}$/, //判断手机号的正则表达式
                bottomIsHidden:false,  //  协议是否显示
                msgArr:["请输入验证码！","请输入密码！","请输入手机号码！","请输入正确的手机号！"]
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
         methods:{
            street:function(){
					console.log(this.city)
					if(this.city){
						this.streetMsg=null
						 document.getElementsByClassName("my_bg")[0].style.visibility="visible";
					}else{
						this.streetMsg ="请先选择省市！！"
						
					}
            },
            focus:function(){
				this.bottomIsHidden = true;
			},
			blur:function(){
				this.bottomIsHidden = false;
			},
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
    height: 78px;
    line-height: 78px;
    font-size: 24px;
    border-bottom: 1px solid #d8d8d8;
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
</style>
