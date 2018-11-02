<template>
    <div class="login" >
        <app-header :type="headerMsg"></app-header>
        <div class="main-wrap login_main-wrap">
				<div class="main">
					<ul class="login_main_top">
						<li class="tab_bg_color" @click="login=0" :class="{'active':login===0 }" v-text="'动态短信登陆'"></li>
						<li class="tab_bg_color" @click="login=1" :class="{'active':login===1 }" v-text="'账号密码登陆'"></li>
					</ul>
					<div class="login_main_content">
						<ul v-cloak class="msg_login" v-show="login===0"> 
							<li class="sprite icon_phone">
								<input type="text" id="login_phoneNumber1" value="" maxlength="11" placeholder="请输入您的手机号码" v-model="message" autocomplete="on" @focus="focus" @blur="blur"/>
								<a id="get_verify_code" @click="get_verify_code"  :class="{'hidden':isHidden}" v-html = "isHidden ? '重新获取' : '获取验证码'"></a>
								<a id="time" :class="{'hidden':isTime}" v-html="!isTime && '60s后重试'" style="background: none; color: #F76A10;"></a>
							</li>
							<li class="sprite icon_key">
								<input type="text" id="verify_code" name="" placeholder="请输入收到的验证码" maxlength="6" :disabled="isTime" autocomplete="off"  v-model="code" @focus="focus" @blur="blur" />
							</li>
						</ul>
						<ul v-cloak class="count_login" v-show="login===1">
							<li class="sprite icon_phone">
								<input type="text" id="login_phoneNumber2" maxlength="11" value="" placeholder="请输入您的账号" autocomplete="on" v-model="account" @focus="focus" @blur="blur"/>
							</li>
							<li class="sprite icon_password">
								<input type="password" id="login_password" name="" placeholder="请输入您的密码" autocomplete="off" v-model="passWord" @focus="focus" @blur="blur" />
							</li>
						</ul>
						<div class="tips" v-show="tipsMsg" v-text="tipsMsg"></div>
					</div>
				</div>
				<button class="login_btn" :class="{'active':isActive}"  @click="login_btn" v-text="'登陆'"></button>
				<div class="login_bottom" :class="{'hidden':bottomIsHidden}">
					说明：登陆/申请服务说明您已同意<a href="javascritp:void(0)" @click="agreement">《果速送合作协议》</a>
				</div>
                <alertVue :noticeInfoList="noticeInfoList"> </alertVue>
			</div>
    </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import alertVue from '../../components/public/alert.vue';

    export default {
        name:'login',
        components:{
            appHeader,
            alertVue
        },
        data() {
            return {
            headerMsg:{
                type:"common1",
                title:'登录',
                jumpFront:"my",
                jumpAfter:'register',
                right:'申请服务',
                left:'返回'
            },
            login : 0,  //短信和账号之间切换
            tipsMsg:null, //提示文本
            message:null, // 短信方式
            account:null, // 账号方式
            passWord:null, // 密码
            code:null,     // 验证码
            isActive:false, //是否激活
            isHidden:false, //是否显示隐藏
            isTime:true, //验证码倒计时显示
            bottomIsHidden:false,  // 协议是否显示
            phoneNumberReg:/^(1)\d{10}$/, //判断手机号的正则表达式
            msgArr:["请输入验证码！","请输入密码！","请输入手机号码！","请输入正确的手机号！"],
            noticeInfoList:{
                    isShow:false,
                    noticeTitle: "【下单时间调整】",
                    noticeContent: "即日起杭州站下单时间为：下午14:00至晚间24:00"
                }
            }
        },
        watch:{
            login:function(val,oldval){
                if(val == 0){
                    if(this.message != null && this.code != null){
                            if( this.message.length == 11 && this.code.length == 6){
                            this.isActive = true;
                        }else{
                            this.isActive = false;
                        }
                    }else{
                        this.isActive = false;
                    }
                }else{
                    if(this.account != null && this.passWord !=null){
                            if(this.account.length == 11 && this.passWord.length >= 6){
                            this.isActive = true;
                        }else{
                            this.isActive = false;
                        }
                    }else{
                            this.isActive = false;
                        }
                }
            },
            message: function(val) {
                var n = val.replace(/\D/g,"");
                if (n == 0) {
                    this.message='';
                }else{
                    this.message=n;
                }
                if(this.message.length ==0){
                    this.tipsMsg  = null;
                    this.isActive = false;
                }else{
                    if( this.message.length == 11){
                        if(!this.phoneNumberReg.test(this.message)){
                                this.tipsMsg = "请输入正确的手机号！"
                        }else{
                            this.tipsMsg  = null;
                        }
                    }else{
                        this.tipsMsg = "请输入完整的手机号！"
                    }
                }
            },
            account:function(val){
                var n = val.replace(/\D/g,"");
                if (n == 0) {
                    this.account='';
                }else{
                    this.account=n;
                }
                if(this.account.length == 0){
                    this.tipsMsg  = null;
                    this.isActive = false;
                }else{ 
                    if( this.account.length == 11){
                        if(!this.phoneNumberReg.test(this.account)){
                                this.tipsMsg = "请输入正确的手机号！"
                        }else{
                            this.tipsMsg  = null;
                        }
                    }else{
                        this.tipsMsg = "请输入完整的手机号！"
                        
                    }
                }
            },
            passWord:function(){
                if(this.account.length == 11 && this.passWord.length >= 6 ){
                    this.isActive = true;
                }else{
                    this.isActive = false
                }
            },
            code:function(val){
                var n = val.replace(/\D/g,"");
                this.code = n;
                if( this.message.length == 11 && this.code.length == 6 ){
                    this.isActive = true;
                }else{
                    this.isActive = false
                }
            },
        },
        methods:{
            login_btn:function(e){
                var target = event.target;
                var isActive =target.classList.contains("active")
		   		 if (isActive) {
                           // pub.login.login();
                           console.log("登录")
		   		}
            },
            get_verify_code:function(){
				if(  this.message == '') {
					alert(this.msgArr[2])
				} else if (!this.phoneNumberReg.test(this.message)) {
                    alert(this.msgArr[3])
				}else{
                    console.log("倒计时")
					// pub.i = 59;
					// pub.login.getCode();
				}
            },
            focus:function(){
				this.bottomIsHidden = true;
			},
			blur:function(){
				this.bottomIsHidden = false;
            },
            agreement:function(){
                this.noticeInfoList.isShow = true;
                console.log(1)
            }
        }
         
    }
</script>

<style scoped>
.login{
    max-width: 750px; 
}
.main-wrap {
    width: 100%;
    margin-top: 107px;
    background: #ebeaea;
}
.login_main_top {
    width: 100%;
    height: 78px;
    margin-top: 20px;
    background: #ebeaea;
    line-height: 78px;
    border-top: 1px solid #d8d8d8;
    font-size: 24px;
    text-align: center;
}
.login_main_top .active {
    background: #FFFFFF;
    color: #000000;
}
.login_main_top li {
    float: left;
    width: 50%;
}
.tab_bg_color {
    background: #ebeaea;
    color: #666666;
}
.login_main_content {
    width: 100%;
    height: 156px;
    line-height: 78px;
    font-size: 24px;
    background: #FFFFFF;
    position: relative;
}
.login_main_content li {
    width: 100%;
    height: 78px;
    border-top: 1px solid #d8d8d8;
    padding: 0 20px;
}
.login_main_content input {
    border: none;
    outline: none;
    background: none;
    text-indent: 40px;
    color: #333333;
    height: 60px;
    width: 90%;
    line-height: 30px;
}
.icon_phone {
    background-position: -1084px -265px;
}
.icon_key {
    background-position: -1084px -134px;
}
.icon_password {
    background-position: -1084px -196px;
}
.sprite {
    background-image: url(../../assets/img/sprite.png);
    background-repeat: no-repeat;
}
.login_main_content .tips {
    background-color: #fff;
    color: red;
}
.msg_login li:nth-child(1) a {
    width: 200px;
    height: 50px;
    background: #f37c30;
    position: absolute;
    text-align: center;
    line-height: 50px;
    color: #FFFFFF;
    border-radius: 25px;
    right: 20px;
    top: 14px;
}
.login_btn {
    width: 80%;
    height: 80px;
   margin-top: 120px;
    margin-left: 10%;
    border-radius: 30px;
    text-align: center;
    line-height: 80px;
    color: #FFFFFF;
    background: #f37c30;
    font-size: 36px;
    outline: none;
}
.login_btn {
    background-color: #999;
}
.login_bottom {
    max-width:750px;
    height: 60px;
    text-align: center;
    position: relative;
    font-size: 20px;
    bottom: -730px;
}
.login_bottom a {
    color: #666;
}
.login_btn.active {
    background-color: #f37c30;
}
.hidden {
    display: none;
}
</style>
