<template>
     <div v-cloak class="wo_top" :class="{'login':logined}">
        <p class="no_login_text" v-show="!logined">您还没有登录</p>
        <router-link :to="'login'" tag="span"  class="no_login_btn" v-show="!logined">登录</router-link>
        
        <dl class="wo_top_info clearfloat" v-show="logined && userVipInfo.vip">
            <dt class="float_left">
                <img v-show="userInfo.faceImgUrl" class="user_faceImg" :src="'http://'+userInfo.faceImgUrl"/>
                <input class="login_type1 " type="file" accept="image/*" name="" id="file" value="" />
            </dt>
            <dd class="float_left" :class="{'active':userVipInfo.vip > 0}">
                <p class="top"><span class="user_name ellipsis" v-text="userInfo.firmName"></span> <span class="user_vip_icon" :class="'vip'+userVipInfo.vipGrade"   ></span> <span class="user_vip_msg" v-text="'上个月成长值为'+userVipInfo.lastMonthExp"></span></p>
                <p><span class="user_phone" v-text="userInfo.linkTel"></span></p>
            </dd>
            <dd class="my_details float_right"></dd>
        </dl>
        <div class="wo_top_growInfo" v-show="logined && userVipInfo.vip">
            <div class="growInfo_pointer">
                <span v-text="'当月成长值'+userVipInfo.firmMonthExp" v-bind:style="{marginLeft:getMarginleft,left:getLeft}"></span>
            </div>
            <div class="growInfo_progress">
                <p class="growInfo_progressAll" ></p>
                <p class="growInfo_progressTrue" v-bind:style="{width: getWidth+'px'}"></p>
            </div>
            <div class="growInfo_progress_subscript">
                <p class="float_left" v-text="'再积'+userVipInfo.needExp+'成长值下月可享受VIP服务'"></p>
                <span class="float_right" v-text="userVipInfo.firmMonthExp > userVipInfo.monthExp ? userVipInfo.firmMonthExp : userVipInfo.monthExp"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'loginState',
        props:["userInfo" ,"userVipInfo",'logined'],
         data() {
             return {
                // isMask: !1,
                // pageNo: common.PAGE_INDEX,
                // pageSize: common.PAGE_SIZE,
                // isWx: !1,
                // urlParm: null,
                // logined: false,
                // isNewMsg: !1,
                // ajaxState: "wait",
                // system: n.system,
                // orderList: t.orderList,
                // otherList: t.otherList,
                // userInfo: n.logined ? common.user_data() : {},
                // fonterNav: t.fonterNav,
                // userVipInfo: t.userVipInfo
             }
         },
          computed: {
            getWidth: function() {
                return this.userVipInfo.firmMonthExp >= this.userVipInfo.monthExp ? "702" : 0 == this.userVipInfo.firmMonthExp ? "0" : (702 * (this.userVipInfo.firmMonthExp / this.userVipInfo.monthExp)).toFixed(2)
            },
            getMarginleft: function() {
                return  "-85px"
               
            },
            getLeft: function() {
                return 617 < this.getWidth ? "557px" : this.getWidth < 85 ? "85px" : this.getWidth + "px"
            }
        },
    }
</script>

<style scoped>
.wo_top.login {
   background: -webkit-gradient(linear ,left top,right bottom ,from(#f58d4c) ,to(#f37d33));
    background: linear-gradient(to bottom right ,#f58d4c ,#f37d33);
    padding: 128px 24px 0;
    color: #FFF;
}
.wo_top {
    width: 100%;
    height: 420px;
    position: relative;
    background: url(../../assets/img/pic_mine_bg.png) center no-repeat;
    background-size: 100% 100%;
}
.no_login_text {
    width: 100%;
    font-size: 30px;
    color: #000;
    text-align: center;
    position: absolute;
    top: 195px;
    font-weight: 900;
}
.no_login_btn {
    width: 180px;
    font-size: 25px;
    color: #fff;
    background: #f47c30;
    height: 60px;
    border-radius: 30px;
    line-height: 60px;
    position: absolute;
    top: 262px;
    left: 39%;
    text-align: center;
}
.wo_top_info {
    width: 100%;
    height: 100px;
    margin-bottom: 32px;
}
.wo_top_info dt {
    width: 100px;
    height: 100px;
    background: url(../../assets/img/icon_default_user.png) center no-repeat;
    position: relative;
}
.wo_top_info dt img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
}
.wo_top_info #file {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
#date, .wo_top_info #file {
    opacity: 0;
    filter: alpha(opacity=0);
}
.wo_top_info dd.float_left {
    width: 552px;
}
.wo_top_info dd {
    padding-left: 30px;
}
.wo_top_info dd p.top {
    width: 100%;
    height: 52px;
    position: relative;
}
.wo_top_info dd p.top span {
    float: left;
}
.wo_top_info dd .user_name {
    font-size: 36px;
    line-height: 52px;
    padding-right: 16px;
    max-width: 200px;
    display: inline-block;
}
.wo_top_info dd .user_vip_icon.vip0 {
    background: url(../../assets/img/icon_vip0.png) center no-repeat;
}
.wo_top_info dd .user_vip_icon {
    display: inline-block;
    width: 98px;
    height: 34px;
    border-radius: 17px;
    margin-right: 8px;
    position: relative;
    top: 9px;
}
.wo_top_info dd .user_vip_msg {
    height: 34px;
    border-radius: 17px;
    background: #b2b2b2;
    padding: 4px 20px;
    font-size: 20px;
    position: relative;
    top: 9px;
}
.wo_top_info dd .user_phone {
    font-size: 24px;
    line-height: 40px;
}
.wo_top_info .my_details {
    width: 50px;
    height: 100%;
    background: url(../../assets/img/icon_arrow_while.png) right center no-repeat;
    padding-left: 0;
}
.wo_top_growInfo .growInfo_pointer {
    height: 56px;
    width: 100%;
}
.wo_top_growInfo .growInfo_pointer span {
    border: 2px solid #FFF;
    border-radius: 17px;
    padding: 4px 16px;
    font-size: 24px;
    position: relative;
    min-width: 170px;
}
.growInfo_progress {
    width: 100%;
    height: 16px;
    position: relative;
}
.growInfo_progressAll {
    width: 100%;
    opacity: .4;
}
.growInfo_progressAll, .growInfo_progressTrue {
    height: 16px;
    border-radius: 8px;
    background: #FFF;
}
.growInfo_progressTrue {
    min-width: 16px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
}
.growInfo_progress_subscript {
    padding-top: 20px;
}
.growInfo_progress_subscript .float_left {
    font-size: 20px;
}
.growInfo_progress_subscript .float_right {
    font-size: 24px;
}
</style>
