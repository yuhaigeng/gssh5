<template>
   <div class="common-wrap" :class="{'vip':!isApp}">
        <app-header :type="headerMsg" :logined="logined" v-if="!isApp"  v-show="logined"></app-header>
        <div class="vip_main_top" >
            <div class="vip_main_growValue" v-if="userVipInfo && userVipInfo.monthExp">
                <div class="vip_growValue_top">
                    <span class="vip_growValue_tit">当月成长值</span><span class="vip_growValue_desc" v-text="'当月成长值为'+userVipInfo.firmMonthExp+'点,再积'+userVipInfo.needExp+'点可享受下个月VIP服务'"></span>
                </div>
                <div class="vip_growValue_progress">
                    <p class="growInfo_progressAll"></p>
                    <p class="growInfo_progressTrue" v-bind:style="{width: getWidth+'px'}"></p>
                </div>
                <div class="vip_growValue_progress_subscript clearfloat">
                    <span class="float_left" v-text='0'></span>
                    <span class="float_right" v-text='userVipInfo.firmMonthExp > userVipInfo.monthExp ? userVipInfo.firmMonthExp : userVipInfo.monthExp'></span>
                </div>
            </div>
            <div class="vip_main_growValue vip_grow_all" :class="{'active':userVipInfo.vip >0}" v-if="userVipInfo && userVipInfo.monthExp">
                <div class="vip_growValue_top">
                    <span class="vip_growValue_tit" ></span><span class="vip_activation" v-text="userVipInfo.vip > 0 ? '已激活' : '未激活'"></span> <span class="vip_growValue_desc" v-text="'累积成长值为'+userVipInfo.firmExp+'点，还差'+userVipInfo.upExp+'点到下一等级'" ></span>
                </div>
                <div class="vip_prowValue_grade_box clearfloat">
                    <div class="float_left" v-for = "(item,index) in vipGradeList" :key="index">
                        <dl :class="['grade'+(index+1),{'active':userVipInfo.vipGrade >= (index+1)}]" >
                            <dt></dt><dd v-text="'成长值满'+item.start+'点'"></dd>
                        </dl>
                        <div class="line_box" :class="[{'active':userVipInfo.vipGrade >= (index+1)},{'active1':userVipInfo.vipGrade >= (index+2)}]"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="vip_main_center" v-if="userVipInfo && vipPrivilege && vipPrivilege.length && userVipInfo.monthExp">
            <div class="vip_main_icon cont cont4">
                <div class="vip_main_icon_tit cont_tit" :class="{'noactive':isActive}">VIP特权</div>
                <div class="vip_main_icon_boxs clearfloat">
                    <dl class="float_left" v-for="(item,index) in vipPrivilege" @click="goToNext(item)" :key="index">
                        <dt><img v-lazy="item.state == 1 ? item.onLogo : item.offLogo"/></dt>
                        <dd v-text="item.name"></dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="vip_main_bottom" v-if="userVipInfo && system">
            <div class="vip_main_introduce">
                <div class="vip_main_introduce_item">
                    <div class="vip_main_introduce_title">
                        1.VIP享受条件
                    </div>
                    <div class="vip_main_introduce_content">
                        <p>当月成长值达到<span v-text="system.month_exp"></span>点，享受下月相应等级VIP会员服务，<b>有效期一个月</b></p>
                    </div>
                </div>
                <div class="vip_main_introduce_item">
                    <div class="vip_main_introduce_title">
                        2.VIP会员成长值
                    </div>
                    <div class="vip_main_introduce_content">
                        <p>VIP成长值是基于用户一定时期内使用果速送平台的下单实付金额、下单频次以及合作情况决定；用户达到相应的成长值享受VIP服务以及提升VIP等级</p>
                        <p class="formula">当月成长值=实付金额成长值+下单频次成长值+不良记录下降值</p>
                        <div class="table">
                            <div class="table_tr clearfloat">
                                <div class="table_td">实付金额成长值</div>
                                <div class="table_td">实付金额<span v-text="system.exp_of_pay_money"></span>元=1点</div>
                            </div>
                            <div class="table_tr clearfloat">
                                <div class="table_td">下单频次成长值（每日）</div>
                                <div class="table_td">下单=<span v-text="system.order_add_exp"></span>点/次，未下单= -<span v-text="system.order_ueduce_exp"></span>点/次</div>
                            </div>
                            <div class="table_tr clearfloat">
                                <div class="table_td">不良记录下降值</div>
                                <div class="table_td">逾期付款（隔夜）= -<span v-text="system.two_night_not_pay"></span>点/天</div>
                            </div>
                        </div>
                        <p class="notes">注：一个月三次以上逾期付款(隔夜)或无理由退货，取消其下月VIP资格</p>
                    </div>
                </div>
                <div class="vip_main_introduce_item">
                    <div class="vip_main_introduce_title">
                        3.VIP等级
                    </div>
                    <div class="vip_main_introduce_content">
                        <p>VIP等级是所有月份累积的成长值，达到相应标准即可升级；一旦升级，<b>一年内有效；</b>如果一年内没有升级，次年将降一级（保留等级最低值）</p>
                        <div class="table">
                            <div class="table_tr clearfloat">
                                <div class="table_td">等级</div>
                                <div class="table_td">相应累积成长值</div>
                            </div>
                            <div class="table_tr clearfloat" v-for="(item,index) in vipGradeList" :key="index" v-if="vipGradeList && vipGradeList.length">
                                <div class="table_td" v-text="item.name"></div>
                                <div class="table_td" v-text="item.start+'点'"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import { getIsApp, getIsAndroid ,getIsWeiXin, getSystem , getIsLogin , getTokenId , getUserData , getSecretKey } from "../../common/common.js";
require ("../../common/appInteractivity.js");
export default {
   name: 'vip',
   data() {
       return {
            headerMsg:{
                type:"common",
                left:'返回',
                title:'VIP服务',
            },
            isApp:getIsApp(),
            isAndroid:getIsAndroid(),
            logined: getIsLogin(),
            userInfo:null,
            vipPrivilege:[],
            vipGradeList:[],
            system:null,
            userVipInfo:null,
        }
    },
    components: {
        appHeader,
    },
    computed:{
        // 计算属性width
        getWidth: function () {
            if (this.userVipInfo) {
                if (this.userVipInfo.firmMonthExp >= this.userVipInfo.monthExp ) {
                    return "690"
                }else{
                    if (this.userVipInfo.firmMonthExp == 0) {
                        return '0'
                    }else{
                        var coefficient = this.userVipInfo.firmMonthExp / this.userVipInfo.monthExp
                        return (coefficient * 690).toFixed(2);
                    }
                }
            }else{
                return 0;
            }
            
        },
        isActive:function(){
            var isTrue = true;
            if (this.vipPrivilege) {
                for (var i = 0; i < this.vipPrivilege.length ; i++ ) {
                    if (this.vipPrivilege[i].state == 1) {
                        isTrue = false;
                        break;
                    }
                }
            }
            return isTrue;
        },
    },
    mounted(){
        if (this.isApp) {
            
            window.appInit = this.appInit;
			let obj = {
				type:1,
				methodName:'test4',
				methodParamters:{}
			}
			this.appInteractivity(obj)
            
        }else{
            if (getIsLogin()) {
                const userInfo = JSON.parse(getUserData());
                this.userInfo = userInfo;
                this.userBasicParam = {
                    firmId : userInfo.firmInfoid,
                    source : 'firmId'+userInfo.firmInfoid,
                    sign : this.$md5('firmId'+userInfo.firmInfoid+"key"+getSecretKey()).toUpperCase(),
                    tokenId : getTokenId()
                }
                if (localStorage.getItem('system')) {
                    this.system = JSON.parse(localStorage.getItem('system'))
                }else{
                    getSystem();
                    setTimeout(() => {
                        this.system = JSON.parse(localStorage.getItem('system'))
                    }, 300);
                }
                this.firm_vip_info();
                this.vip_grade_show();
                this.vip_privilege_list();
            }else{
                this.$router.replace({path:'login'})
            }
        }
        
    },
    methods:{
        firm_vip_info(){
            let _this = this;
			let obj = Object.assign({
				method: "firm_vip_info"
				},this.userBasicParam);
			this.$ajax.get(this.HOST, {
				params:obj
			}).then(result =>{
				return result.data
			}).then(data =>{
				if( data.statusCode == 100000 ) {
					let v = data.data;
                    _this.userVipInfo = v;
                    console.log(v)
				} else {
					this.$toast({
                        message : data.statusStr,
                        position: 'bottom',
                        duration: 2000,
                    })
				}
			}).catch(err => {
				console.log('请求失败：'+ err);
			});
        },
        vip_grade_show(){
            let _this = this;
			let obj = Object.assign({
				method: "vip_grade_show"
				},this.userBasicParam);
			this.$ajax.get(this.HOST, {
				params:obj
			}).then(result =>{
				return result.data
			}).then(data =>{
				if( data.statusCode == 100000 ) {
					let v = data.data;
					_this.vipGradeList = v;
				} else {
					this.$toast({
                        message : data.statusStr,
                        position: 'bottom',
                        duration: 2000,
                    })
				}
			}).catch(err => {
				console.log('请求失败：'+ err);
			});
        },
        vip_privilege_list(){
            let _this = this;
			let obj = Object.assign({
				method: "vip_privilege_list"
				},this.userBasicParam);
			this.$ajax.get(this.HOST, {
				params:obj
			}).then(result =>{
				return result.data
			}).then(data =>{
				if( data.statusCode == 100000 ) {
                    let v = data.data;
					_this.vipPrivilege = v;
				} else {
					this.$toast({
                        message : data.statusStr,
                        position: 'bottom',
                        duration: 2000,
                    })
				}
			}).catch(err => {
				console.log('请求失败：'+ err);
			});
        },
        goToNext:function(item){
            var jumpUrl = '';
            if (item.state == 1) {
                if (this.isApp) {
                    var jsonObj ={};
                    if (item.type == 1 || item.type == 2 || item.type == 3) {
                        jsonObj = {
                            type:2,
                            methodName:'goToReceiveCouponVCWithType',
                            methodParamters:{
                                type:item.type,
                                linkUrl:item.linkUrl
                            }
                        };
                    }else if (item.type == 4){
                        jsonObj = {
                            type:2,
                            methodName:'goToMoreGoods',
                            methodParamters:{
                                type:item.type,
                                linkUrl:item.linkUrl
                            }
                        };
                    }
                    this.appInteractivity(jsonObj)
                }else{
                    if (item.type == 1 || item.type == 2 || item.type == 3) {
                        this.$router.push({path:'/vipCoupon',query:{type:item.type}})
                    }else if (item.type == 4){
                        let code = '';
                        if (item.linkUrl && item.linkUrl.split("&")[1] && item.linkUrl.split("&")[1].length == 4 ) {
                            code = item.linkUrl.split("&")[1];
                            //common.jump("moreGoods.html?typeCode="+code)
                            this.$router.push({path:'/more',query:{typeCode:code}})
                        }else{
                            //common.jump("moreGoods.html")
                            this.$router.push({path:'/more'})
                        }
                    }
                }
            }else{
                let textMessage = ''
                if (item.state == 2) {
                    textMessage = "不是VIP！";
                }
                if (item.state == 3) {
                    textMessage = "没有活动！";
                }
                this.$toast({
                    message : textMessage,
                    position: 'middle',//top boottom middle
                    duration: 2000,//延时多久消失
                    //iconClass: 'mint-toast-icon mintui mintui-field-warning'
                    //.mintui-search .mintui-more .mintui-back.mintui-field-error .mintui-field-warning .mintui-success .mintui-field-success
                })
            }
        },
        appInteractivity(o){
            var obj = o;
            if (this.isAndroid) {
                try{
                    android.getMethod(JSON.stringify(obj));
                }catch(e){
                    console.log('error/android');
                    //TODO handle the exception
                }
            }else{
                try{
                    window.webkit.messageHandlers.getMethod.postMessage(obj)
                }catch(e){
                    console.log('error/ios')
                    //TODO handle the exception
                }
                
            }
        },
        appInit(obj){
            this.userInfo = {
                cuserInfoid:obj.cuserInfo.id,
                firmInfoid:obj.firmInfo.id,
                firmName:obj.firmInfo.firmName,
                linkTel:obj.cuserInfo.mobile,
                score:obj.firmInfo.score,
                next:obj.firmInfo.next,
                userGrade:obj.firmInfo.userGrade,
                websiteNode:obj.firmInfo.websiteNode,
                faceImgUrl:obj.firmInfo.faceImgUrl,
                websiteNodeName:obj.firmInfo.websiteNodeName
            };
            this.system = obj.system;
            this.userBasicParam = {
                firmId : this.userInfo.firmInfoid,
                source : 'firmId'+this.userInfo.firmInfoid,
                sign : this.$md5('firmId'+this.userInfo.firmInfoid+"key"+obj.secretKey).toUpperCase(),
                tokenId : obj.tokenId
            }
            this.firm_vip_info();
            this.vip_grade_show();
            this.vip_privilege_list();
        }
    }
}

</script>

<style scoped >
.vip{
    margin-top: 90px;
}
.vip_main_bottom,.vip_main_center,.vip_main_top {
    margin-bottom: 22px;
    background: #FFF
}

.vip_main_top {
    background: #ebebeb
}

.vip_main_growValue {
    margin-bottom: 20px;
    padding: 30px 30px 0;
    background: #FFF
}

.vip_growValue_top {
    padding-bottom: 30px
}

.vip_growValue_top .vip_growValue_tit {
    font-size: 40px;
    font-weight: 800;
    color: #f6c500;
    line-height: 56px;
    padding-right: 20px
}

.vip_growValue_top .vip_growValue_desc {
    font-size: 20px;
    color: #999
}

.vip_growValue_progress {
    width: 100%;
    height: 16px;
    position: relative;
    margin-bottom: 14px
}
.vip_growValue_progress {
    width: 100%;
    height: 16px;
    position: relative;
    margin-bottom: 14px
}

.vip_growValue_progress .growInfo_progressAll {
    background: #DDD;
    opacity: 1
}

.vip_growValue_progress .growInfo_progressTrue {
    background: #f6c500
}

.vip_main_top .vip_growValue_progress_subscript {
    font-size: 24px;
    color: #333
}

.vip_grow_all {
    padding: 30px
}

.vip_grow_all .vip_growValue_tit {
    font-size: 48px;
    color: #999;
    padding-top: 14px;
    background: url(../../assets/img/icon_vip_big.png) left center no-repeat;
    padding-left: 80px
}

.vip_grow_all .vip_activation {
    border: 1px solid #cacaca;
    background: #F5F5F5;
    border-radius: 17px;
    padding: 5px 16px;
    font-size: 20px;
    color: #999
}

.vip_grow_all.active .vip_growValue_tit {
    background: url(../../assets/img/icon_vip_big_active.png) left center no-repeat;
    color: #f6c500
}

.vip_grow_all.active .vip_activation {
    border-color: #f6c500;
    background: #000;
    color: #f6c500
}

.vip_prowValue_grade_box {
    padding-top: 36px
}

.vip_prowValue_grade_box .line_box,.vip_prowValue_grade_box dl {
    float: left
}

.vip_prowValue_grade_box dl {
    width: 100px;
    text-align: center
}

.vip_prowValue_grade_box dl dt {
    height: 40px;
    margin-bottom: 12px
}

.vip_prowValue_grade_box dl dd {
    font-size: 24px;
    line-height: 30px
}
.vip_prowValue_grade_box .float_left:last-child .line_box,.wo_top_info dd.active .user_vip_msg {
    display: none
}
.vip_prowValue_grade_box dl.grade1 dt {
    background: url(../../assets/img/icon_vip1.png) center no-repeat
}

.vip_prowValue_grade_box dl.grade2 dt {
    background: url(../../assets/img/icon_vip2.png) center no-repeat
}

.vip_prowValue_grade_box dl.grade3 dt {
    background: url(../../assets/img/icon_vip3.png) center no-repeat
}

.vip_prowValue_grade_box dl.grade4 dt {
    background: url(../../assets/img/icon_vip4.png) center no-repeat
}

.vip_prowValue_grade_box dl.grade1.active dt {
    background: url(../../assets/img/icon_vip1_active.png) center no-repeat
}

.vip_prowValue_grade_box dl.grade2.active dt {
    background: url(../../assets/img/icon_vip2_active.png) center no-repeat
}

.vip_prowValue_grade_box dl.grade3.active dt {
    background: url(../../assets/img/icon_vip3_active.png) center no-repeat
}

.vip_prowValue_grade_box dl.grade4.active dt {
    background: url(../../assets/img/icon_vip4_active.png) center no-repeat
}

.vip_prowValue_grade_box .line_box {
    width: 96px;
    height: 8px;
    border-radius: 4px;
    background: #ddd;
    margin-top: 16px
}

.vip_prowValue_grade_box .line_box.active {
    background: url(../../assets/img/line_now.png) center no-repeat;
    height: 26px;
    margin-top: 7px
}

.vip_prowValue_grade_box .line_box.active1 {
    background: #f5c500;
    height: 8px;
    margin-top: 16px
}

.vip_main_icon .vip_main_icon_tit {
    position: relative
}

.vip_main_icon .vip_main_icon_tit.noactive:before {
    display: inline;
    content: '当前没有活动';
    position: absolute;
    top: 0;
    left: 0;
    font-size: 24px;
    color: #999;
    padding-left: 30px
}

.vip_main_icon_boxs dt img {
    width: 120px;
    height: 120px
}

.vip_main_bottom {
    padding: 50px 30px
}

.vip_main_introduce_title {
    text-align: left;
    font-size: 32px;
    color: #000;
    line-height: 48px;
    font-weight: 800
}

.set_main .signOut,.ticket_nav {
    text-align: center;
    background: #FFF
}

.vip_main_introduce_content {
    padding-top: 14px;
    padding-bottom: 68px;
    padding-left: 34px
}

.vip_main_introduce_content p {
    font-size: 26px;
    color: #666;
    line-height: 42px
}

.vip_main_introduce_content p.formula {
    color: #000;
    font-size: 24px;
    margin-top: 17px;
    margin-bottom: 12px
}

.vip_main_introduce_content b {
    color: #000
}

.vip_main_introduce_content .table {
    font-size: 26px;
    line-height: 42px;
    width: 600px;
    margin-top: 12px
}

.vip_main_introduce_content p.notes {
    font-size: 24px;
    color: #ee3c3c;
    line-height: 40px;
    margin-top: 20px
}



.growInfo_progressAll,.growInfo_progressTrue {
    height: 16px;
    border-radius: 8px;
    background: #FFF
}

.growInfo_progress {
    width: 100%;
    height: 16px;
    position: relative
}

.growInfo_progressAll {
    width: 100%;
    opacity: .4
}

.growInfo_progressTrue {
    min-width: 16px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 2
}

.growInfo_progress_subscript {
    padding-top: 20px
}

.growInfo_progress_subscript .float_left {
    font-size: 20px
}

.growInfo_progress_subscript .float_right {
    font-size: 24px
}

.table {
    border: 1px solid #666
}

.table .table_tr {
    border-bottom: 1px solid #666
}

.table .table_tr:last-child {
    border-bottom: none
}

.table .table_tr .table_td {
    border-left: 1px solid #666;
    float: left;
    padding: 8px 24px
}

.table .table_tr .table_td:last-child {
    width: 300px
}

.table .table_tr .table_td:first-child {
    width: 239px;
    border-left: none
}
.cont_tit {
    font-size: 32px;
    line-height: 48px;
    color: #333;
    text-align: center
}
.cont4 dl {
    float: left;
    width: 25%;
    text-align: center;
    padding-top:28px; 
}
.cont4 {
    background: #FFF;
    padding: 32px 0
}
.cont4 dl dt {
    width: 120px;
    height: 120px;
    margin: 0 auto;
    margin-bottom: 4px;
    background: url(../../assets/img/default_huodong_pic.png) no-repeat center;
}
.cont4 dl dd {
    font-size: 24px;
    color: #333;
    line-height: 40px
}
</style>
